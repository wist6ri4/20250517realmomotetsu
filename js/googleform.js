/* ========== モジュールのインポート ========== */
import { Constants } from './constants.js';
import { Common } from './common.js';
import { Supabase } from './supabase.js';

/*========== 画面要素の取得 ==========*/
const formTeamNameSelect = $('#form_team_select'); // フォーム（チーム名）
const formStationNameSelect = $('#form_station_select'); // フォーム（駅名）
const buttonSubmit = $('#button_submit'); // 送信ボタン


/*========== 画面表示時の実行メソッド ==========*/
main();


/* ==========function========== */
/**
 * 画面表示時に実行する
 */
async function main() {
    // チーム名の取得
    await Common.getAndSetTeamName();
    // チーム名のオプションを作成
    const teams = JSON.parse(sessionStorage.getItem(Constants.SESSION_TEAM_NAME));
    teams.forEach(function(team) {
        formTeamNameSelect.append($('<option>').val(team.team_id).text(team.team_name));
    });

    // formTeamNameSelect.append($('<option>').val(0).text('チームA'));

    // 駅名の取得
    await Common.getAndSetStations();
    // 駅名のオプションを作成
    const stations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));
    stations.forEach(function(station) {
        formStationNameSelect.append($('<option>').val(station.station_id).text(station.station_name));
    });
};


buttonSubmit.on('click', submit);

/**
 * フォームを送信する
 */
async function submit() {
    // フォームの値を取得
    const teamId = $('#form_team_select').val();
    const teamName = $('#form_team_select option:selected').text();
    const stationId = $('#form_station_select').val();
    const station_name = $('#form_station_select option:selected').text();

    // チーム名か駅名が選択されていない場合はアラートを表示
    if(teamId == 0 || stationId == 0) {
        alert('チーム名と駅名を選択してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + teamName + '\n今いる駅：' + station_name);
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        // transit_stationsにデータを追加
        await Supabase.insertTransitStations(teamId, stationId);
        // pointsにデータを追加
        await Supabase.insertMovingPoints(teamId);
        alert('送信しました。');
    } catch (error) {
        alert('送信に失敗しました。', error);
    } finally {
        clearForm();
    };
};


/**
 * フォームをクリアする
 */
function clearForm() {
    formTeamNameSelect.val(0);
    formStationNameSelect.val(0);
};