/* ========== モジュールのインポート ========== */
import { Constants } from "./constants.js";
import { Supabase } from "./supabase.js";

/* ========== function ========== */
/**
 * チーム名を取得してsessionStorageにセットする
 *
 * @returns {Array} チーム名
 */
async function getAndSetTeamName() {
    const sessionTeamName = JSON.parse(sessionStorage.getItem(Constants.SESSION_TEAM_NAME));

    if(sessionTeamName?.length > 0) {
        return sessionTeamName;
    } else {
        const teams = await Supabase.getTeams();
        sessionStorage.setItem(Constants.SESSION_TEAM_NAME, JSON.stringify(teams));
        return teams;
    };
};

/**
 * 駅名を取得してsessionStorageにセットする
 *
 * @returns {Array} 駅名
 */
async function getAndSetStations() {
    const sessionStations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));

    if(sessionStations?.length > 0) {
        return sessionStations;
    } else {
        const stations = await Supabase.getStations();
        sessionStorage.setItem(Constants.SESSION_STATIONS, JSON.stringify(stations));
        return stations;
    };
};

/**
 * ポイントのフォーマット
 *
 * @param {number} point ポイント
 * @returns {string} フォーマットされたポイント
 */
function formatPoint(point) {
    point *= 100000;

    const trillion = Math.floor((point % 100000000000000) / 100000000000);
    const oneHundredMillion = Math.floor((point % 100000000000) / 100000000);
    const tenThousand = Math.floor((point % 100000000) / 10000);

    return (trillion > 0 ? trillion + ' 兆 ' : '') +
        (oneHundredMillion > 0 ? oneHundredMillion + ' 億 ' : '') +
        (tenThousand > 0 ? tenThousand + ' 万' : '0 万');
};

/* ========== モジュールのエクスポート ========== */
export const Common = {
    getAndSetTeamName,
    getAndSetStations,
    formatPoint
};
