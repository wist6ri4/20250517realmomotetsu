// 定数
import { Constants } from './constants.js';
import { CFI } from './constantsForIndex.js';

/* ==========変数の設定========== */
// response
let responseData;

/* ==========固有定数の設定========== */
// データの追加フラグ
// 一度取得できれば更新の必要がないためsessionStorageで管理
const teamAIsAdded = Constants.TEAM_A_IS_ADDED;
sessionStorage.setItem(teamAIsAdded, 0);
const teamBIsAdded = Constants.TEAM_B_IS_ADDED;
sessionStorage.setItem(teamBIsAdded, 0);
const teamCIsAdded = Constants.TEAM_C_IS_ADDED;
sessionStorage.setItem(teamCIsAdded, 0);
const teamDIsAdded = Constants.TEAM_D_IS_ADDED;
sessionStorage.setItem(teamDIsAdded, 0);

// modal
const mapModal = new bootstrap.Modal(document.getElementById('map-modal'));
const teamInformationModal = new bootstrap.Modal(document.getElementById('team-information-modal'));

/*========== 画面表示時の実行メソッド ==========*/
/* 共通ヘッダーの読み込み */
$(function() {
    $.ajaxSetup({cache:false});
    $('.header-contents').load('./header.html', function() {
        $('#home-header').addClass('active');
        $('#roulette-header').removeClass('active');
        $('#googleform-header').removeClass('active');
    });
});
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
    CFI.TEAM_A.INFORMATION_NAME.text(CFI.TEAM_A.TEAM_NAME);
    CFI.TEAM_B.INFORMATION_NAME.text(CFI.TEAM_B.TEAM_NAME);
    CFI.TEAM_C.INFORMATION_NAME.text(CFI.TEAM_C.TEAM_NAME);
    CFI.TEAM_D.INFORMATION_NAME.text(CFI.TEAM_D.TEAM_NAME);
    CFI.TEAM_A.MODAL_NAME.text(CFI.TEAM_A.TEAM_NAME);
    CFI.TEAM_B.MODAL_NAME.text(CFI.TEAM_B.TEAM_NAME);
    CFI.TEAM_C.MODAL_NAME.text(CFI.TEAM_C.TEAM_NAME);
    CFI.TEAM_D.MODAL_NAME.text(CFI.TEAM_D.TEAM_NAME);

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
    const response = await fetch(CFI.API_URL);
    const data = await response.json();
    return data;
};

/**
 * 位置情報（テキスト）のリセット
 */
function clearTeamLocation() {
    CFI.TEAM_A.LATEST_STATION.text('');
    CFI.TEAM_A.LATEST_TIME.text('');
    CFI.TEAM_B.LATEST_STATION.text('');
    CFI.TEAM_B.LATEST_TIME.text('');
    CFI.TEAM_C.LATEST_STATION.text('');
    CFI.TEAM_C.LATEST_TIME.text('');
    CFI.TEAM_D.LATEST_STATION.text('');
    CFI.TEAM_D.LATEST_TIME.text('');
};

/**
 * 位置情報の表示
 * @param {object} data オブジェクトに変換したデータ
 */
