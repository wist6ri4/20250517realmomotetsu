const mapDiv = $('#map');
const teamALatest = $('#teamALatest');
const teamANext = $('#teamANext');
const teamBLatest = $('#teamBLatest');
const teamBNext = $('#teamBNext');
const teamCLatest = $('#teamCLatest');
const teamCNext = $('#teamCNext');
const teamDLatest = $('#teamDLatest');
const teamDNext = $('#teamDNext');
const updatedTime = $('#updatedTime');
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
 * @param {*} data オブジェクトに変換したデータ
 */
function displayTeamLocation(data) {
    if(data.teamA.length > 0) {
        var teamANextLocationData = data.teamA.slice(-1)[0];
        var teamALatestLocationData = data.teamA.slice(-2)[0];
        teamALatest.text(teamALatestLocationData.strTime + '　' + teamALatestLocationData.location);
        teamANext.text(teamANextLocationData.strTime + '　' + teamANextLocationData.location);
    };
    if(data.teamB.length > 0) {
        var teamBNextLocationData = data.teamB.slice(-1)[0];
        var teamBLatestLocationData = data.teamB.slice(-2)[0];
        teamBLatest.text(teamBLatestLocationData.strTime + '　' + teamBLatestLocationData.location);
        teamBNext.text(teamBNextLocationData.strTime + '　' + teamBNextLocationData.location);
    };
    if(data.teamC.length > 0) {
        var teamCNextLocationData = data.teamC.slice(-1)[0];
        var teamCLatestLocationData = data.teamC.slice(-2)[0];
        teamCLatest.text(teamCLatestLocationData.strTime + '　' + teamCLatestLocationData.location);
        teamCNext.text(teamCNextLocationData.strTime + '　' + teamCNextLocationData.location);
    };
    if(data.teamD.length > 0) {
        var teamDNextLocationData = data.teamD.slice(-1)[0];
        var teamDLatestLocationData = data.teamD.slice(-2)[0];
        teamDLatest.text(teamDLatestLocationData.strTime + '　' + teamDLatestLocationData.location);
        teamDNext.text(teamDNextLocationData.strTime + '　' + teamDNextLocationData.location);
    };
};