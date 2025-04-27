/* ========== モジュールのインポート ========== */
import { checkUuid } from './module/checkUuid.js';
import { Constants } from './module/constants.js';
import { Common } from './module/common.js';
import { Supabase } from './module/supabase.js';
import { Logger } from './module/logging.js';
import { StationCode } from './module/stationCode.js';
import { Dijkstra } from './module/dijkstra.js';
import { MissionSenzokuike } from './module/missionTool.js';

/*========== Logger初期化 ==========*/
const logger = new Logger();

/*========== 画面要素の取得 ==========*/
const $goalStationSelect = $('#goal-station-select'); // 目的駅選択
const $arrivalGoalTeamSelect = $('#arrival-goal-team-select'); // 目的駅到着チーム選択
const $arrivalGoalPoint = $('#arrival-goal-point'); // 目的駅到着ポイント
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
const $senzokuikeMissionAnswer = $('#senzokuike-mission-answer'); // 洗足池ミッションの解答
const $bombiiTeamSelect = $('#bombii-team-select'); // ボンビー対象チーム選択

/*========== 画面表示時の実行メソッド ==========*/
main();

/* ========== イベントハンドラ ========== */
$('#set-goal-station-button').on('click', setGoalStation);
$('#arrival-goal-button').on('click', arrivalGoal);
$('#check-bombii-button').on('click', getBombiiTableInformation);
$('#bombii-button').on('click', confirmBombii);
$('#add-point-button').on('click', addPoint);
$('#sub-point-button').on('click', subPoint);
$('#move-point-button').on('click', movePoint);
$('#charge-point-button').on('click', chargePoint);
$('#senzokuike-mission-calculate-button').on('click', calculateMissionSenzokuikeScore);
$('#senzokuike-mission-reset-button').on('click', resetMissionSenzokuikeForm);
$('#bombii-manual-button').on('click', setBombii);

