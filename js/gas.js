function doGet() {
    // シートからデータを取得
    const teamSheet = SpreadsheetApp.openById('1g-jX9HySczn6EzK1gahPhALrXtcjEsYTmuIRhh2embk').getSheetByName('フォーム');
    const teamData = teamSheet.getRange(2, 1, teamSheet.getLastRow() - 1, 3).getValues();
    const nextStationSheet = SpreadsheetApp.openById('1g-jX9HySczn6EzK1gahPhALrXtcjEsYTmuIRhh2embk').getSheetByName('nextStation');
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

    // 各チームのデータ整形
    teamData.forEach(function(row) {
        // 更新日時の取得
        const dt = new Date(row[0]);
        const strTime = ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) + ':' + ('0' + dt.getSeconds()).slice(-2);

        const team = {
            time: new Date(row[0]),
            strTime: strTime,
            team: row[1],
            location: row[2]
        };

        // チームごとに分別
        switch(team.team) {
            case 'チームA':
                teamAList.push(team);
                break;
            case 'チームB':
                teamBList.push(team);
                break;
            case 'チームC':
                teamCList.push(team);
                break;
            case 'チームD':
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
            time: new Date(row[0]),
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