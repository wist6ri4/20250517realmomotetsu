import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { Constants } from './constants.js';

// SUPABASEのクライアントの作成
const supabase = createClient(Constants.SUPABASE_URL, Constants.SUPABASE_KEY);


const Supabase = {
    getTeams,
    getStations,
    getTransitStations,
    insertTransitStations,
    getGoalStations,
    getNotChargedPoints,
    getChargedPoints,
    insertMovingPoints,
    insertAdditionalPoints,
    insertSubtractionPoints,
    insertAddAndSubPoints,
    updateNotChargedPoints
};

/**
 * teamsを取得する
 *
 * @returns {Array} teams
 * @throws {Error} error
 */
async function getTeams() {
    try {
        const { data: teams, error } = await supabase
            .from('teams')
            .select('*');
        if (error) {
            throw new Error(error);
        } else {
            return teams;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getTeams() done');
    };
};

/**
 * stationsを取得する
 *
 * @returns {Array} stations
 * @throws {Error} error
 */
async function getStations() {
    try {
        const { data: stations, error } = await supabase
            .from('stations')
            .select('*');
        if (error) {
            throw new Error(error);
        } else {
            return stations;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getStations() done');
    };
};

/**
 * transit_stationsを取得する
 *
 * @returns {Array} transitStations
 * @throws {Error} error
 */
async function getTransitStations() {
    try {
        const { data: transitStations, error } = await supabase
            .from('transit_stations')
            .select('*');
        if (error) {
            throw new Error(error);
        } else {
            return transitStations;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getTransitStations() done');
    };
};

/**
 * transit_stationsにデータを追加する
 *
 * @param {number} teamId チームID
 * @param {number} stationId 駅ID
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertTransitStations(teamId, stationId) {
    try {
        const { data, error } = await supabase
            .from('transit_stations')
            .insert([
                { team_id: teamId, station_id: stationId }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertTransitStations() done');
    };
};

/**
 * goal_stationsを取得する
 *
 * @returns {Array} goalStations
 * @throws {Error} error
 */
async function getGoalStations() {
    try {
        const { data: goalStations, error } = await supabase
            .from('goal_stations')
            .select('*');
        if (error) {
            throw new Error(error);
        } else {
            return goalStations;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getGoalStations() done');
    };
};

/**
 * 未チャージポイントを取得し、各チームごとに総計する
 *
 * @returns {Object} groupedPoints
 * @throws {Error} error
 */
async function getNotChargedPoints() {
    try {
        const { data: notChargedPoints, error } = await supabase
            .from('points')
            .select('*')
            .eq('is_charged', false);
        if (error) {
            throw new Error(error);
        } else {
            const groupedPoints = groupByAndSum(notChargedPoints, ['team_id', 'point']);
            return groupedPoints;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getNotChargedPoints() done');
    };
};

/**
 * チャージ済みポイントを取得する
 *
 * @returns {Object} groupedPoints
 * @throws {Error} error
 */
async function getChargedPoints() {
    try {
        const { data: chargedPoints, error } = await supabase
            .from('points')
            .select('*')
            .eq('is_charged', true);
        if (error) {
            throw new Error(error);
        } else {
            const groupedPoints = groupByAndSum(chargedPoints, ['team_id', 'point']);
            return groupedPoints;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getChargedPoints() done');
    };
};

/**
 * 移動ポイントを追加する
 *
 * @param {number} teamId チームID
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertMovingPoints(teamId) {
    try {
        const { data, error } = await supabase
            .from('points')
            .insert([
                { team_id: teamId, point: Constants.POINT_FOR_MOVING }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertMovingPoints() done');
    };
};

/**
 * チームを指定してポイントを加算する
 *
 * @param {number} teamId チームID
 * @param {number} point 加算ポイント
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertAdditionalPoints(teamId, point) {
    try {
        const { data, error } = await supabase
            .from('points')
            .insert([
                { team_id: teamId, point: point }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertAdditionalPoints() done');
    };
};


/**
 * チームを指定してポイントを減算する
 *
 * @param {number} teamId チームID
 * @param {number} point 減算ポイント
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertSubtractionPoints(teamId, point) {
    try {
        const { data, error } = await supabase
            .from('points')
            .insert([
                { team_id: teamId, point: -point }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertSubtractionPoints() done');
    };
};

/**
 * チーム間でポイントを移動する
 *
 * @param {string} addTeamId 加算チームID
 * @param {string} subTeamId 減算チームID
 * @param {number} point ポイント
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertAddAndSubPoints(addTeamId, subTeamId, point) {
    try {
        const { data: addData, error: addError } = await supabase
            .from('points')
            .insert([
                { team_id: addTeamId, point: point }
            ]);
        const { data: subData, error: subError } = await supabase
            .from('points')
            .insert([
                { team_id: subTeamId, point: -(point) }
            ]);

        if (addError || subError) {
            throw new Error(addError || subError);
        } else {
            return { addData, subData };
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertAddAndSubPoints() done');
    };
};

/**
 * チームIDを指定して未チャージポイントをチャージ済みに更新する
 *
 * @param {number} teamId チームID
 * @returns {Object} notChargedPoints
 * @throws {Error} error
 */
async function updateNotChargedPoints(teamId) {
    try {
        const { data: notChargedPoints, error } = await supabase
            .from('points')
            .update({ is_charged: true })
            .eq('team_id', teamId)
            .eq('is_charged', false);
        if (error) {
            throw new Error(error);
        } else {
            return notChargedPoints;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('updateNotChargedPoints() done');
    };
}

/**
 * 配列を指定のキーでグループ化し、指定のキーで合計する
 *
 * @param {Array} array 配列
 * @param {Array} keys キーの配列(2つ)
 * @returns {Object} result
 */
function groupByAndSum(array, keys) {
    const result = array.reduce((acc, entry) => {
        if(acc[entry[keys[0]]]) {
            acc[entry[keys[0]]] += entry[keys[1]];
        } else {
            acc[entry[keys[0]]] = entry[keys[1]];
        };
        return acc;
    }, {});

    return result;
};


export { Supabase };