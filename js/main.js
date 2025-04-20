/* ========== モジュールのインポート ========== */
import { checkUuid } from './module/checkUuid.js';
import { Constants } from './module/constants.js';
import { CFI } from './module/constantsForIndex.js';
import { TEAMS } from './module/constantsForIndex.js';
import { StationCode } from './module/stationCode.js';
import { Common } from './module/common.js';
import { Supabase } from './module/supabase.js';
import { Logger } from './module/logging.js';
import { Dijkstra } from './module/dijkstra.js';

/* ========== Logger初期化 ========== */
const logger = new Logger();

/* ========== 変数の設定 ========== */
// response
let responseData;

/* ========== 固有定数の設定 ========== */
// データの追加フラグ
// 一度取得できれば更新の必要がないためsessionStorageで管理
setSessionStorage();
function setSessionStorage() {
    Object.values(TEAMS).forEach(function (team) {
        sessionStorage.setItem(team.IS_ADDED, 0);
    });
}

/* ========== 画面要素の取得 ========== */
// modal
const mapModal = new bootstrap.Modal(document.getElementById('map-modal'));
const teamInformationModal = new bootstrap.Modal(document.getElementById('team-information-modal'));

const $updateButton = $('#update-button');

/*========== 画面表示時の実行メソッド ==========*/
main();

$updateButton.on('click', main);

/* ========== functions ========== */
/**
 * メインメソッド
 * 画面表示時と10秒おきに実行する
 */
async function main() {
    try {
        // 更新時刻の取得
        CFI.$UPDATED_TIME.text(getCurrentTime());

        // チーム名の取得
        await Common.getAndSetTeamName();

        // チーム名の表示
        handleTeamInformation();

        // 各チームの詳細情報の取得
        const sessionTeamData = sessionStorage.getItem(Constants.SESSION_TEAM_DATA);
        try {
            responseData = await fetchJsonData();
            display(responseData);
            sessionStorage.setItem(Constants.SESSION_TEAM_DATA, JSON.stringify(responseData));
            logger.Debug('Fetch and display the main data.', responseData);
        } catch (error) {
            if (sessionTeamData) {
                responseData = JSON.parse(sessionTeamData);
                display(responseData);
                logger.Warning('Display the main data from the session storage.', responseData);
                logger.Error('Failed to get the main data.', error);
            } else {
                alert('データの取得に失敗しました。');
                logger.Error('Failed to get the main data.', error);
                throw new Error(error);
            }
        }
        // 駅名の取得
        await Common.getAndSetStations();
        // ミッションが設定されている駅マスの設定
        displayMissionSetStations();

        logger.Debug('Displayed.');
    } catch (error) {
        logger.Error('Failed to display.', error);
    }
}

/**
 * データ表示の親メソッド
 * @param {object} responseData レスポンスデータ
 */
function display(responseData) {
    // 位置情報（テキスト）のリセット
    clearTeamLocation();
    // 位置情報の表示
    displayTeamLocation(responseData);
    // ポイントの表示
    displayPoints(responseData);

    // 次の目的地の表示
    displayNextStation(responseData.nextStation);
}

/**
 * 現在時刻の取得
 * @returns {string} 時刻
 */
