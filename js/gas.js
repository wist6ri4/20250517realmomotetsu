function doGet() {
    // シートからデータを取得
    const sheet = SpreadsheetApp.openById('1g-jX9HySczn6EzK1gahPhALrXtcjEsYTmuIRhh2embk')
    const teamSheet = sheet.getSheetByName('フォーム');
    const teamData = teamSheet.getRange(2, 1, teamSheet.getLastRow() - 1, 3).getValues();
    const nextStationSheet = sheet.getSheetByName('nextStation');
    const nextStationData = nextStationSheet.getRange(2, 1, nextStationSheet.getLastRow() - 1, 2).getValues();

    let jsonData = {
        teamA: [],
        teamB: [],
        teamC: [],
        teamD: [],
        nextStation: [],
    };
    let teamAList = [];
    let teamBList = [];
    let teamCList = [];
    let teamDList = [];
    let nextStationList = [];

    // フォームとこのチーム名を変えるとチーム名変更に対応できる
    const TEAM_A_NAME = 'チームA';
    const TEAM_B_NAME = 'チームB';
    const TEAM_C_NAME = 'チームC';
    const TEAM_D_NAME = 'チームD';

    // 各チームのデータ整形
    teamData.forEach(function(row) {
        // 更新日時の取得
        const dt = new Date(row[0]);
        const strTime = ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) + ':' + ('0' + dt.getSeconds()).slice(-2);

        const team = {
            time: dt,
            strTime: strTime,
            team: row[1],
            location: row[2]
        };

        // チームごとに分別
        switch(team.team) {
            case TEAM_A_NAME:
                teamAList.push(team);
                break;
            case TEAM_B_NAME:
                teamBList.push(team);
                break;
            case TEAM_C_NAME:
                teamCList.push(team);
                break;
            case TEAM_D_NAME:
                teamDList.push(team);
                break;
            default:
                console.error('チーム名にエラーがあります。');
        };
    });

    // 次の目的地データ整形
    nextStationData.forEach(function(row) {
        // 更新日時の取得
        let dt = new Date(row[0]);
        let strTime = ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) + ':' + ('0' + dt.getSeconds()).slice(-2);

        // 行の配列データをjson形式に整形
        const nextStation = {
            time: dt,
            strTime: strTime,
            nextStation: row[1],
        };
        nextStationList.push(nextStation);
    });

    // レスポンス用jsonに格納
    jsonData.teamA = teamAList;
    jsonData.teamB = teamBList;
    jsonData.teamC = teamCList;
    jsonData.teamD = teamDList;
    jsonData.nextStation = nextStationList;

    // レスポンスデータの作成
    let output = ContentService.createTextOutput()
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(jsonData));
    return output;
};