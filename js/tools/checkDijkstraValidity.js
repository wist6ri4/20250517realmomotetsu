import { Constants } from "../constants.js";
import { Dijkstra } from "../dijkstra.js";
import { StationCode } from "../stationCode.js";
import { Supabase } from "../supabase.js";

/**
 * 次の駅をDijkstraアルゴリズムで取得
 *
 * @param {string} startStationCode - 出発駅
 * @returns {object} - 次の駅と駅数
 */
async function getNextStationCode(startStationCode) {
    // 各駅への最短所要時間と駅数を取得
    const times = Dijkstra.calculateTravelTimes(StationCode.stationGraph, startStationCode);

    // 10分以下の駅を削除
    for(const key of Object.keys(times)) {
        if(times[key].time <= Constants.ELIMINATION_TIME_RANGE_MINUTES) {
            delete times[key];
        };
    };

    // 各チームの現在地を取得
    const latestTransitStations = await Supabase.getLatestTransitStations();
    // 各チームの現在地の駅を削除
    for(const stations of latestTransitStations) {
        const stationCode = stations.station_id;
        if(times[stationCode]) {
            delete times[stationCode];
        };
    };

    // 重み付きルーレットで次の駅を選択
    const probabilities = Dijkstra.weightedRoulette(startStationCode, times);
    const nextStationCode = Dijkstra.chooseNextStation(probabilities);
    return {nextStationCode: nextStationCode, stations: times[nextStationCode]["stations"]};
};


$('#checkDijkstraValidity').on('click', test);

/**
 * テスト
 *
 */
async function test() {
    let stationCode = 'JIYUGAOKA'; // スタートの駅を自由が丘に設定
    const steps = 8; // 最初と最後を除いた回数
    // 保持用リストの初期化
    let nextStations = [{nextStationCode: StationCode.getStationName(stationCode), stations: 0}];

    // ルーレットを指定回数分回して次の駅を取得
    for(let i = 0; i < steps; i++) {
        const {nextStationCode, stations} = await getNextStationCode(stationCode);
        nextStations.push({nextStationCode: StationCode.getStationName(nextStationCode), stations});
        stationCode = nextStationCode;
    };

    // 日吉までの所要時間を取得
    const times = Dijkstra.calculateTravelTimes(StationCode.stationGraph, stationCode);
    const stationsToHiyoshi = times['HIYOSHI']['stations']
    nextStations.push({nextStationCode: '日吉', stations: stationsToHiyoshi});

    // 結果を表示
    console.table(nextStations);
};
