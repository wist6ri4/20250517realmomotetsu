// 定数
import { Constants } from './constants.js';

/* ==========変数の設定========== */
// response
let responseData;

/* ==========固有定数の設定========== */
// メインメソッド実行間隔
const interval = 7500;

// 電光掲示板
const digitalDisplayJP = $('#digital-display-jp');

// チーム情報表示部
const mapDiv = $('#map');

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

// 各チームの電車コマ
const teamATrain = $('#team-a-train');
const teamBTrain = $('#team-b-train');
const teamCTrain = $('#team-c-train');
const teamDTrain = $('#team-d-train');

// 駅
const destinationStation = $('#destination-station')

// トグルボタン
const teamATrainVisibility = $('#team-a-train-visibility');
const teamBTrainVisibility = $('#team-b-train-visibility');
const teamCTrainVisibility = $('#team-c-train-visibility');
const teamDTrainVisibility = $('#team-d-train-visibility');
// チーム名
const teamAInformationName = $('#team-a-information-name');
const teamBInformationName = $('#team-b-information-name');
const teamCInformationName = $('#team-c-information-name');
const teamDInformationName = $('#team-d-information-name');
// 各チームのteam-information
const teamAInformation = $('#team-a-information');
const teamBInformation = $('#team-b-information');
const teamCInformation = $('#team-c-information');
const teamDInformation = $('#team-d-information');
// 各チームの情報表示部
const teamALatest = $('#team-a-latest-station');
const teamALatestTime = $('#team-a-latest-time');
const teamARemainingSquares = $('#team-a-remaining-squares');
const teamBLatest = $('#team-b-latest-station');
const teamBLatestTime = $('#team-b-latest-time');
const teamBRemainingSquares = $('#team-b-remaining-squares');
const teamCLatest = $('#team-c-latest-station');
const teamCLatestTime = $('#team-c-latest-time');
const teamCRemainingSquares = $('#team-c-remaining-squares');
const teamDLatest = $('#team-d-latest-station');
const teamDLatestTime = $('#team-d-latest-time');
const teamDRemainingSquares = $('#team-d-remaining-squares');
const updatedTime = $('#updated-time');
// 各チームのmodalチーム名
const teamAModalName = $('#team-a-modal-name');
const teamBModalName = $('#team-b-modal-name');
const teamCModalName = $('#team-c-modal-name');
const teamDModalName = $('#team-d-modal-name');

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
setInterval(main, interval);

/* ==========function========== */
/**
 * メインメソッド
 * 画面表示時と10秒おきに実行する
 */
async function main() {
    // 更新時刻の取得
    updatedTime.text(getCurrentTime());

    // チーム名の表示
    teamAInformationName.text(Constants.TEAM_A_NAME);
    teamBInformationName.text(Constants.TEAM_B_NAME);
    teamCInformationName.text(Constants.TEAM_C_NAME);
    teamDInformationName.text(Constants.TEAM_D_NAME);
    teamAModalName.text(Constants.TEAM_A_NAME);
    teamBModalName.text(Constants.TEAM_B_NAME);
    teamCModalName.text(Constants.TEAM_C_NAME);
    teamDModalName.text(Constants.TEAM_D_NAME);

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
 * @returns string 時刻
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
 * @returns object
 */
async function fetchJsonData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzvSlhngYRqQ_xKVZ5mF7S-sNbEeA7YIfnq9na1r7mUvmNp1ReOLXgNR0BnyipltU1T/exec');
    const data = await response.json();
    return data;
};

/**
 * 位置情報（テキスト）のリセット
 */
function clearTeamLocation() {
    teamALatest.text('');
    teamALatestTime.text('');
    teamBLatest.text('');
    teamBLatestTime.text('');
    teamCLatest.text('');
    teamCLatestTime.text('');
    teamDLatest.text('');
    teamDLatestTime.text('');
};

/**
 * 位置情報の表示
 * @param {object} data オブジェクトに変換したデータ
 */
function displayTeamLocation(data) {
    const nextStationCode = getStationCode(data.nextStation.slice(-1)[0].nextStation);

    if(data.teamA.length > 0) {
        // teamAの位置情報(文字)の表示
        displayStringInformation(data.teamA, teamAIsAdded, teamALatest, teamALatestTime, teamARemainingSquares, nextStationCode);
        // teamAの電車コマの移動
        changeTrainPosition(teamATrain, data.teamA, teamATrainVisibility);
    } else {
        teamATrain.addClass('invisible-train');
    };
    if(data.teamB.length > 0) {
        // teamBの位置情報(文字)の表示
        displayStringInformation(data.teamB, teamBIsAdded, teamBLatest, teamBLatestTime, teamBRemainingSquares, nextStationCode);
        // teamBの電車コマの移動
        changeTrainPosition(teamBTrain, data.teamB, teamBTrainVisibility);
    } else {
        teamBTrain.addClass('invisible-train');
    };
    if(data.teamC.length > 0) {
        // teamCの位置情報(文字)の表示
        displayStringInformation(data.teamC, teamCIsAdded, teamCLatest, teamCLatestTime, teamCRemainingSquares, nextStationCode);
        // teamCの電車コマの移動
        changeTrainPosition(teamCTrain, data.teamC, teamCTrainVisibility);
    } else {
        teamCTrain.addClass('invisible-train');
    };
    if(data.teamD.length > 0) {
        // teamDの位置情報(文字)の表示
        displayStringInformation(data.teamD, teamDIsAdded, teamDLatest, teamDLatestTime, teamDRemainingSquares, nextStationCode);
        // teamDの電車コマの移動
        changeTrainPosition(teamDTrain, data.teamD, teamDTrainVisibility);
    } else {
        teamDTrain.addClass('invisible-train');
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
teamATrainVisibility.on('change', function() {
    changeTrainVisibility($(this), teamATrain, teamAIsAdded);
});
teamBTrainVisibility.on('change', function() {
    changeTrainVisibility($(this), teamBTrain, teamBIsAdded);
});
teamCTrainVisibility.on('change', function() {
    changeTrainVisibility($(this), teamCTrain, teamCIsAdded);
});
teamDTrainVisibility.on('change', function() {
    changeTrainVisibility($(this), teamDTrain, teamDIsAdded);
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
        destinationStation.attr('x', nextStationBox.attr('x'));
        destinationStation.attr('y', nextStationBox.attr('y'));

        digitalDisplayJP.text(nextStation.nextStation);
    };
};


/* 履歴モーダルの表示 */
teamAInformation.on('click', function() {
    setInformationToModal(Constants.TEAM_A_NAME, responseData.teamA);
    teamInformationModal.show();
});
teamBInformation.on('click', function() {
    setInformationToModal(Constants.TEAM_B_NAME, responseData.teamB);
    teamInformationModal.show();
});
teamCInformation.on('click', function() {
    setInformationToModal(Constants.TEAM_C_NAME, responseData.teamC);
    teamInformationModal.show();
});
teamDInformation.on('click', function() {
    setInformationToModal(Constants.TEAM_D_NAME, responseData.teamD);
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
