/* ========== モジュールのインポート ========== */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { Constants } from './constants.js';

// SUPABASEのクライアントの作成
const supabase = createClient(Constants.SUPABASE_URL, Constants.SUPABASE_KEY);


/* ========== function ========== */
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
            .select('*')
            .order('team_id');
        if (error) {
            throw new Error(error);
        } else {
            return teams;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getTeams() done.');
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
            .select('*')
            .order('station_id');
        if (error) {
            throw new Error(error);
        } else {
            return stations;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getStations() done.');
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
            .select('*')
            .order('transit_station_id');
        if (error) {
            throw new Error(error);
        } else {
            return transitStations;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getTransitStations() done.');
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
        console.log('insertTransitStations() done.');
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
            .select('*')
            .order('goal_station_id');
        if (error) {
            throw new Error(error);
        } else {
            return goalStations;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getGoalStations() done.');
    };
};

/**
 * goal_stationsにデータを追加する
 *
 * @param {number} stationId 駅ID
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertGoalStations(stationId) {
    try {
        const { data, error } = await supabase
            .from('goal_stations')
            .insert([
                { station_id: stationId }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return data;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertGoalStations() done.');
    };
}

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
        console.log('getNotChargedPoints() done.');
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
            .eq('is_charged', true)
            .order('point_id');
        if (error) {
            throw new Error(error);
        } else {
            const groupedPoints = groupByAndSum(chargedPoints, ['team_id', 'point']);
            return groupedPoints;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getChargedPoints() done.');
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
        console.log('insertMovingPoints() done.');
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
        console.log('insertAdditionalPoints() done.');
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
        console.log('insertSubtractionPoints() done.');
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
        console.log('insertAddAndSubPoints() done.');
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
            .update({ is_charged: true, updated_at: new Date().toISOString() })
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
        console.log('updateNotChargedPoints() done.');
    };
};

/**
 *  チームを指定してチャージ済みポイントを加算する
 *
 * @param {number} teamId チームID
 * @param {number} point 加算ポイント
 * @returns {Object} chargedPoints
 * @throws {Error} error
 */
async function insertAdditionalChargedPoints(teamId, point) {
    try {
        const { data: chargedPoints, error } = await supabase
            .from('points')
            .insert([
                { team_id: teamId, point: point, is_charged: true }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return chargedPoints;
        };
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertAdditionalMoney() done.');
    };
};

/**
 * チームを指定してチャージ済みポイントを減算する
 *
 * @param {number} teamId チームID
 * @param {number} point 減算ポイント
 * @returns {Object} chargedPoints
 * @throws {Error} error
 */
async function insertSubtractionChargedPoints(teamId, point) {
    try {
        const { data: chargedPoints, error } = await supabase
            .from('points')
            .insert([
                { team_id: teamId, point: -(point), is_charged: true }
            ]);
        if (error) {
            throw new Error(error);
        } else {
            return chargedPoints;
        };
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertSubtractionMoney() done.');
    };
};

/**
 * チーム間でチャージ済みポイントを移動する
 *
 * @param {string} addTeamId 加算チームID
 * @param {string} subTeamId 減算チームID
 * @param {number} point ポイント
 * @returns {Object} data
 * @throws {Error} error
 */
async function insertAddAndSubChargedPoints(addTeamId, subTeamId, point) {
    try {
        const { data: addData, error: addError } = await supabase
            .from('points')
            .insert([
                { team_id: addTeamId, point: point, is_charged: true }
            ]);
        const { data: subData, error: subError } = await supabase
            .from('points')
            .insert([
                { team_id: subTeamId, point: -(point), is_charged: true }
            ]);

        if (addError || subError) {
            throw new Error(addError || subError);
        } else {
            return { addData, subData };
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('insertAddAndSubChargedPoints() done.');
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

/* ========== モジュールのエクスポート ========== */
export const Supabase = {
    getTeams,
    getStations,
    getTransitStations,
    insertTransitStations,
    getGoalStations,
    insertGoalStations,
    getNotChargedPoints,
    getChargedPoints,
    insertMovingPoints,
    insertAdditionalPoints,
    insertSubtractionPoints,
    insertAddAndSubPoints,
    updateNotChargedPoints,
    insertAdditionalChargedPoints,
    insertSubtractionChargedPoints,
    insertAddAndSubChargedPoints
};
