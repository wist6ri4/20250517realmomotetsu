/* ========== モジュールのインポート ========== */
import { Constants } from "./constants.js";
import { Common } from "./common.js";
import { Supabase } from "./supabase.js";

/*========== 画面要素の取得 ==========*/
const $addPointTeamSelect = $('#add-point-team-select'); // ポイント加算チーム選択
const $addPoint = $('#add-point'); // 加算ポイント
const $subPointTeamSelect = $('#sub-point-team-select'); // ポイント減算チーム選択
const $subPoint = $('#sub-point'); // 減算ポイント
const $movePointFromSelect = $('#move-point-from-select'); // ポイント移動元チーム選択
const $movePointToSelect = $('#move-point-to-select'); // ポイント移動先チーム選択
const $movePoint = $('#move-point'); // 移動ポイント
const $chargePointTeamSelect = $('#charge-point-team-select'); // ポイント換金チーム選択

/*========== 画面表示時の実行メソッド ==========*/
main();

/* ==========function========== */
/**
 *  画面表示時に実行する
 */
async function main() {
    // チーム名の取得
    await Common.getAndSetTeamName();
    // チーム名のオプションを作成
    const teams = JSON.parse(sessionStorage.getItem(Constants.SESSION_TEAM_NAME));
    teams.forEach(function(team) {
        $addPointTeamSelect.append($('<option>').val(team.team_id).text(team.team_name));
        $subPointTeamSelect.append($('<option>').val(team.team_id).text(team.team_name));
        $movePointFromSelect.append($('<option>').val(team.team_id).text(team.team_name));
        $movePointToSelect.append($('<option>').val(team.team_id).text(team.team_name));
        $chargePointTeamSelect.append($('<option>').val(team.team_id).text(team.team_name));
    });
};


$('#add-point-button').on('click', addPoint);

/**
 * ポイント加算
 */
async function addPoint() {
    // フォームの値を取得
    const teamId = $addPointTeamSelect.val();
    const teamName = $('#add-point-team-select option:selected').text();
    const point = $('#add-point').val();

    // チーム名かポイントが入力されていない場合はアラートを表示
    if(teamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + teamName + '\nポイント数：' + point + ' pt');
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        const result = await Supabase.insertAdditionalPoints(teamId, point);
        alert('送信しました。');
    } catch (error) {
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};


$('#sub-point-button').on('click', subPoint);

/**
 * ポイント減算
 */
async function subPoint() {
    // フォームの値を取得
    const teamId = $subPointTeamSelect.val();
    const teamName = $('#sub-point-team-select option:selected').text();
    const point = $('#sub-point').val();

    // チーム名かポイントが入力されていない場合はアラートを表示
    if(teamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + teamName + '\nポイント数：－' + point + ' pt');
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        const result = await Supabase.insertSubtractionPoints(teamId, point);
        alert('送信しました。');
    } catch (error) {
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};


$('#move-point-button').on('click', movePoint);

/**
 * ポイント移動
 */
async function movePoint() {
    // フォームの値を取得
    const fromTeamId = $movePointFromSelect.val();
    const toTeamId = $movePointToSelect.val();
    const point = $movePoint.val();

    // チーム名かポイントが入力されていない場合はアラートを表示
    if(fromTeamId == 0 || toTeamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nポイント数：' + point + ' pt\n'
        + '移動元：' + $('#move-point-from-select option:selected').text() + '\n'
        + '移動先：' + $('#move-point-to-select option:selected').text());
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        const result = await Supabase.insertAddAndSubPoints(toTeamId, fromTeamId, point);
        alert('送信しました。');
    } catch (error) {
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};

$('#charge-point-button').on('click', chargePoint);

/**
 * ポイント換金
 */
async function chargePoint() {
    // フォームの値を取得
    const teamId = $chargePointTeamSelect.val();

    // チーム名が入力されていない場合はアラートを表示
    if(teamId == 0) {
        alert('チーム名を選択してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + $('#charge-point-team-select option:selected').text());
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        const result = await Supabase.updateNotChargedPoints(teamId);
        alert('送信しました。');
    } catch (error) {
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};


/**
 * フォームの値をリセットする
 */
function clearForms() {
    $addPointTeamSelect.val(0);
    $addPoint.val(0);
    $subPointTeamSelect.val(0);
    $subPoint.val(0);
    $movePointFromSelect.val(0);
    $movePointToSelect.val(0);
    $movePoint.val(0);
    $chargePointTeamSelect.val(0);
};
