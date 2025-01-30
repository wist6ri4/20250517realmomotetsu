// 定数
import { Constants } from './constants.js';
import { CFI } from './constantsForIndex.js';
import { TEAMS } from './constantsForIndex.js';

/* ==========変数の設定========== */
// response
let responseData;

/* ==========固有定数の設定========== */
// データの追加フラグ
// 一度取得できれば更新の必要がないためsessionStorageで管理
setSessionStorage();
function setSessionStorage() {
    Object.values(TEAMS).forEach(function(team) {
        sessionStorage.setItem(team.IS_ADDED, 0);
    });
};

// modal
const mapModal = new bootstrap.Modal(document.getElementById('map-modal'));
const teamInformationModal = new bootstrap.Modal(document.getElementById('team-information-modal'));

/*========== 画面表示時の実行メソッド ==========*/
main();
setInterval(main, CFI.METHOD_INTERVAL);

/* ==========function========== */
/**
 * メインメソッド
 * 画面表示時と10秒おきに実行する
 */
async function main() {
    // 更新時刻の取得
    CFI.UPDATED_TIME.text(getCurrentTime());

    // チーム名の表示
    handleTeamInformation();

    // sessionStorageのsessionTeamDataを優先して取得
    const sessionTeamData = sessionStorage.getItem(Constants.SESSION_TEAM_DATA);
    try {
        if(sessionTeamData) {
            responseData = JSON.parse(sessionTeamData);
            display(responseData);
            responseData = await fetchJsonData();
        } else {
            responseData = await fetchJsonData();
            display(responseData);
        };
    } catch {
        responseData = await fetchJsonData();
        display(responseData);
    } finally {
        sessionStorage.setItem(Constants.SESSION_TEAM_DATA, JSON.stringify(responseData));
    }
};

/**
 * データ表示の親メソッド
 * @param {object} responseData レスポンスデータ
 */
function display(responseData) {
    // 位置情報（テキスト）のリセット
    clearTeamLocation();
    // 位置情報の表示
    displayTeamLocation(responseData);

    // 次の目的地の表示
    displayNextStation(responseData.nextStation);
}

/**
 * 現在時刻の取得
 * @returns {string} 時刻
 */
function getCurrentTime() {
    const ct = new Date();
    const strCurrentTime = ct.getFullYear() +
        '/' + ('0' + (ct.getMonth() + 1)).slice(-2) +
        '/' + ('0' + ct.getDate()).slice(-2) + ' ' +
        ct.getHours() +
        ':' + ('0' + ct.getMinutes()).slice(-2) +
        ':' + ('0' + ct.getSeconds()).slice(-2);
    return strCurrentTime;
};

/**
 * APIにアクセスしてデータを取得
 * @returns {object} jsonデータ
 */
