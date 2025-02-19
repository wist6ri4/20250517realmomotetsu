/*========== Index用の定数 ==========*/
import { Constants } from "./constants.js";

const CFI = {
    METHOD_INTERVAL: 7500, // メソッド実行間隔
    $DIGITAL_DISPLAY_JP: $('#digital-display-jp'), // 電光掲示板
    $DESTINATION_STATION: $('#destination-station'), // 電光掲示板
    $UPDATED_TIME: $('#updated-time'), // 更新時刻表示部
    INVISIBLE_TRAIN: 'invisible-train', // 電車非表示クラス
};

const TEAMS = {
    TEAM_A: {
        IS_ADDED: 'teamAIsAdded', // 追加されたかどうか
        TEAM_NAME: Constants.TEAM_A_NAME, // チーム名
        TEAM_ID: 'teamA', // チームID
        $TRAIN: $('#team-a-train'), // 電車コマ
        $TRAIN_VISIBILITY: $('#team-a-train-visibility'), // 電車コマの表示・非表示
        $INFORMATION_NAME: $('#team-a-information-name'), // チーム情報表示部のチーム名
        $INFORMATION: $('#team-a-information'), // チーム情報表示部
        $LATEST_STATION: $('#team-a-latest-station'), // 最終到着駅表示部
        $LATEST_TIME: $('#team-a-latest-time'), // 最終更新時刻表示部
        $REMAINING_SQUARES: $('#team-a-remaining-squares'), // 残りマス数表示部
        $NOT_CHARGED_POINTS: $('#team-a-not-charged-points'), // 未チャージポイント表示部
        $CHARGED_POINTS: $('#team-a-charged-points'), // チャージ済ポイント表示部
        $MODAL_NAME: $('#team-a-modal-name'), // チーム情報モーダルのチーム名
    },
    TEAM_B: {
        IS_ADDED: 'teamBIsAdded', // 追加されたかどうか
        TEAM_NAME: Constants.TEAM_B_NAME, // チーム名
        TEAM_ID: 'teamB', // チームID
        $TRAIN: $('#team-b-train'), // 電車コマ
        $TRAIN_VISIBILITY: $('#team-b-train-visibility'), // 電車コマの表示・非表示
        $INFORMATION_NAME: $('#team-b-information-name'), // チーム情報表示部のチーム名
        $INFORMATION: $('#team-b-information'), // チーム情報表示部
        $LATEST_STATION: $('#team-b-latest-station'), // 最終到着駅表示部
        $LATEST_TIME: $('#team-b-latest-time'), // 最終更新時刻表示部
        $REMAINING_SQUARES: $('#team-b-remaining-squares'), // 残りマス数表示部
        $NOT_CHARGED_POINTS: $('#team-b-not-charged-points'), // 未チャージポイント表示部
        $CHARGED_POINTS: $('#team-b-charged-points'), // チャージ済ポイント表示部
        $MODAL_NAME: $('#team-b-modal-name'), // チーム情報モーダルのチーム名
    },
    TEAM_C: {
        IS_ADDED: 'teamCIsAdded', // 追加されたかどうか
        TEAM_NAME: Constants.TEAM_C_NAME, // チーム名
        TEAM_ID: 'teamC', // チームID
        $TRAIN: $('#team-c-train'), // 電車コマ
        $TRAIN_VISIBILITY: $('#team-c-train-visibility'), // 電車コマの表示・非表示
        $INFORMATION_NAME: $('#team-c-information-name'), // チーム情報表示部のチーム名
        $INFORMATION: $('#team-c-information'), // チーム情報表示部
        $LATEST_STATION: $('#team-c-latest-station'), // 最終到着駅表示部
        $LATEST_TIME: $('#team-c-latest-time'), // 最終更新時刻表示部
        $REMAINING_SQUARES: $('#team-c-remaining-squares'), // 残りマス数表示部
        $NOT_CHARGED_POINTS: $('#team-c-not-charged-points'), // 未チャージポイント表示部
        $CHARGED_POINTS: $('#team-c-charged-points'), // チャージ済ポイント表示部
        $MODAL_NAME: $('#team-c-modal-name'), // チーム情報モーダルのチーム名
    },
    TEAM_D: {
        IS_ADDED: 'teamDIsAdded', // 追加されたかどうか
        TEAM_NAME: Constants.TEAM_D_NAME, // チーム名
        TEAM_ID: 'teamD', // チームID
        $TRAIN: $('#team-d-train'), // 電車コマ
        $TRAIN_VISIBILITY: $('#team-d-train-visibility'), // 電車コマの表示・非表示
        $INFORMATION_NAME: $('#team-d-information-name'), // チーム情報表示部のチーム名
        $INFORMATION: $('#team-d-information'), // チーム情報表示部
        $LATEST_STATION: $('#team-d-latest-station'), // 最終到着駅表示部
        $LATEST_TIME: $('#team-d-latest-time'), // 最終更新時刻表示部
        $REMAINING_SQUARES: $('#team-d-remaining-squares'), // 残りマス数表示部
        $NOT_CHARGED_POINTS: $('#team-d-not-charged-points'), // 未チャージポイント表示部
        $CHARGED_POINTS: $('#team-d-charged-points'), // チャージ済ポイント表示部
        $MODAL_NAME: $('#team-d-modal-name'), // チーム情報モーダルのチーム名
    },
};

Object.freeze(CFI);
export { CFI };

Object.freeze(TEAMS);
export { TEAMS };
