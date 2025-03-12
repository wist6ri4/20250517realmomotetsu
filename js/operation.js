/* ========== モジュールのインポート ========== */
import { checkUuid } from "./checkUuid.js";
import { Constants } from "./constants.js";
import { Common } from "./common.js";
import { Supabase } from "./supabase.js";
import { Logger } from "./logging.js";

/*========== Logger初期化 ==========*/
const logger = new Logger();

/*========== 画面要素の取得 ==========*/
const $goalStationSelect = $('#goal-station-select'); // 目的駅選択
const $addPointTeamSelect = $('#add-point-team-select'); // ポイント加算チーム選択
const $addPoint = $('#add-point'); // 加算ポイント
const $isChargedForAdd = $('#is-charged-for-add'); // 加算時の換金フラグ
const $subPointTeamSelect = $('#sub-point-team-select'); // ポイント減算チーム選択
const $subPoint = $('#sub-point'); // 減算ポイント
const $isChargedForSub = $('#is-charged-for-sub'); // 減算時の換金フラグ
const $movePointFromSelect = $('#move-point-from-select'); // ポイント移動元チーム選択
const $movePointToSelect = $('#move-point-to-select'); // ポイント移動先チーム選択
const $movePoint = $('#move-point'); // 移動ポイント
const $isChargedForMove = $('#is-charged-for-move'); // 移動時の換金フラグ
const $chargePointTeamSelect = $('#charge-point-team-select'); // ポイント換金チーム選択

/*========== 画面表示時の実行メソッド ==========*/
main();

/* ========== イベントハンドラ ========== */
$('#set-goal-station-button').on('click', setGoalStation);
$('#add-point-button').on('click', addPoint);
$('#sub-point-button').on('click', subPoint);
$('#move-point-button').on('click', movePoint);
$('#charge-point-button').on('click', chargePoint);

/* ========== イベントハンドラ（フォーマット） ========== */
$('#add-point').on('input', function() {
    $('#changed-add-point').text(Common.formatPoint($(this).val()));
});
$('#sub-point').on('input', function() {
    $('#changed-sub-point').text(Common.formatPoint($(this).val()));
});
$('#move-point').on('input', function() {
    $('#changed-move-point').text(Common.formatPoint($(this).val()));
});

/* ==========function========== */
/**
 *  画面表示時に実行する
 */
async function main() {
    try {
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

        // 駅名の取得
        await Common.getAndSetStations();
        // 駅名のオプションを作成
        const stations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));
        stations.forEach(function(station) {
            $goalStationSelect.append($('<option>').val(station.station_id).text(station.station_name));
        });

        logger.Debug('Displayed.');
    } catch {
        logger.Error('Failed to Display.');
    }
};

/**
 * 目的駅を設定する
 */
async function setGoalStation() {
    // フォームの値を取得
    const stationId = $goalStationSelect.val();
    const stationName = $('#goal-station-select option:selected').text();

    // 駅名が選択されていない場合はアラートを表示
    if(stationId == 0) {
        alert('駅名を選択してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\n目的駅：' + stationName);
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        const result = await Supabase.insertGoalStations(stationId);
        logger.Info(`Success to send goal station. StationName:${stationName}`);
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send goal station.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};

/**
 * ポイント加算
 */
async function addPoint() {
    // フォームの値を取得
    const teamId = $addPointTeamSelect.val();
    const teamName = $('#add-point-team-select option:selected').text();
    const point = $('#add-point').val();
    const isCharged = $isChargedForAdd.prop('checked');

    // チーム名かポイントが入力されていない場合はアラートを表示
    if(teamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + teamName + '\nポイント数：' + point + ' pt' + (isCharged ? '（換金あり）' : '（換金なし）'));
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        let result;
        if(isCharged) {
            result = await Supabase.insertAdditionalChargedPoints(teamId, point);
        } else {
            result = await Supabase.insertAdditionalPoints(teamId, point);
        }
        logger.Info(`Success to send additional points. TeamName:${teamName} Point:${point} IsCharged:${isCharged}`);
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send additional points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};

/**
 * ポイント減算
 */
async function subPoint() {
    // フォームの値を取得
    const teamId = $subPointTeamSelect.val();
    const teamName = $('#sub-point-team-select option:selected').text();
    const point = $('#sub-point').val();
    const isCharged = $isChargedForSub.prop('checked');

    // チーム名かポイントが入力されていない場合はアラートを表示
    if(teamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + teamName + '\nポイント数：－' + point + ' pt' + (isCharged ? '（換金あり）' : '（換金なし）'));
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        let result;
        if(isCharged) {
            result = await Supabase.insertSubtractionChargedPoints(teamId, point);
        } else {
            result = await Supabase.insertSubtractionPoints(teamId, point);
        }
        logger.Info(`Success to send subtraction points. TeamName:${teamName} Point:${point} IsCharged:${isCharged}`);
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send subtraction points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};

/**
 * ポイント移動
 */
async function movePoint() {
    // フォームの値を取得
    const fromTeamId = $movePointFromSelect.val();
    const toTeamId = $movePointToSelect.val();
    const point = $movePoint.val();
    const isCharged = $isChargedForMove.prop('checked');

    // チーム名かポイントが入力されていない場合はアラートを表示
    if(fromTeamId == 0 || toTeamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    };

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\nポイント数：' + point + ' pt'
        + (isCharged ? '（換金あり）' : '（換金なし）') + '\n'
        + '移動元：' + $('#move-point-from-select option:selected').text() + '\n'
        + '移動先：' + $('#move-point-to-select option:selected').text());
    if(!is_approved) {
        return;
    };

    // 送信処理
    try {
        let result;
        if(isCharged) {
            result = await Supabase.insertAddAndSubChargedPoints(toTeamId, fromTeamId, point);
        } else {
            const result = await Supabase.insertAddAndSubPoints(toTeamId, fromTeamId, point);
        }
        logger.Info(`Success to send moving points. FromTeamId:${fromTeamId} ToTeamId:${toTeamId} Point:${point} IsCharged:${isCharged}`);
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send moving points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};

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
        logger.Info(`Success to charge points. TeamId:${teamId}`);
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to charge points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    };
};


/**
 * フォームの値をリセットする
 */
function clearForms() {
    $goalStationSelect.val(0);
    $addPointTeamSelect.val(0);
    $addPoint.val(0);
    $isChargedForAdd.prop('checked', false);
    $subPointTeamSelect.val(0);
    $subPoint.val(0);
    $isChargedForSub.prop('checked',false);
    $movePointFromSelect.val(0);
    $movePointToSelect.val(0);
    $movePoint.val(0);
    $isChargedForMove.prop('checked', false);
    $chargePointTeamSelect.val(0);
};
