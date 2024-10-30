
/**
 * ダイクストラ法で出発駅から各駅への最短所要時間を計算　
 * @param {object} graph - 隣接する駅同士の所要時間のマッピング
 * @param {string} start - 出発駅
 * @returns {object} 出発駅から各駅への主要時間の配列
 */
function calculateTravelTimes(graph, start) {
    // 各駅への所要時間を初期化（無限大に設定）
    const times = {};
    Object.keys(graph).forEach(station => times[station] = Infinity);
    times[start] = 0;

    // 探索キュー
    const queue = [{station: start, time: 0}];
    while(queue.length > 0) {
        // 所要時間順にソート
        queue.sort((a, b) => a.time - b.time);
        // 所要時間が最短の駅をshift
        const {station, time} = queue.shift();

        // 隣接駅それぞれへの時間を取得
        graph[station].forEach(neighbor => {
            const newTime = time + neighbor.time;

            // 新しい所要時間が既存の所要時間より短ければ更新
            if(newTime < times[neighbor.station]) {
                times[neighbor.station] = newTime;
                queue.push({station: neighbor.station, time: newTime});
            };
        });
    };

    return times;
};

/**
 * 重み付きルーレットの確率計算
 * @param {string} start - 出発駅
 * @param {object} times - 各駅への所要時間
 * @returns {object} - 各駅の出現確率
 */
function weightedRoulette(start, times) {
    const weights = {};
    let totalWeight = 0;

    // 所要時間を合計
    for(const [station, time] of Object.entries(times)) {
        if(station !== start && time < Infinity) {
            weights[station] = 1 / time;
            totalWeight += weights[station];
        };
    };

    // 各駅への所要時間の逆数で重みを計算
    const probabilities = {};
    for(const station in weights) {
        probabilities[station] = weights[station] / totalWeight;
    };

    return probabilities;
};

/**
 * 次の駅を選択
 * @param {object} probabilities - 各駅の出現確率
 * @returns {string} - 駅名
 */
function chooseNextStation(probabilities) {
    const random = Math.random();
    let cumulative = 0;

    // 累積確率から駅をランダムに選択
    for(const [station, probability] of Object.entries(probabilities)) {
        cumulative +=  probability;
        if(random < cumulative) {
            return station;
        };
    };
};