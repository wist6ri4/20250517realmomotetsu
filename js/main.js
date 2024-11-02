const mapDiv = $('#map');

// データの追加フラグ
// 一度取得できれば更新の必要がないためsessionStorageで管理
const teamAIsAdded = 'teamAIsAdded';
sessionStorage.setItem(teamAIsAdded, 0);
const teamBIsAdded = 'teamBIsAdded';
sessionStorage.setItem(teamBIsAdded, 0);
const teamCIsAdded = 'teamCIsAdded';
sessionStorage.setItem(teamCIsAdded, 0);
const teamDIsAdded = 'teamDIsAdded';
sessionStorage.setItem(teamDIsAdded, 0);

// 各チームの情報表示部
const teamALatest = $('#teamALatest');
const teamANext = $('#teamANext');
const teamBLatest = $('#teamBLatest');
const teamBNext = $('#teamBNext');
const teamCLatest = $('#teamCLatest');
const teamCNext = $('#teamCNext');
const teamDLatest = $('#teamDLatest');
const teamDNext = $('#teamDNext');
const updatedTime = $('#updatedTime');

// 各チームの電車コマ
const teamATrain = $('#team-a-train');
const teamBTrain = $('#team-b-train');
const teamCTrain = $('#team-c-train');
const teamDTrain = $('#team-d-train');


// トグルボタン
const teamATrainVisibility = $('#team-a-train-visibility');
const teamBTrainVisibility = $('#team-b-train-visibility');
const teamCTrainVisibility = $('#team-c-train-visibility');
const teamDTrainVisibility = $('#team-d-train-visibility');

setInterval(main, 10000);

async function main() {
    // 更新時刻の取得
    updatedTime.text(getCurrentTime());

    // APIにアクセスしてデータを取得
    const data = await fetchJsonData()

    // 位置情報（テキスト）のリセット
    clearTeamLocation();
    // 位置情報（テキスト）の表示
    displayTeamLocation(data);
};

/**
 * 現在時刻の取得
 * @returns string 時刻
 */
function getCurrentTime() {
    const ct = new Date();
    const strCurrentTime = ct.getFullYear() + '/' + ('0' + (ct.getMonth() + 1)).slice(-2) + '/' + ('0' + ct.getDate()).slice(-2) + ' ' + ct.getHours() + ':' + ('0' + ct.getMinutes()).slice(-2) + ':' + ('0' + ct.getSeconds()).slice(-2);
    return strCurrentTime;
};

/**
 * APIにアクセスしてデータを取得
 * @returns object
 */
async function fetchJsonData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbztSGIlqMexwoML9SFgFGE5eK3GP6PlCfbi61dl2r__ntKEFcVGe4SiEFrXxIrdMiGR9w/exec');
    const data = await response.json();
    return data;
};

/**
 * 位置情報（テキスト）のリセット
 */
function clearTeamLocation() {
    teamANext.text('');
    teamALatest.text('');
    teamBNext.text('');
    teamBLatest.text('');
    teamCNext.text('');
    teamCLatest.text('');
    teamDNext.text('');
    teamDLatest.text('');
};

/**
 * 位置情報（テキスト）の表示
 * @param {object} data オブジェクトに変換したデータ
 */
function displayTeamLocation(data) {
    if(data.teamA.length > 0) {
        // teamAの位置情報(文字)の表示
        displayStringInformation(data.teamA, teamAIsAdded, teamALatest, teamANext);
        // teamAの電車コマの移動
        changeTrainPosition(teamATrain, data.teamA, teamATrainVisibility);
    } else {
        teamATrain.addClass('invisible-train');
    };
    if(data.teamB.length > 0) {
        // teamBの位置情報(文字)の表示
        displayStringInformation(data.teamB, teamBIsAdded, teamBLatest, teamBNext);
        // teamBの電車コマの移動
        changeTrainPosition(teamBTrain, data.teamB, teamBTrainVisibility);
    } else {
        teamBTrain.addClass('invisible-train');
    };
    if(data.teamC.length > 0) {
        // teamCの位置情報(文字)の表示
        displayStringInformation(data.teamC, teamCIsAdded, teamCLatest, teamCNext);
        // teamCの電車コマの移動
        changeTrainPosition(teamCTrain, data.teamC, teamCTrainVisibility);
    } else {
        teamCTrain.addClass('invisible-train');
    };
    if(data.teamD.length > 0) {
        // teamDの位置情報(文字)の表示
        displayStringInformation(data.teamD, teamDIsAdded, teamDLatest, teamDNext);
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
 */
function displayStringInformation(data, isAdded, latestData, nextData) {
    // データが登録されているのでsessionStorageのisAddedをtrueにする
    sessionStorage.setItem(isAdded, 1);
    // 最後から2行目の取得
    const latestLocationData = data.slice(-2)[0];
    // 最終行の取得
    const nextLocationData = data.slice(-1)[0];
    latestData.text(latestLocationData.strTime + ' ' + latestLocationData.location);
    nextData.text(nextLocationData.strTime + ' ' + nextLocationData.location);
};

/**
 * 電車コマの位置の変更
 * @param {object} train 電車コマ
 * @param {string} location 最終到着駅
 * @param {object} visibility トグルボタン
 * 駅コードを下にマス目を取得し、そのマスの座標を電車コマに反映
 */
function changeTrainPosition(train, data, visibility) {
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