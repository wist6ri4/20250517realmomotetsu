/* ========== モジュールのインポート ========== */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { Constants } from './constants.js';
import { Logger } from './logging.js';

/*========== Logger初期化 ==========*/
const logger = new Logger();

// SUPABASEのクライアントの作成
const supabase = createClient(Constants.SUPABASE_URL, Constants.SUPABASE_KEY);

const SELECT = 'select';
const INSERT = 'insert';
const UPDATE = 'update';
const DELETE = 'delete';

/* ========== function ========== */

/**
 * Supabaseクラス
 */
class Supabase {
    /**
     * 関数の呼び出し元を取得する
     *
     * @returns {string} callerFunction
     */
    static getCallerFunction() {
        try {
            // エラーを投げてスタックトレースを取得
            throw new Error();
        } catch (error) {
            const stackLines = error.stack.split('\n');
            // スタックトレースの3行目を取得し、フォーマットに応じて解析
            if (stackLines.length > 2) {
                const callerFunction = stackLines[3].trim();
                const match = callerFunction.match(/at (\S+)/) || callerFunction.match(/at (\S+):/);
                return match ? match[1] : 'Unknown';
            }
        }
        return 'Unknown';
    }

    /**
     * クエリを実行する
     *
     * @param {Object} param0 クエリ情報
     * @param {string} param0.table テーブル名
     * @param {string} param0.action アクション
     * @param {Array} param0.filters フィルター
     * @param {Object} param0.filters.column カラム名
     * @param {Object} param0.filters.operator 演算子
     * @param {Object} param0.filters.value 値
     * @param {Object} param0.orderBy ソート
     * @param {Object} param0.updateData 更新データ
     * @returns {Object} data
     * @throws {Error} error
     */
    static async executeQuery({
        table,
        action,
        columns = [],
        filters = [],
        orderBy = null,
        limit = null,
        updateData = null,
    }) {
        // 呼び出し元関数名の取得
        const callerFunction = this.getCallerFunction();
        try {
            // 取得対象のテーブルを指定
            let query = supabase.from(table);
            // アクションによって処理を分岐
            switch (action) {
                case SELECT:
                    if (columns.length) {
                        query = query.select(columns.join(','));
                    } else {
                        query = query.select();
                    }
                    break;
                case INSERT:
                    if (!updateData) {
                        throw new Error('Invalid data.');
                    }
                    query = query.insert(updateData);
                    break;
                case UPDATE:
                    if (!updateData) {
                        throw new Error('Invalid data.');
                    }
                    query = query.update(updateData);
                    break;
                case DELETE:
                    query = query.delete();
                    break;
                default:
                    throw new Error('Invalid action.');
            }
            // フィルターを設定
            filters.forEach((filter) => {
                const { column, operator, value } = filter;
                query = query[operator](column, value);
            });
            // ソートを設定
            if (orderBy) {
                query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
            }
            // リミットを設定
            if (limit) {
                query = query.limit(limit);
            }
            // クエリを実行
            const { data, error } = await query;

            if (error) {
                throw new Error(error);
            }
            logger.Info(
                `Accessed to Supabase. [${callerFunction}] Query:${action} Table:${table} Data:${
                    updateData ? JSON.stringify(updateData) : 'No_Data'
                }`,
                data
            );
            return data;
        } catch (error) {
            logger.Error(
                `Failed to Access to Supabase. [${callerFunction}] Query:${action} Table:${table} Data:${
                    updateData ? JSON.stringify(updateData) : 'No_Data'
                }`,
                error
            );
            throw new Error(error);
        }
    }

    /**
     * teamsを取得する
     *
     * @returns {Array} teams
     */
    static async getTeams() {
        const teams = await Supabase.executeQuery({
            table: 'teams',
            action: SELECT,
            orderBy: { column: 'team_id', ascending: true },
        });
        return teams;
    }

    /**
     * stationsを取得する
     *
     * @returns {Array} stations
     */
    static async getStations() {
        const stations = await Supabase.executeQuery({
            table: 'stations',
            action: SELECT,
            orderBy: { column: 'station_id', ascending: true },
        });
        return stations;
    }

    /**
     * transit_stationsを取得する
     *
     * @returns {Array} transitStations
     */
    static async getTransitStations() {
        const transitStations = await Supabase.executeQuery({
            table: 'transit_stations',
            action: SELECT,
            orderBy: { column: 'transit_station_id', ascending: true },
        });
        return transitStations;
    }

    /**
     * 最新の4チーム分のtransit_stationsを取得する
     *
     * @returns {Array} transitStations
     */
    static async getLatestTransitStations() {
        const transitStations = await Supabase.executeQuery({
            table: 'latest_transit_stations',
            action: SELECT,
            orderBy: { column: 'team_id', ascending: true },
        });
        return transitStations;
    }

    /**
     * transit_stationsにデータを追加する
     *
     * @param {string} teamId チームID
     * @param {string} stationId 駅ID
     * @returns {Object} data
     */
    static async insertTransitStations(teamId, stationId) {
        const data = await Supabase.executeQuery({
            table: 'transit_stations',
            action: INSERT,
            updateData: [{ team_id: teamId, station_id: stationId }],
        });
        return data;
    }

    /**
     * goal_stationsを取得する
     *
     * @returns {Array} goalStations
     */
    static async getGoalStations() {
        const goalStations = await Supabase.executeQuery({
            table: 'goal_stations',
            action: SELECT,
            orderBy: { column: 'goal_station_id', ascending: true },
        });
        return goalStations;
    }

