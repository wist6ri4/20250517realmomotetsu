/* ========== モジュールのインポート ========== */
import { StationCode } from "./stationCode.js";
import { Common } from "./common.js";
import { Constants } from "./constants.js";
import { Locations } from "./location.js";
import { Dijkstra } from "./dijkstra.js";

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
$('#current-station').on('change', function() {
    startStationCode = this.value;
    if(isSpin)
        stopRoulette();
    console.log('今の駅：' + startStationCode);
});

startButton.on('click', startRoulette);
stopButton.on('click', stopRoulette);

/*========== function ==========*/
/**
 * メインメソッド
 * 画面表示時に実行する
 */
async function main() {
    isSpin = false;

    // チーム名の取得
    await Common.getAndSetTeamName();

    // 駅名の取得
    await Common.getAndSetStations();
    // 駅名のオプションを作成
    const stations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));
    stations.forEach(function(station) {
        $currentStation.append($('<option>').val(station.station_id).text(station.station_name));
    });

    // 最寄り駅の取得
    await setNearByStation();

    // 駅の初期表示
    getRandomStation($('#current-station').val());
}

/**
 * ルーレットの開始
 * @returns isSpinがtrueの場合
 */
function startRoulette() {
    startStationCode = $('#current-station').val()
    if(isSpin) {
        return;
    } else {
        isSpin = true;
        spinInterval = setInterval(() => {getRandomStation(startStationCode)} , 100);
        if($rouletteMode.val() === 'random') {
            console.log('Roulette Started. [Mode: random]');
            nextStation = getRandomStation(startStationCode);
        } else if($rouletteMode.val() === 'goal') {
            nextStation = getNextStation();
        };
        console.log('次の駅：' + nextStation);
    };
};

/**
 * ランダムに駅を表示
 */
function getRandomStation(startStationCode) {
    const stationCodes = Object.keys(StationCode.stationMapping).filter(station => station !== startStationCode);
    const randomIndex = Math.floor(Math.random() * (stationCodes.length))
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
    if(!isSpin) {
        return;
    } else {
        isSpin = false;
        clearInterval(spinInterval);
        changeCharacterSize(roulette, nextStation);
        roulette.text(nextStation);
    };
};

/**
 * 文字数に応じて文字サイズを変換
 * @param {object} elem jqueryオブジェクト
 * @param {string} str 駅名
 */
function changeCharacterSize(elem, str) {
    if(str.length > 8) {
        elem.css('font-size', '1.3rem');
    } else if(str.length > 5) {
        elem.css('font-size', '2rem');
    } else {
        elem.css('font-size', '3rem');
    };
};

/**
 * 次の駅を決定する
 */
function getNextStation() {
    console.log('Roulette Started. [Mode: goal]');

    // 各駅への最短所要時間を取得
    const times = Dijkstra.calculateTravelTimes(StationCode.stationGraph, startStationCode);
    // 10分以下の駅を削除
    for(const key of Object.keys(times)) {
        if(times[key].time <= 10) {
            delete times[key];
        };
    };

    // 所要時間から重みを計算
    const probabilities = Dijkstra.weightedRoulette(startStationCode, times);
    console.log("各駅の重み：", probabilities);

    // 次の目的駅を選択
    const nextStationCode = Dijkstra.chooseNextStation(probabilities);

    const nextStation = StationCode.getStationName(nextStationCode);
    return nextStation;
};

/**
 * 最寄り駅を取得して表示
 */
async function setNearByStation() {
    try {
        const nearbyStations = await Locations.getNearByStation();
        const nearbyStation = nearbyStations[0].station;
        console.log(`最寄り駅：${StationCode.getStationName(nearbyStation)}`, nearbyStations);
        $('#current-station').val(nearbyStation);
    } catch (error) {
        console.log(error.message);
    };
};
