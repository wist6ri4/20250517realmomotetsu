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
    insertMovingPoints
};

/**
 * teamsを取得する
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
 * 未チャージポイントを取得する
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
            return notChargedPoints;
        }
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log('getNotChargedPoints() done');
    };
};

/**
 * チャージ済みポイントを取得する
 */
async function getChargedPoints() {
    try {
        const { data: chargedPoints, error } = await supabase
            .from('points')
            .select('*')
            .eq('is_charged', true);
        if (error) {
            console.error(error);
            return;
        } else {
            return chargedPoints;
        }
    } catch (error) {
        console.error(error);
    } finally {
        console.log('getChargedPoints() done');
    };
};

/**
 * 移動ポイントを追加する
 *
 * @param {number} teamId チームID
 */
async function insertMovingPoints(teamId) {
    try {
        const { data, error } = await supabase
            .from('points')
            .insert([
                { team_id: teamId, point: Constants.POINT_FOR_MOVING }
            ]);
        if (error) {
            console.error(error);
            return;
        } else {
            return data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        console.log('insertMovingPoints() done');
    };
};




export { Supabase };