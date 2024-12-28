/*========== Index用の定数 ==========*/
import { Constants } from "./constants.js";

const CFI = {
    METHOD_INTERVAL: 7500, // メソッド実行間隔
    API_URL: 'https://script.google.com/macros/s/AKfycbzvSlhngYRqQ_xKVZ5mF7S-sNbEeA7YIfnq9na1r7mUvmNp1ReOLXgNR0BnyipltU1T/exec', // API URL
    DIGITAL_DISPLAY_JP: $('#digital-display-jp'), // 電光掲示板
    DESTINATION_STATION: $('#destination-station'), // 電光掲示板
    UPDATED_TIME: $('#updated-time'), // 更新時刻表示部
    TEAM_A: {
        TEAM_NAME: Constants.TEAM_A_NAME, // チーム名
        TRAIN: $('#team-a-train'), // 電車コマ
        TRAIN_VISIBILITY: $('#team-a-train-visibility'), // 電車コマの表示・非表示
        INFORMATION_NAME: $('#team-a-information-name'), // チーム情報表示部のチーム名
        INFORMATION: $('#team-a-information'), // チーム情報表示部
        LATEST_STATION: $('#team-a-latest-station'), // 最終到着駅表示部
        LATEST_TIME: $('#team-a-latest-time'), // 最終更新時刻表示部
        REMAINING_SQUARES: $('#team-a-remaining-squares'), // 残りマス数表示部
        MODAL_NAME: $('#team-a-modal-name'), // チーム情報モーダルのチーム名
    },
    TEAM_B: {
        TEAM_NAME: Constants.TEAM_B_NAME, // チーム名
        TRAIN: $('#team-b-train'), // 電車コマ
        TRAIN_VISIBILITY: $('#team-b-train-visibility'), // 電車コマの表示・非表示
        INFORMATION_NAME: $('#team-b-information-name'), // チーム情報表示部のチーム名
        INFORMATION: $('#team-b-information'), // チーム情報表示部
        LATEST_STATION: $('#team-b-latest-station'), // 最終到着駅表示部
        LATEST_TIME: $('#team-b-latest-time'), // 最終更新時刻表示部
        REMAINING_SQUARES: $('#team-b-remaining-squares'), // 残りマス数表示部
        MODAL_NAME: $('#team-b-modal-name'), // チーム情報モーダルのチーム名
    },
    TEAM_C: {
        TEAM_NAME: Constants.TEAM_C_NAME, // チーム名
        TRAIN: $('#team-c-train'), // 電車コマ
        TRAIN_VISIBILITY: $('#team-c-train-visibility'), // 電車コマの表示・非表示
        INFORMATION_NAME: $('#team-c-information-name'), // チーム情報表示部のチーム名
        INFORMATION: $('#team-c-information'), // チーム情報表示部
        LATEST_STATION: $('#team-c-latest-station'), // 最終到着駅表示部
        LATEST_TIME: $('#team-c-latest-time'), // 最終更新時刻表示部
        REMAINING_SQUARES: $('#team-c-remaining-squares'), // 残りマス数表示部
        MODAL_NAME: $('#team-c-modal-name'), // チーム情報モーダルのチーム名
    },
    TEAM_D: {
        TEAM_NAME: Constants.TEAM_D_NAME, // チーム名
        TRAIN: $('#team-d-train'), // 電車コマ
        TRAIN_VISIBILITY: $('#team-d-train-visibility'), // 電車コマの表示・非表示
        INFORMATION_NAME: $('#team-d-information-name'), // チーム情報表示部のチーム名
        INFORMATION: $('#team-d-information'), // チーム情報表示部
        LATEST_STATION: $('#team-d-latest-station'), // 最終到着駅表示部
        LATEST_TIME: $('#team-d-latest-time'), // 最終更新時刻表示部
        REMAINING_SQUARES: $('#team-d-remaining-squares'), // 残りマス数表示部
        MODAL_NAME: $('#team-d-modal-name'), // チーム情報モーダルのチーム名
    },
}

Object.freeze(CFI);
export { CFI };