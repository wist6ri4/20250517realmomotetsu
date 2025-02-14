import { Constants } from './constants.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// SUPABASEのクライアントの作成
const supabase = createClient(Constants.SUPABASE_URL, Constants.SUPABASE_KEY);

// 画面要素の取得（初期表示用）
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
    // チーム名のオプションを作成
    // const {data: teamsData, error: teamsError} = await supabase
    //     .from('teams')
    //     .select('*');

    // if(teamsError) {
    //     console.error(teamsError);
    //     return;
    // } else {
    //     teamsData.forEach(function(team) {
    //         formTeamNameSelect.append($('<option>').val(team.team_id).text(team.team_name));
    //     });
    // };
    formTeamNameSelect.append($('<option>').val(0).text('チームA'));

    // 駅名のオプションを作成
    // const {data: stationsData, error: stationsError} = await supabase
    //     .from('stations')
    //     .select('*');

    // if(stationsError) {
    //     console.error(stationsError);
    //     return;
    // } else {
    //     stationsData.forEach(function(station) {
    //         formStationNameSelect.append($('<option>').val(station.station_id).text(station.station_name));
    //     });
    // };
    formStationNameSelect.append($('<option>').val(0).text('南町田グランベリーパーク'));
};


buttonSubmit.on('click', submit);

/**
 * フォームを送信する
 */
async function submit() {
    const teamId = $('#form_team_select').val();
    const stationId = $('#form_station_select').val();

    if(teamId == 0 || stationId == 0) {
        alert('チーム名と駅名を選択してください。');
        return;
    };

    const {data, error} = await supabase
        .from('transit_stations')
        .insert([
            {team_id: teamId, station_id: stationId}
        ]);

    if(error) {
        console.error(error);
        return;
    } else {
        alert('登録が完了しました。');
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