function getCurrentTime() {
    const ct = new Date();
    const strCurrentTime =
        ct.getFullYear() +
        '/' +
        ('0' + (ct.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + ct.getDate()).slice(-2) +
        ' ' +
        ct.getHours() +
        ':' +
        ('0' + ct.getMinutes()).slice(-2) +
        ':' +
        ('0' + ct.getSeconds()).slice(-2);
    return strCurrentTime;
}

/**
 * UTCからJST文字列に変換
 *
 * @param {string} utc UTC文字列
 * @returns {string} JST文字列
 */
function convertUTCtoJST(utc) {
    const date = new Date(utc);
    return date.toLocaleTimeString();
}

/**
 * APIにアクセスしてデータを取得
 * @returns {object} jsonデータ
 */
async function fetchJsonData() {
    const transitStations = await Supabase.getTransitStations();
    const goalStations = await Supabase.getGoalStations();
    const notChargedPoints = await Supabase.getNotChargedPoints();
    const chargedPoints = await Supabase.getChargedPoints();

    return await createJsonData(transitStations, goalStations, notChargedPoints, chargedPoints);
}

/**
 * jsonデータの作成
 *
 * @param {object} tsData transit_stationsのデータ
 * @param {object} nsData goal_stationsのデータ
 * @returns {object} jsonデータ
 */
async function createJsonData(tsData, nsData, ncPoints, cPoints) {
    let jsonData = {
        teamA: [],
        teamB: [],
        teamC: [],
        teamD: [],
        nextStation: [],
        notChargedPoints: ncPoints,
        chargedPoints: cPoints,
    };

    // 経由駅をリスト化
    tsData.forEach(function (record) {
        const modifiedRecord = {
            strTime: convertUTCtoJST(record.created_at),
            team: record.team_id,
            location: StationCode.getStationName(record.station_id),
        };

        switch (modifiedRecord.team) {
            case 'teamA':
                jsonData.teamA.push(modifiedRecord);
                break;
            case 'teamB':
                jsonData.teamB.push(modifiedRecord);
                break;
            case 'teamC':
                jsonData.teamC.push(modifiedRecord);
                break;
            case 'teamD':
                jsonData.teamD.push(modifiedRecord);
                break;
        }
    });

    // 目的駅をリスト化
    nsData.forEach(function (record) {
        const modifiedRecord = {
            strTime: convertUTCtoJST(record.created_at),
            nextStation: StationCode.getStationName(record.station_id),
        };

        jsonData.nextStation.push(modifiedRecord);
    });

    logger.Debug('Created json data.', jsonData);
    return jsonData;
}

/**
 * チーム情報の処理
 */
async function handleTeamInformation() {
    const teams = JSON.parse(sessionStorage.getItem(Constants.SESSION_TEAM_NAME));
    Object.values(TEAMS).forEach(function (team) {
        // チーム名の表示
        const teamName = teams.find((t) => t.team_id === team.TEAM_ID).team_name;
        team.$INFORMATION_NAME.text(teamName);
        team.$MODAL_NAME.text(teamName);

        // 履歴モーダルの監視
        team.$INFORMATION.on('click', function () {
            setInformationToModal(teamName, responseData[team.TEAM_ID]);
            teamInformationModal.show();
        });

        // チェックボックスの監視
        team.$TRAIN_VISIBILITY.on('change', function () {
            changeTrainVisibility($(this), team.$TRAIN, team.IS_ADDED);
        });
    });
}

/**
 * 位置情報（テキスト）のリセット
 */
function clearTeamLocation() {
    Object.values(TEAMS).forEach(function (team) {
        team.$LATEST_STATION.text('');
        team.$LATEST_TIME.text('');
    });
}

/**
 * 位置情報の表示
 * @param {object} data オブジェクトに変換したデータ
 */
function displayTeamLocation(data) {
    const nextStationCode = StationCode.getStationCode(data.nextStation.slice(-1)[0].nextStation);

    Object.values(TEAMS).forEach(function (team) {
        if (data[team.TEAM_ID].length > 0) {
            // teamの位置情報(文字)の表示
            displayStringInformation(
                data[team.TEAM_ID],
                team.IS_ADDED,
                team.$LATEST_STATION,
                team.$LATEST_TIME,
                team.$REMAINING_SQUARES,
                nextStationCode
            );
            // teamの電車コマの移動
            changeTrainPosition(team.$TRAIN, data[team.TEAM_ID], team.$TRAIN_VISIBILITY);
        } else {
            team.$TRAIN.addClass(CFI.INVISIBLE_TRAIN);
            changeCharacterSize(team.$LATEST_STATION, 'データがありません');
            team.$LATEST_STATION.text('データがありません');
            team.$LATEST_TIME.text('--:--:--');
            team.$REMAINING_SQUARES.text('-');
        }
    });
}

/**
 * 位置情報の表示（文字情報）
 * @param {object} data 各チームの位置情報一覧
 * @param {string} isAdded isAddedのsessionStorageキー
 * @param {object} latestData 最終到着駅表示用HTML要素
 * @param {object} nextData 次の目的地表示用HTML要素
 * @param {object} remainingSquares 残りマス数表示用HTML要素
 */
function displayStringInformation(
    data,
    isAdded,
    latestStation,
    latestTime,
    remainingSquares,
    nextStationCode
) {
    // データが登録されているのでsessionStorageのisAddedをtrueにする
    sessionStorage.setItem(isAdded, 1);

    let latestLocationData = null;
    if (data.length < 2) {
        // データが1つしかない場合
        latestLocationData = data[0];
    } else {
        // 最後から2行目の取得
        latestLocationData = data.slice(-1)[0];
    }
    changeCharacterSize(latestStation, latestLocationData.location);
    latestStation.text(latestLocationData.location);
    latestTime.text(latestLocationData.strTime);

    // 残りマス数の取得と表示
    const stationCode = StationCode.getStationCode(latestLocationData.location);
    const numRemainingSquares = Dijkstra.calculateTravelTimes(
        StationCode.stationGraph,
        stationCode
    )[nextStationCode].stations;
    remainingSquares.text(numRemainingSquares);
}

/**
 * 文字数に応じて文字サイズを変換
 * @param {object} elem jqueryオブジェクト
 * @param {string} str 駅名
 */
function changeCharacterSize(elem, str) {
    if (str.length > 8) {
        elem.css('font-size', '1.1rem');
    } else if (str.length > 5) {
        elem.css('font-size', '1.8rem');
    } else {
        elem.css('font-size', '2.7rem');
    }
}

/**
 * ポイントの表示
 *
 * @param {object} responseData レスポンスデータ
 */
function displayPoints(responseData) {
    Object.values(TEAMS).forEach(function (team) {
        const notChargedPoints = responseData.notChargedPoints[team.TEAM_ID];
        const chargedPoints = responseData.chargedPoints[team.TEAM_ID];

        team.$NOT_CHARGED_POINTS.text(notChargedPoints ? notChargedPoints.toLocaleString() : 0);
        team.$CHARGED_POINTS.text(chargedPoints ? Common.formatPoint(chargedPoints) : '0 万');
    });
}

/**
 * 電車コマの位置の変更
 * @param {object} train 電車コマ
 * @param {string} location 最終到着駅
 * @param {object} visibility トグルボタン
 * 駅コードを下にマス目を取得し、そのマスの座標を電車コマに反映
 */
function changeTrainPosition(train, data, visibility) {
    // 最終到着駅を取得
    const location = data.slice(-1)[0].location;
    const stationCode = StationCode.getStationCode(location);
    const stationBox = $('#box-' + stationCode);
    if (visibility.prop('checked')) {
        train.removeClass(CFI.INVISIBLE_TRAIN);
    }
    train.attr('x', stationBox.attr('x'));
    train.attr('y', stationBox.attr('y'));
}

/**
 * 電車コマの可視性の変更
 * @param {object} elm トグルボタン
 * @param {object} train 電車コマ
 * @param {string} isAdded isAddedのsessionStorageキー
 * トグルボタンがtrueかつsessionStorageのisAddedがtrueのときに電車を表示
 */
function changeTrainVisibility(elm, train, isAdded) {
    if (elm.prop('checked') && parseInt(sessionStorage.getItem(isAdded)) == 1) {
        train.removeClass(CFI.INVISIBLE_TRAIN);
    } else {
        train.addClass(CFI.INVISIBLE_TRAIN);
    }
}

/**
 * 次の目的地の表示
 * @param {object} nextStationList 次の目的地リスト
 */
function displayNextStation(nextStationList) {
    if (nextStationList.length > 0) {
        const nextStation = nextStationList.slice(-1)[0];
        const nextStationCode = StationCode.getStationCode(nextStation.nextStation);
        const nextStationBox = $('#box-' + nextStationCode);
        CFI.$DESTINATION_STATION.attr('x', nextStationBox.attr('x'));
        CFI.$DESTINATION_STATION.attr('y', nextStationBox.attr('y'));

        CFI.$DIGITAL_DISPLAY_JP.text(nextStation.nextStation);
    }
}

/**
 * 履歴テーブルの内容設定
 * @param {string} teamName チーム名
 * @param {object} data データ
 */
function setInformationToModal(teamName, data) {
    // モーダルのラベル
    $('#team-information-modal-label').text(teamName + 'の履歴');
    // 履歴テーブルを空にする
    $('#table-body-history').empty();
    // 次の目的駅を取り除く
    const displayData = [...data];
    // 履歴分の数の行をテーブルに追加
    for (const history of displayData) {
        const tdStrTime = $('<td></td>').text(history.strTime);
        const tdLocation = $('<td></td>').text(history.location);
        const tr = $('<tr></tr>').append(tdStrTime, tdLocation);
        $('#table-body-history').prepend(tr);
    }
}

/**
 * ミッションが設定されている駅マスの設定
 *
 * @param {Array} stations 駅情報
 * @param {Array} missionSetStations ミッションが設定されている駅情報
 */
function displayMissionSetStations() {
    const stations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));
    const missionSetStations = stations.filter((station) => station.is_mission_set == true);

    missionSetStations.forEach((station) => {
        const stationCode = station.station_id;
        const stationBox = $('#box-' + stationCode);
        stationBox.addClass('mission-set-station');
    });
}