function displayTeamLocation(data) {
    const nextStationCode = getStationCode(data.nextStation.slice(-1)[0].nextStation);

    if(data.teamA.length > 0) {
        // teamAの位置情報(文字)の表示
        displayStringInformation(
            data.teamA,
            teamAIsAdded,
            CFI.TEAM_A.LATEST_STATION,
            CFI.TEAM_A.LATEST_TIME,
            CFI.TEAM_A.REMAINING_SQUARES,
            nextStationCode
        );
        // teamAの電車コマの移動
        changeTrainPosition(CFI.TEAM_A.TRAIN, data.teamA, CFI.TEAM_A.TRAIN_VISIBILITY);
    } else {
        CFI.TEAM_A.TRAIN.addClass('invisible-train');
    };
    if(data.teamB.length > 0) {
        // teamBの位置情報(文字)の表示
        displayStringInformation(
            data.teamB,
            teamBIsAdded,
            CFI.TEAM_B.LATEST_STATION,
            CFI.TEAM_B.LATEST_TIME,
            CFI.TEAM_B.REMAINING_SQUARES,
            nextStationCode
        );
        // teamBの電車コマの移動
        changeTrainPosition(CFI.TEAM_B.TRAIN, data.teamB, CFI.TEAM_B.TRAIN_VISIBILITY);
    } else {
        CFI.TEAM_B.TRAIN.addClass('invisible-train');
    };
    if(data.teamC.length > 0) {
        // teamCの位置情報(文字)の表示
        displayStringInformation(
            data.teamC,
            teamCIsAdded,
            CFI.TEAM_C.LATEST_STATION,
            CFI.TEAM_C.LATEST_TIME,
            CFI.TEAM_C.REMAINING_SQUARES,
            nextStationCode
        );
        // teamCの電車コマの移動
        changeTrainPosition(CFI.TEAM_C.TRAIN, data.teamC, CFI.TEAM_C.TRAIN_VISIBILITY);
    } else {
        CFI.TEAM_C.TRAIN.addClass('invisible-train');
    };
    if(data.teamD.length > 0) {
        // teamDの位置情報(文字)の表示
        displayStringInformation(
            data.teamD,
            teamDIsAdded,
            CFI.TEAM_D.LATEST_STATION,
            CFI.TEAM_D.LATEST_TIME,
            CFI.TEAM_D.REMAINING_SQUARES,
            nextStationCode
        );
        // teamDの電車コマの移動
        changeTrainPosition(CFI.TEAM_D.TRAIN, data.teamD, CFI.TEAM_D.TRAIN_VISIBILITY);
    } else {
        CFI.TEAM_D.TRAIN.addClass('invisible-train');
    };
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
        train.removeClass('invisible-train');
    };
    train.attr('x', stationBox.attr('x'));
    train.attr('y', stationBox.attr('y'));
};

// 各チェックボックスの監視
CFI.TEAM_A.TRAIN_VISIBILITY.on('change', function() {
    changeTrainVisibility($(this), CFI.TEAM_A.TRAIN, teamAIsAdded);
});
CFI.TEAM_B.TRAIN_VISIBILITY.on('change', function() {
    changeTrainVisibility($(this), CFI.TEAM_B.TRAIN, teamBIsAdded);
});
CFI.TEAM_C.TRAIN_VISIBILITY.on('change', function() {
    changeTrainVisibility($(this), CFI.TEAM_C.TRAIN, teamCIsAdded);
});
CFI.TEAM_D.TRAIN_VISIBILITY.on('change', function() {
    changeTrainVisibility($(this), CFI.TEAM_D.TRAIN, teamDIsAdded);
});

/**
 * 電車コマの可視性の変更
 * @param {object} elm トグルボタン
 * @param {object} train 電車コマ
 * @param {string} isAdded isAddedのsessionStorageキー
 * トグルボタンがtrueかつsessionStorageのisAddedがtrueのときに電車を表示
 */
function changeTrainVisibility(elm, train, isAdded) {
    if(elm.prop('checked') && parseInt(sessionStorage.getItem(isAdded)) == 1) {
        train.removeClass('invisible-train');
    } else {
        train.addClass('invisible-train');
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


/* 履歴モーダルの表示 */
CFI.TEAM_A.INFORMATION.on('click', function() {
    setInformationToModal(CFI.TEAM_A.TEAM_NAME, responseData.teamA);
    teamInformationModal.show();
});
CFI.TEAM_B.INFORMATION.on('click', function() {
    setInformationToModal(CFI.TEAM_B.TEAM_NAME, responseData.teamB);
    teamInformationModal.show();
});
CFI.TEAM_C.INFORMATION.on('click', function() {
    setInformationToModal(CFI.TEAM_C.TEAM_NAME, responseData.teamC);
    teamInformationModal.show();
});
CFI.TEAM_D.INFORMATION.on('click', function() {
    setInformationToModal(CFI.TEAM_D.TEAM_NAME, responseData.teamD);
    teamInformationModal.show();
});

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
