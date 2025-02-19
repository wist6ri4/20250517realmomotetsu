import { Constants } from "./constants.js";
import { Supabase } from "./supabase.js";

// 共通処理
export const Common = {
    getAndSetTeamName,
    getAndSetStations
};

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
}