/* ========== イベントハンドラ（フォーマット） ========== */
$('#arrival-goal-point').on('input', function () {
    $('#changed-arrival-goal-point').text(Common.formatPoint($(this).val()));
});
$('#add-point').on('input', function () {
    $('#changed-add-point').text(Common.formatPoint($(this).val()));
});
$('#sub-point').on('input', function () {
    $('#changed-sub-point').text(Common.formatPoint($(this).val()));
});
$('#move-point').on('input', function () {
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
        teams.forEach(function (team) {
            $arrivalGoalTeamSelect.append($('<option>').val(team.team_id).text(team.team_name));
            $bombiiTeamSelect.append($('<option>').val(team.team_id).text(team.team_name));
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
        stations.forEach(function (station) {
            $goalStationSelect.append(
                $('<option>').val(station.station_id).text(station.station_name)
            );
        });

        await getBombiiTableInformation();

        logger.Info('Displayed.');
    } catch {
        logger.Error('Failed to Display.');
    }
}

/**
 * 目的駅を設定する
 */
async function setGoalStation() {
    // フォームの値を取得
    const stationId = $goalStationSelect.val();
    const stationName = $('#goal-station-select option:selected').text();

    // 駅名が選択されていない場合はアラートを表示
    if (stationId == 0) {
        alert('駅名を選択してください。');
        return;
    }

    // 送信確認
    const is_approved = confirm('以下の内容で送信しますか？\n\n目的駅：' + stationName);
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const result = await Supabase.insertGoalStations(stationId);
        logger.Info(`Success to send goal station. StationName:${stationName}`);

        const requestBody = {
            type: 'set_goal_station',
            data: {
                station_id: stationId,
                station_name: stationName,
            },
        };
        await Common.notifyToDiscord(requestBody);

        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send goal station.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

/**
 * 目的駅到着処理
 */
async function arrivalGoal() {
    // フォームの値を取得
    const teamId = $arrivalGoalTeamSelect.val();
    const teamName = $('#arrival-goal-team-select option:selected').text();
    const arrivalGoalPoint = $arrivalGoalPoint.val();

    // チーム名か駅名が選択されていない場合はアラートを表示
    if (teamId == 0 || arrivalGoalPoint == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    }

    // 送信確認
    const is_approved = confirm(
        '以下の内容で送信しますか？\n\nチーム名：' +
            teamName +
            '\nポイント数：' +
            arrivalGoalPoint +
            ' pt'
    );
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const addPointResult = await Supabase.insertAdditionalPoints(teamId, arrivalGoalPoint);
        const chargePointResult = await Supabase.updateNotChargedPoints(teamId);
        logger.Info(`Success to send arrival goal. TeamName:${teamName} Point:${arrivalGoalPoint}`);
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to complete arrival process.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

/*
各チームのボンビー情報
*/
const bombiiInformation = {
    teamA: {
        stationId: null,
        remainingStations: 0,
        chargedPoints: 0,
    },
    teamB: {
        stationId: null,
        remainingStations: 0,
        chargedPoints: 0,
    },
    teamC: {
        stationId: null,
        remainingStations: 0,
        chargedPoints: 0,
    },
    teamD: {
        stationId: null,
        remainingStations: 0,
        chargedPoints: 0,
    },
};

/**
 * 各チームの情報を取得してテーブルに表示し、データを保持する
 */
async function getBombiiTableInformation() {
    try {
        $('#bombii-table-tbody').empty();
        const latestTransitStations = await Supabase.getLatestTransitStations();
        const latestGoalStation = (await Supabase.getLatestGoalStation())[0];
        const chargedPointsList = await Supabase.getChargedPoints();

        latestTransitStations.forEach((latestTransitStation) => {
            // 各チームの現在地から残りマス数を計算
            const numRemainingSquares = Dijkstra.calculateTravelTimes(
                StationCode.stationGraph,
                latestTransitStation.station_id
            )[latestGoalStation.station_id].stations;

            // 各チームの総資産pt
            const chargedPoints = chargedPointsList[latestTransitStation.team_id]
                ? chargedPointsList[latestTransitStation.team_id]
                : 0;

            // テーブルの表示
            const tr = $('<tr>');
            tr.append($('<td>').text(latestTransitStation.team_id))
                .append($('<td>').text(StationCode.getStationName(latestTransitStation.station_id)))
                .append($('<td class="bombii-table-align-right">').text(numRemainingSquares + '駅'))
                .append($('<td class="bombii-table-align-right">').text(chargedPoints));
            $('#bombii-table-tbody').append(tr);

            // 各チームの残りマス数と暫定ボンビー情報の保持
            bombiiInformation[latestTransitStation.team_id].stationId =
                latestTransitStation.station_id;
            bombiiInformation[latestTransitStation.team_id].remainingStations = numRemainingSquares;
            bombiiInformation[latestTransitStation.team_id].chargedPoints = chargedPoints;
        });

        $('#updated-time').text(Common.getCurrentTime());
    } catch (error) {
        logger.Error('Failed to get bombii table information.', error);
        alert('ボンビー情報の取得に失敗しました。', error);
    }
}

/**
 * ボンビーを確定し、送信する
 */
async function confirmBombii() {
    const bombiiCandidates = Object.entries(bombiiInformation).reduce(
        (candidates, [teamId, info]) => {

            if (candidates.length === 0) {
                return [{ teamId, info }];
            }
            const cr = candidates[0].info.remainingStations;
            const ir = info.remainingStations;
            const cc = candidates[0].info.chargedPoints;
            const ic = info.chargedPoints;

            // 目的駅から遠い方がボンビー
            if (cr > ir) {
                return candidates;
            } else if (cr < ir) {
                return [{ teamId, info }];
            } else {
                // 目的駅からの距離が同じ場合、総資産で比較
                if (cc > ic) {
                    return candidates;
                } else if (cc < ic) {
                    return [{ teamId, info }];
                } else {
                    // 総資産も同じ場合、ランダム
                    return [...candidates, { teamId, info }];
                }
            }
        },
        []
    );

    const bombiiTeam = bombiiCandidates[Math.floor(Math.random() * bombiiCandidates.length)];

    const is_approved = confirm('以下の内容で送信しますか？\n\nチームID：' + bombiiTeam.teamId);
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const result = await Supabase.insertBombiiHistory(bombiiTeam.teamId);
        logger.Info(`Success to send bombii history. TeamId:${bombiiTeam.teamId}`);
        alert('送信しました。');
    } catch {
        logger.Error('Failed to send bombii history.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

async function setBombii() {
    const teamId = $bombiiTeamSelect.val();
    const teamName = $('#bombii-team-select option:selected').text();

    if (teamId == 0) {
        alert('チーム名を選択してください。');
        return;
    }

    const is_approved = confirm('以下の内容で送信しますか？\n\nチーム名：' + teamName);
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const result = await Supabase.insertBombiiHistory(teamId);
        logger.Info(`Success to send bombii history. TeamId:${teamId}`);
        alert('送信しました。');
    } catch {
        logger.Error('Failed to send bombii history.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

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
    if (teamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    }

    // 送信確認
    const is_approved = confirm(
        '【加算】\n' +
            '以下の内容で送信しますか？\n\nチーム名：' +
            teamName +
            '\nポイント数：' +
            point +
            ' pt' +
            (isCharged ? '（換金あり）' : '（換金なし）')
    );
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const result = await Supabase.insertAdditionalPoints(teamId, point, isCharged);
        logger.Info(
            `Success to send additional points. TeamName:${teamName} Point:${point} IsCharged:${isCharged}`
        );
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send additional points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

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
    if (teamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    }

    // 送信確認
    const is_approved = confirm(
        '【減算】\n' +
            '以下の内容で送信しますか？\n\nチーム名：' +
            teamName +
            '\nポイント数：－' +
            point +
            ' pt' +
            (isCharged ? '（換金あり）' : '（換金なし）')
    );
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const result = await Supabase.insertSubtractionPoints(teamId, point, isCharged);
        logger.Info(
            `Success to send subtraction points. TeamName:${teamName} Point:${point} IsCharged:${isCharged}`
        );
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send subtraction points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

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
    if (fromTeamId == 0 || toTeamId == 0 || point == 0) {
        alert('チーム名とポイントを入力してください。');
        return;
    }

    // 送信確認
    const is_approved = confirm(
        '以下の内容で送信しますか？\n\nポイント数：' +
            point +
            ' pt' +
            (isCharged ? '（換金あり）' : '（換金なし）') +
            '\n' +
            '移動元：' +
            $('#move-point-from-select option:selected').text() +
            '\n' +
            '移動先：' +
            $('#move-point-to-select option:selected').text()
    );
    if (!is_approved) {
        return;
    }

    // 送信処理
    try {
        const result = await Supabase.insertAddAndSubPoints(toTeamId, fromTeamId, point, isCharged);
        logger.Info(
            `Success to send moving points. FromTeamId:${fromTeamId} ToTeamId:${toTeamId} Point:${point} IsCharged:${isCharged}`
        );
        alert('送信しました。');
    } catch (error) {
        logger.Error('Failed to send moving points.', error);
        alert('送信に失敗しました。', error);
    } finally {
        clearForms();
    }
}

/**
 * ポイント換金
 */
async function chargePoint() {
    // フォームの値を取得
    const teamId = $chargePointTeamSelect.val();

    // チーム名が入力されていない場合はアラートを表示
    if (teamId == 0) {
        alert('チーム名を選択してください。');
        return;
    }

    // 送信確認
    const is_approved = confirm(
        '以下の内容で送信しますか？\n\nチーム名：' +
            $('#charge-point-team-select option:selected').text()
    );
    if (!is_approved) {
        return;
    }

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
    }
}

/**
 * 洗足池ミッションの得点計算
 */
function calculateMissionSenzokuikeScore() {
    const answer = Number($('#senzokuike-mission-answer').val());
    if (answer === '') {
        alert('解答を入力してください。');
        return;
    }

    try {
        const score = MissionSenzokuike.calculate(answer);
        logger.Debug(`Calculated Senzokuike mission score. Score:${score}`);
        alert(`解答：${answer} ㎡\n得点：${score} pt`);
    } catch (error) {
        logger.Error('Failed to calculate Senzokuike mission score.', error);
        alert('得点計算に失敗しました。', error);
    } finally {
        clearForms();
    }
}

/**
 * 洗足池ミッションの得点計算のフォームをリセットする
 */
function resetMissionSenzokuikeForm() {
    $senzokuikeMissionAnswer.val(41000);
}

/**
 * フォームの値をリセットする
 */
function clearForms() {
    $goalStationSelect.val(0);
    $arrivalGoalTeamSelect.val(0);
    $arrivalGoalPoint.val(0);
    $addPointTeamSelect.val(0);
    $addPoint.val(0);
    $isChargedForAdd.prop('checked', false);
    $subPointTeamSelect.val(0);
    $subPoint.val(0);
    $isChargedForSub.prop('checked', false);
    $movePointFromSelect.val(0);
    $movePointToSelect.val(0);
    $movePoint.val(0);
    $isChargedForMove.prop('checked', false);
    $chargePointTeamSelect.val(0);
    $('#changed-arrival-goal-point').text(Common.formatPoint(0));
    $('#changed-add-point').text(Common.formatPoint(0));
    $('#changed-sub-point').text(Common.formatPoint(0));
    $('#changed-move-point').text(Common.formatPoint(0));
}
