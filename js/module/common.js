/* ========== モジュールのインポート ========== */
import { Constants } from './constants.js';
import { Supabase } from './supabase.js';
import { Locations } from './location.js';
import { Logger } from './logging.js';

/* ========== Logger初期化 ========== */
const logger = new Logger();

/* ========== function ========== */
/**
 * チーム名を取得してsessionStorageにセットする
 *
 * @returns {Array} チーム名
 */
async function getAndSetTeamName() {
    const sessionTeamName = JSON.parse(sessionStorage.getItem(Constants.SESSION_TEAM_NAME));

    if (sessionTeamName?.length > 0) {
        return sessionTeamName;
    } else {
        // チーム名がない場合、取得してセットする
        const teams = await Supabase.getTeams();
        sessionStorage.setItem(Constants.SESSION_TEAM_NAME, JSON.stringify(teams));
        return teams;
    }
}

/**
 * 駅名を取得してsessionStorageにセットする
 *
 * @returns {Array} 駅名
 */
async function getAndSetStations() {
    const sessionStations = JSON.parse(sessionStorage.getItem(Constants.SESSION_STATIONS));

    if (sessionStations?.length > 0) {
        return sessionStations;
    } else {
        // 駅名がない場合、取得してセットする
        const stations = await Supabase.getStations();
        stations.sort((a, b) => {
            if (a.kana < b.kana) return -1;
            if (a.kana > b.kana) return 1;
            return 0;
        });
        // 駅名をsessionStorageにセットする
        sessionStorage.setItem(Constants.SESSION_STATIONS, JSON.stringify(stations));
        return stations;
    }
}

/**
 * ポイントのフォーマット
 *
 * @param {number} point ポイント
 * @returns {string} フォーマットされたポイント
 */
function formatPoint(point) {
    const absPoint = Math.abs(point * 100000);

    const trillion = Math.floor((absPoint % 100000000000000) / 100000000000);
    const oneHundredMillion = Math.floor((absPoint % 100000000000) / 100000000);
    const tenThousand = Math.floor((absPoint % 100000000) / 10000);

    const formattedPoint =
        (trillion > 0 ? trillion + ' 兆 ' : '') +
        (oneHundredMillion > 0 ? oneHundredMillion + ' 億 ' : '') +
        (tenThousand > 0 ? tenThousand + ' 万' : '0 万');

    return ( point >= 0 ? formattedPoint : '－' + formattedPoint);
}

/**
 * 最寄り駅を取得して表示する
 *
 * @param {Object} $jqueryObject jQueryオブジェクト
 */
async function setNearByStation($jqueryObject) {
    try {
        const nearbyStations = await Locations.getNearByStation();
        const nearbyStation = nearbyStations[0].station;
        $jqueryObject.val(nearbyStation);
    } catch (error) {
        logger.Warning('Failed to get nearby station.', error);
    }
}

/**
 * Discordに通知する
 *
 * @param {Object} requestBody リクエストボディ
 */
async function notifyToDiscord(requestBody) {
    // 目的地の設定を通知する
    try {
        await fetch(Constants.ARRIVAL_NOTIFICATION_API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    } catch (error) {
        logger.Error('Failed to notify to discord.', error, requestBody);
    }
}

/* ========== モジュールのエクスポート ========== */
export const Common = {
    getAndSetTeamName,
    getAndSetStations,
    formatPoint,
    setNearByStation,
    notifyToDiscord
};