    /**
     * 最新のgoal_stationを取得する
     *
     * @returns {Array} goalStation
     */
    static async getLatestGoalStation() {
        const goalStation = await Supabase.executeQuery({
            table: 'goal_stations',
            action: SELECT,
            orderBy: { column: 'goal_station_id', ascending: false },
            limit: 1,
        });
        return goalStation;
    }

    /**
     * goal_stationsにデータを追加する
     *
     * @param {string} stationId 駅ID
     * @returns {Object} data
     */
    static async insertGoalStations(stationId) {
        const data = await Supabase.executeQuery({
            table: 'goal_stations',
            action: INSERT,
            updateData: [{ station_id: stationId }],
        });
        return data;
    }

    /**
     * 最新のボンビーを取得する
     *
     * @return {Object} data
     */
    static async getLatestBombii() {
        const data = await Supabase.executeQuery({
            table: 'bombii_history',
            action: SELECT,
            orderBy: { column: 'id', ascending: false },
            limit: 1,
        });
        return data;
    }

    /**
     * bombii_countsを取得する
     *
     * @returns {Array} data
     */
    static async getBombiiCounts() {
        const data = await Supabase.executeQuery({
            table: 'bombii_counts',
            action: SELECT,
        });
        return data;
    }

    /**
     * bombii_historyにデータを追加する
     *
     * @param {string} teamId チームID
     * @returns {Object} data
     */
    static async insertBombiiHistory(teamId) {
        const data = await Supabase.executeQuery({
            table: 'bombii_history',
            action: INSERT,
            updateData: [{ team_id: teamId }],
        });
        return data;
    }

    /**
     * 未チャージポイントを取得し、各チームごとに総計する
     *
     * @returns {Object} groupedPoints
     */
    static async getNotChargedPoints() {
        const notChargedPoints = await Supabase.executeQuery({
            table: 'points',
            action: SELECT,
            filters: [{ column: 'is_charged', operator: 'eq', value: false }],
        });
        const groupedPoints = groupByAndSum(notChargedPoints, ['team_id', 'point']);
        return groupedPoints;
    }

    /**
     * チャージ済みポイントを取得し、各チームごとに総計する
     *
     * @returns {Object} groupedPoints
     */
    static async getChargedPoints() {
        const chargedPoints = await Supabase.executeQuery({
            table: 'points',
            action: SELECT,
            filters: [{ column: 'is_charged', operator: 'eq', value: true }],
        });
        const groupedPoints = groupByAndSum(chargedPoints, ['team_id', 'point']);
        return groupedPoints;
    }

    /**
     * チームを指定してポイントを加算する
     *
     * @param {string} teamId チームID
     * @param {number} point 加算ポイント
     * @param {boolean} isCharged チャージ済みフラグ
     * @returns {Object} data
     */
    static async insertAdditionalPoints(teamId, point, isCharged = false) {
        const data = await Supabase.executeQuery({
            table: 'points',
            action: INSERT,
            updateData: [{ team_id: teamId, point: point, is_charged: isCharged }],
        });
        return data;
    }

    /**
     * チームを指定してポイントを減算する
     *
     * @param {string} teamId チームID
     * @param {number} point 減算ポイント
     * @param {boolean} isCharged チャージ済みフラグ
     * @returns {Object} data
     */
    static async insertSubtractionPoints(teamId, point, isCharged = false) {
        const data = await Supabase.executeQuery({
            table: 'points',
            action: INSERT,
            updateData: [{ team_id: teamId, point: -point, is_charged: isCharged }],
        });
        return data;
    }

    /**
     * チーム間でポイントを移動する
     *
     * @param {string} addTeamId 加算チームID
     * @param {string} subTeamId 減算チームID
     * @param {number} point ポイント
     * @param {boolean} isCharged チャージ済みフラグ
     * @returns {Object} data
     */
    static async insertAddAndSubPoints(addTeamId, subTeamId, point, isCharged = false) {
        const addData = await Supabase.executeQuery({
            table: 'points',
            action: INSERT,
            updateData: [{ team_id: addTeamId, point: point, is_charged: isCharged }],
        });
        const subData = await Supabase.executeQuery({
            table: 'points',
            action: INSERT,
            updateData: [{ team_id: subTeamId, point: -point, is_charged: isCharged }],
        });
        return { addData, subData };
    }

    /**
     * チームIDを指定して未チャージポイントをチャージ済みに更新する
     *
     * @param {string} teamId チームID
     * @returns {Object} notChargedPoints
     */
    static async updateNotChargedPoints(teamId) {
        const notChargedPoints = await Supabase.executeQuery({
            table: 'points',
            action: UPDATE,
            filters: [
                { column: 'team_id', operator: 'eq', value: teamId },
                { column: 'is_charged', operator: 'eq', value: false },
            ],
            updateData: { is_charged: true, updated_at: new Date().toISOString() },
        });
        return notChargedPoints;
    }
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
        if (acc[entry[keys[0]]]) {
            acc[entry[keys[0]]] += entry[keys[1]];
        } else {
            acc[entry[keys[0]]] = entry[keys[1]];
        }
        return acc;
    }, {});

    return result;
}

/* ========== モジュールのエクスポート ========== */
export { Supabase };
