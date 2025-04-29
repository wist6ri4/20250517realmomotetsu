/* ========== モジュールのインポート ========== */
import { checkUuid } from './module/checkUuid.js';
import { Constants } from './module/constants.js';
import { StationCode } from './module/stationCode.js';
import { Common } from './module/common.js';
import { Logger } from './module/logging.js';
import { Dijkstra } from './module/dijkstra.js';
import { Supabase } from './module/supabase.js';

/*========== Logger初期化 ==========*/
const logger = new Logger();

/*========== 画面要素の取得 ==========*/
const $currentStation = $('#current-station'); // 現在の駅
const $rouletteMode = $('#roulette-mode'); // ランダムフラグ
const roulette = $('#roulette'); // ルーレット表示部
const startButton = $('#start-button'); // スタートボタン
const stopButton = $('#stop-button'); // ストップボタン

/*========== 変数の設定 ==========*/
// ルーレット開始駅
let startStationCode;
// スピンフラグ
// ルーレットが回っているかどうかの判定フラグ
let isSpin = false;
// ルーレットのintervalID
let spinInterval;
// 次の駅
let nextStation;

/*========== 画面表示時の実行メソッド ==========*/
main();

/* 現在の駅変更時 */
$('#current-station').on('change', function () {
    startStationCode = this.value;
    if (isSpin) stopRoulette();
});

startButton.on('click', startRoulette);
stopButton.on('click', stopRoulette);

/*========== function ==========*/
/**
 * メインメソッド
 * 画面表示時に実行する
 */
async function main() {
    try {
        isSpin = false;

        // チーム名の取得
        await Common.getAndSetTeamName();

        // 駅名の取得
        await Common.getAndSetStations();
        // 駅名のオプションを作成
        const stations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));
        stations.forEach(function (station) {
            $currentStation.append(
                $('<option>').val(station.station_id).text(station.station_name)
            );
        });

        // 最寄り駅の取得
        await Common.setNearByStation($('#current-station'));

        // 駅の初期表示
        getRandomStation($('#current-station').val());

        logger.Info('Displayed.');
    } catch (error) {
        logger.Error('Failed to Display.', error);
    }
}

/**
 * ルーレットの開始
 * @returns isSpinがtrueの場合
 */
async function startRoulette() {
    startStationCode = $('#current-station').val();
    if (isSpin) {
        return;
    } else {
        isSpin = true;
        spinInterval = setInterval(() => {
            getRandomStation(startStationCode);
        }, 100);
        if ($rouletteMode.val() === 'random') {
            nextStation = getRandomStation(startStationCode);
            logger.Debug(
                `Roulette Started. Mode:random StartStation:${StationCode.getStationName(
                    startStationCode
                )} NextStation:${nextStation}`
            );
        } else if ($rouletteMode.val() === 'goal') {
            nextStation = await getNextStation();
        }

        // ボタン表示の切り替え
        startButton.addClass('roulette-hidden');
        stopButton.removeClass('roulette-hidden');
    }
}

/**
 * ランダムに駅を表示
 */
function getRandomStation(startStationCode) {
    const stationCodes = Object.keys(StationCode.stationMapping).filter(
        (station) => station !== startStationCode
    );
    const randomIndex = Math.floor(Math.random() * stationCodes.length);
    const randomStation = stationCodes[randomIndex];
    const randomStationName = StationCode.getStationName(randomStation);
    changeCharacterSize(roulette, randomStationName);
    roulette.text(randomStationName);
    return randomStationName;
}

/**
 * ルーレットの停止
 * @returns isSpinがfalseの場合
 */
function stopRoulette() {
    if (!isSpin) {
        return;
    } else {
        isSpin = false;
        clearInterval(spinInterval);
        changeCharacterSize(roulette, nextStation);
        roulette.text(nextStation);

        // ボタン表示の切り替え
        startButton.removeClass('roulette-hidden');
        stopButton.addClass('roulette-hidden');
    }
}

/**
 * 文字数に応じて文字サイズを変換
 * @param {object} elem jqueryオブジェクト
 * @param {string} str 駅名
 */
function changeCharacterSize(elem, str) {
    if (str.length > 8) {
        elem.css('font-size', '1.3rem');
    } else if (str.length > 5) {
        elem.css('font-size', '2rem');
    } else {
        elem.css('font-size', '3rem');
    }
}

/**
 * 次の駅を決定する
 */
async function getNextStation() {
    // 各駅への最短所要時間を取得
    const times = Dijkstra.calculateTravelTimes(StationCode.stationGraph, startStationCode);
    // 所要時間が設定値以下の駅を削除
    for (const key of Object.keys(times)) {
        if (times[key].time <= Constants.ELIMINATION_TIME_RANGE_MINUTES) {
            delete times[key];
        }
    }

    try {
        // 各チームの現在地を取得
        const latestTransitStations = await Supabase.getLatestTransitStations();
        // 各チームの現在地の駅を削除
        for (const stations of latestTransitStations) {
            const stationCode = stations.station_id;
            if (times[stationCode]) {
                delete times[stationCode];
            }
        }
        logger.Debug('Latest transit stations:', latestTransitStations);
    } catch (error) {
        logger.Error('Failed to get latest transit stations.', error);
    }

    // 所要時間から重みを計算
    const probabilities = Dijkstra.weightedRoulette(startStationCode, times);

    // 次の目的駅を選択
    const nextStationCode = Dijkstra.chooseNextStation(probabilities);

    const nextStation = StationCode.getStationName(nextStationCode);
    logger.Debug(
        `Roulette Started. Mode:goal StartStation:${StationCode.getStationName(
            startStationCode
        )} NextStation:${nextStation}`,
        probabilities
    );
    return nextStation;
}
