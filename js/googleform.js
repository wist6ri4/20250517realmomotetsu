import { Constants } from './constants.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// SUPABASEのクライアントの作成
const supabase = createClient(Constants.SUPABASE_URL, Constants.SUPABASE_KEY);

// 画面要素の取得（初期表示用）
const formTeamNameSelect = $('#form-team-select'); // フォーム（チーム名）
const formStationNameSelect = $('#form-station-select'); // フォーム（駅名）
const submitForm = $('#submit-form'); // 送信ボタン


/*========== 画面表示時の実行メソッド ==========*/
main();


/* ==========function========== */
/**
 * 画面表示時に実行する
 */
async function main() {
    // チーム名のオプションを作成
    const {data: teamsData, error: teamsError} = await supabase
        .from('teams')
        .select('*');

    if(teamsError) {
        console.error(teamsError);
        return;
    } else {
        teamsData.forEach(function(team) {
            formTeamNameSelect.append($('<option>').val(team.team_id).text(team.team_name));
        })
    };

    // 駅名のオプションを作成
    const {data: stationsData, error: stationsError} = await supabase
        .from('stations')
        .select('*');

    if(stationsError) {
        console.error(stationsError);
        return;
    } else {
        stationsData.forEach(function(station) {
            formStationNameSelect.append($('<option>').val(station.station_id).text(station.station_name));
        })
    };
};


submitForm.on('click', submit);

async function submit() {
    const teamId = $('#form-team-select').val();
    const stationId = $('#form-station-select').val();

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

function clearForm() {
    formTeamNameSelect.val(0);
    formStationNameSelect.val(0);
};