async function fetchJsonData() {
    try {
        const response = await fetch(CFI.API_URL);
        if (!response.ok) {
            console.error('HTTP Error:', response.status);
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    };
};

/**
 * チーム情報の処理
 */
function handleTeamInformation() {
    Object.values(TEAMS).forEach(function(team) {
        // チーム名の表示
        team.INFORMATION_NAME.text(team.TEAM_NAME);
        team.MODAL_NAME.text(team.TEAM_NAME);

        // 履歴モーダルの監視
        team.INFORMATION.on('click', function() {
            setInformationToModal(team.TEAM_NAME, responseData[team.TEAM_KEY]);
            teamInformationModal.show();
        });

        // チェックボックスの監視
        team.TRAIN_VISIBILITY.on('change', function() {
            changeTrainVisibility($(this), team.TRAIN, team.IS_ADDED);
        });
    });
};

/**
 * 位置情報（テキスト）のリセット
 */
function clearTeamLocation() {
    Object.values(TEAMS).forEach(function(team) {
        team.LATEST_STATION.text('');
        team.LATEST_TIME.text('');
    });
};

/**
 * 位置情報の表示
 * @param {object} data オブジェクトに変換したデータ
 */
function displayTeamLocation(data) {
    const nextStationCode = getStationCode(data.nextStation.slice(-1)[0].nextStation);

    Object.values(TEAMS).forEach(function(team) {
        if(data[team.TEAM_KEY].length > 0) {
            // teamの位置情報(文字)の表示
            displayStringInformation(
                data[team.TEAM_KEY],
                team.IS_ADDED,
                team.LATEST_STATION,
                team.LATEST_TIME,
                team.REMAINING_SQUARES,
                nextStationCode
            );
            // teamの電車コマの移動
            changeTrainPosition(team.TRAIN, data[team.TEAM_KEY], team.TRAIN_VISIBILITY);
        } else {
            team.TRAIN.addClass(CFI.INVISIBLE_TRAIN);
        }
    });
};

/**
 * 位置情報の表示（文字情報）
 * @param {object} data 各チームの位置情報一覧
 * @param {string} isAdded isAddedのsessionStorageキー
 * @param {object} latestData 最終到着駅表示用HTML要素
 * @param {object} nextData 次の目的地表示用HTML要素
 * @param {object} remainingSquares 残りマス数表示用HTML要素
 */
function displayStringInformation(data, isAdded, latestStation, latestTime, remainingSquares, nextStationCode) {
    // データが登録されているのでsessionStorageのisAddedをtrueにする
    sessionStorage.setItem(isAdded, 1);
    // 最後から2行目の取得
    const latestLocationData = data.slice(-2)[0];

    changeCharacterSize(latestStation, latestLocationData.location)
    latestStation.text(latestLocationData.location);
    latestTime.text(latestLocationData.strTime);

    // 残りマス数の取得と表示
    const stationCode = getStationCode(latestLocationData.location);
    const numRemainingSquares = (calculateTravelTimes(stationGraph, stationCode))[nextStationCode].stations;
    remainingSquares.text(numRemainingSquares);
};

/**
 * 文字数に応じて文字サイズを変換
 * @param {object} elem jqueryオブジェクト
 * @param {string} str 駅名
 */
function changeCharacterSize(elem, str) {
    if(str.length > 8) {
        elem.css('font-size', '1.1rem');
    } else if(str.length > 5) {
        elem.css('font-size', '1.8rem');
    } else {
        elem.css('font-size', '2.7rem');
    };
};

/**
 * 電車コマの位置の変更
 * @param {object} train 電車コマ
 * @param {string} location 最終到着駅
 * @param {object} visibility トグルボタン
 * 駅コードを下にマス目を取得し、そのマスの座標を電車コマに反映
 */
function changeTrainPosition(train, data, visibility) {
    // 最終到着駅を取得
    const location = data.slice(-2)[0].location;
    const stationCode = getStationCode(location);
    const stationBox = $('#box-' + stationCode);
    if(visibility.prop('checked')) {
        train.removeClass(CFI.INVISIBLE_TRAIN);
    };
    train.attr('x', stationBox.attr('x'));
    train.attr('y', stationBox.attr('y'));
};

/**
 * 電車コマの可視性の変更
 * @param {object} elm トグルボタン
 * @param {object} train 電車コマ
 * @param {string} isAdded isAddedのsessionStorageキー
 * トグルボタンがtrueかつsessionStorageのisAddedがtrueのときに電車を表示
 */
function changeTrainVisibility(elm, train, isAdded) {
    if(elm.prop('checked') && parseInt(sessionStorage.getItem(isAdded)) == 1) {
        train.removeClass(CFI.INVISIBLE_TRAIN);
    } else {
        train.addClass(CFI.INVISIBLE_TRAIN);
    };
};

/**
 * 次の目的地の表示
 * @param {object} nextStationList 次の目的地リスト
 */
function displayNextStation(nextStationList) {
    if(nextStationList.length > 0) {
        const nextStation = nextStationList.slice(-1)[0];
        const nextStationCode = getStationCode(nextStation.nextStation);
        const nextStationBox = $('#box-' + nextStationCode);
        CFI.DESTINATION_STATION.attr('x', nextStationBox.attr('x'));
        CFI.DESTINATION_STATION.attr('y', nextStationBox.attr('y'));

        CFI.DIGITAL_DISPLAY_JP.text(nextStation.nextStation);
    };
};

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
    displayData.pop();
    // 履歴分の数の行をテーブルに追加
    for(const history of displayData) {
        const tdStrTime = $('<td></td>').text(history.strTime);
        const tdLocation = $('<td></td>').text(history.location);
        const tr = $('<tr></tr>').append(tdStrTime, tdLocation);
        $('#table-body-history').prepend(tr);
    };
};
