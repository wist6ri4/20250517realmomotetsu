function doGet() {
    let sheet = SpreadsheetApp.openById('1g-jX9HySczn6EzK1gahPhALrXtcjEsYTmuIRhh2embk').getSheetByName('フォーム');
    let data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();

    let jsonData = {
        teamA: [],
        teamB: [],
        teamC: [],
        teamD: [],
    };
    let teamAList = [];
    let teamBList = [];
    let teamCList = [];
    let teamDList = [];

    data.forEach(function(row) {
        let dt = new Date(row[0]);
        let strTime = ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) + ':' + ('0' + dt.getSeconds()).slice(-2);

        let teamData = {
            time: new Date(row[0]),
            strTime: strTime,
            team: row[1],
            location: row[2]
        };

        switch(teamData.team) {
            case 'チームA':
                teamAList.push(teamData);
                break;
            case 'チームB':
                teamBList.push(teamData);
                break;
            case 'チームC':
                teamCList.push(teamData);
                break;
            case 'チームD':
                teamDList.push(teamData);
                break;
            default:
                console.error('チーム名にエラーがあります。');
        };
    });

    jsonData.teamA = teamAList;
    jsonData.teamB = teamBList;
    jsonData.teamC = teamCList;
    jsonData.teamD = teamDList;

    let output = ContentService.createTextOutput()
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(jsonData));
    console.info(output);
    return output;
}