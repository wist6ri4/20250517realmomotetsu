/*========== 定数を設定 ==========*/
const Constants = {
    /* チーム名 */
    // この変更で画面表示のチーム名はすべて変更される。
    TEAM_A_NAME:'チームA',
    TEAM_B_NAME:'チームB',
    TEAM_C_NAME:'チームC',
    TEAM_D_NAME:'チームD',

    /* sessionStorageのkey */
    SESSION_TEAM_DATA: '20250517_realmomotetsu_session_team_data',
    SESSION_TEAM_NAME: '20250517_realmomotetsu_session_team_name',
    SESSION_STATIONS: '20250517_realmomotetsu_session_stations',
    SESSION_NEARBY_STATIONS: '20250517_realmomotetsu_session_nearby_stations',
    SESSION_UUID: '20250517_realmomotetsu_session_uuid',

    /* Supabase */
    SUPABASE_URL: 'https://zrmxdhuwzcbvxvwbmtul.supabase.co', // Supabase URL
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpybXhkaHV3emNidnh2d2JtdHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MzkyMTAsImV4cCI6MjA1NTAxNTIxMH0.EujNJOmqOB6RHJVbzVYeMsDwDDSKwQVtiJW_gbTxRUU', // Supabase Key

    /* ポイント */
    POINT_FOR_MOVING: 5, // 移動時のポイント

    /* ルーレットから排除する範囲の所要時間 */
    ELIMINATION_TIME_RANGE_MINUTES: 15,

    /* パスワード */
    PASSWORD: 'rm517',
    /* Cookie */
    COOKIE_KEY: '20250517_realmomotetsu_access_granted',
};

/* ========== モジュールのエクスポート ========== */
Object.freeze(Constants);
export { Constants };
