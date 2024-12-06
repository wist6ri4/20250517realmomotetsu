/*========== 定数を設定 ==========*/
const Constants = {
    /* チーム名 */
    // この変更で画面表示のチーム名はすべて変更される。
    TEAM_A_NAME:'チームA',
    TEAM_B_NAME:'チームB',
    TEAM_C_NAME:'チームC',
    TEAM_D_NAME:'チームD',

    /* sessionStorageのkey */
    SESSION_TEAM_DATA: 'sessionTeamData',
    TEAM_A_IS_ADDED: 'teamAIsAdded',
    TEAM_B_IS_ADDED: 'teamBIsAdded',
    TEAM_C_IS_ADDED: 'teamCIsAdded',
    TEAM_D_IS_ADDED: 'teamDIsAdded',
};

Object.freeze(Constants);
export { Constants };
