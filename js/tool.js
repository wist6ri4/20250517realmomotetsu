const stationMapping = {
    AOBADAI: "青葉台",
    AZAMINO: "あざみ野",
    BASHAMICHI: "馬車道",
    CHIDORICHO: "千鳥町",
    CHUORINKAN: "中央林間",
    DAIKANYAMA: "代官山",
    DENENCHOFU: "田園調布",
    EBARAMACHI: "荏原町",
    EBARANAKANOBU: "荏原中延",
    EDA: "江田",
    FUDOMAE: "不動前",
    FUJIGAOKA: "藤が丘",
    FUTAKOSHINCHI: "二子新地",
    FUTAKOTAMAGAWA: "二子玉川",
    GAKUGEIDAIGAKU: "学芸大学",
    GOTANDA: "五反田",
    HAKURAKU: "白楽",
    HASUNUMA: "蓮沼",
    HATANODAI: "旗の台",
    HIGASHIHAKURAKU: "東白楽",
    HIYOSHI: "日吉",
    ICHIGAO: "市が尾",
    IKEGAMI: "池上",
    IKEJIRIOHASHI: "池尻大橋",
    ISHIKAWADAI: "石川台",
    JIYUGAOKA: "自由が丘",
    KAJIGAYA: "梶が谷",
    KAMATA: "蒲田",
    KAMINOGE: "上野毛",
    KIKUNA: "菊名",
    KITASENZOKU: "北千束",
    KOMAZAWADAIGAKU: "駒沢大学",
    KUGAHARA: "久が原",
    KUHONBUTSU: "九品仏",
    MEGURO: "目黒",
    MIDORIGAOKA: "緑が丘",
    MINAMIMACHIDAGRANBERRYPARK: "南町田グランベリーパーク",
    MINATOMIRAI: "みなとみらい",
    MIYAMAEDAIRA: "宮前平",
    MIYAZAKIDAI: "宮崎台",
    MIZONOKUCHI: "溝の口",
    MOTOMACHICHUKAGAI: "元町・中華街",
    MOTOSUMIYOSHI: "元住吉",
    MUSASHIKOSUGI: "武蔵小杉",
    MUSASHIKOYAMA: "武蔵小山",
    MUSASHINITTA: "武蔵新田",
    MYORENJI: "妙蓮寺",
    NAGAHARA: "長原",
    NAGATSUTA: "長津田",
    NAKAMEGURO: "中目黒",
    NAKANOBU: "中延",
    NIHONODORI: "日本大通り",
    NISHIKOYAMA: "西小山",
    NUMABE: "沼部",
    OIMACHI: "大井町",
    OKURAYAMA: "大倉山",
    OKUSAWA: "奥沢",
    ONTAKESAN: "御嶽山",
    OOKAYAMA: "大岡山",
    OSAKIHIROKOJI: "大崎広小路",
    OYAMADAI: "尾山台",
    SAGINUMA: "鷺沼",
    SAKURASHINMACHI: "桜新町",
    SANGENJAYA: "三軒茶屋",
    SENZOKU: "洗足",
    SENZOKUIKE: "洗足池",
    SHIBUYA: "渋谷",
    SHIMOMARUKO: "下丸子",
    SHIMOSHINMEI: "下神明",
    SHINMARUKO: "新丸子",
    SHINTAKASHIMA: "新高島",
    SHINTSUNASHIMA: "新綱島",
    SHINYOKOHAMA: "新横浜",
    SUZUKAKEDAI: "すずかけ台",
    TAKATSU: "高津",
    TAMAGAWA: "多摩川",
    TAMAPLAZA: "たまプラーザ",
    TANA: "田奈",
    TANMACHI: "反町",
    TODOROKI: "等々力",
    TOGOSHIGINZA: "戸越銀座",
    TOGOSHIKOEN: "戸越公園",
    TORITSUDAIGAKU: "都立大学",
    TSUKIMINO: "つきみ野",
    TSUKUSHINO: "つくし野",
    TSUNASHIMA: "綱島",
    UNOKI: "鵜の木",
    YAGUCHINOWATASHI: "矢口渡",
    YOGA: "用賀",
    YOKOHAMA: "横浜",
    YUKIGAYAOTSUKA: "雪が谷大塚",
    YUTENJI: "祐天寺",
};

const timeData = [
    { station1: "元町・中華街", station2: "日本大通り", time: 2 },
    { station1: "日本大通り", station2: "馬車道", time: 2 },
    { station1: "馬車道", station2: "みなとみらい", time: 2 },
    { station1: "みなとみらい", station2: "新高島", time: 2 },
    { station1: "新高島", station2: "横浜", time: 2 },
    { station1: "横浜", station2: "反町", time: 1 },
    { station1: "反町", station2: "東白楽", time: 2 },
    { station1: "東白楽", station2: "白楽", time: 2 },
    { station1: "白楽", station2: "妙蓮寺", time: 2 },
    { station1: "妙蓮寺", station2: "菊名", time: 2 },
    { station1: "菊名", station2: "大倉山", time: 2 },
    { station1: "大倉山", station2: "綱島", time: 2 },
    { station1: "綱島", station2: "日吉", time: 2 },
    { station1: "日吉", station2: "元住吉", time: 2 },
    { station1: "元住吉", station2: "武蔵小杉", time: 1 },
    { station1: "武蔵小杉", station2: "新丸子", time: 1 },
    { station1: "新丸子", station2: "多摩川", time: 2 },
    { station1: "多摩川", station2: "田園調布", time: 2 },
    { station1: "田園調布", station2: "自由が丘", time: 2 },
    { station1: "自由が丘", station2: "都立大学", time: 2 },
    { station1: "都立大学", station2: "学芸大学", time: 2 },
    { station1: "学芸大学", station2: "祐天寺", time: 2 },
    { station1: "祐天寺", station2: "中目黒", time: 2 },
    { station1: "中目黒", station2: "代官山", time: 2 },
    { station1: "代官山", station2: "渋谷", time: 2 },
    { station1: "日吉", station2: "新綱島", time: 3 },
    { station1: "新綱島", station2: "新横浜", time: 4 },
    { station1: "中央林間", station2: "つきみ野", time: 2 },
    { station1: "つきみ野", station2: "南町田グランベリーパーク", time: 1 },
    { station1: "南町田グランベリーパーク", station2: "すずかけ台", time: 2 },
    { station1: "すずかけ台", station2: "つくし野", time: 2 },
    { station1: "つくし野", station2: "長津田", time: 3 },
    { station1: "長津田", station2: "田奈", time: 2 },
    { station1: "田奈", station2: "青葉台", time: 2 },
    { station1: "青葉台", station2: "藤が丘", time: 1 },
    { station1: "藤が丘", station2: "市が尾", time: 2 },
    { station1: "市が尾", station2: "江田", time: 2 },
    { station1: "江田", station2: "あざみ野", time: 2 },
    { station1: "あざみ野", station2: "たまプラーザ", time: 1 },
    { station1: "たまプラーザ", station2: "鷺沼", time: 2 },
    { station1: "鷺沼", station2: "宮前平", time: 2 },
    { station1: "宮前平", station2: "宮崎台", time: 2 },
    { station1: "宮崎台", station2: "梶が谷", time: 2 },
    { station1: "梶が谷", station2: "溝の口", time: 2 },
    { station1: "溝の口", station2: "高津", time: 2 },
    { station1: "高津", station2: "二子新地", time: 1 },
    { station1: "二子新地", station2: "二子玉川", time: 2 },
    { station1: "二子玉川", station2: "用賀", time: 3 },
    { station1: "用賀", station2: "桜新町", time: 2 },
    { station1: "桜新町", station2: "駒沢大学", time: 3 },
    { station1: "駒沢大学", station2: "三軒茶屋", time: 2 },
    { station1: "三軒茶屋", station2: "池尻大橋", time: 3 },
    { station1: "池尻大橋", station2: "渋谷", time: 3 },
    { station1: "二子玉川", station2: "上野毛", time: 2 },
    { station1: "上野毛", station2: "等々力", time: 2 },
    { station1: "等々力", station2: "尾山台", time: 2 },
    { station1: "尾山台", station2: "九品仏", time: 2 },
    { station1: "九品仏", station2: "自由が丘", time: 2 },
    { station1: "自由が丘", station2: "緑が丘", time: 2 },
    { station1: "緑が丘", station2: "大岡山", time: 1 },
    { station1: "大岡山", station2: "北千束", time: 2 },
    { station1: "北千束", station2: "旗の台", time: 2 },
    { station1: "旗の台", station2: "荏原町", time: 2 },
    { station1: "荏原町", station2: "中延", time: 1 },
    { station1: "中延", station2: "戸越公園", time: 2 },
    { station1: "戸越公園", station2: "下神明", time: 2 },
    { station1: "下神明", station2: "大井町", time: 3 },
    { station1: "田園調布", station2: "奥沢", time: 2 },
    { station1: "奥沢", station2: "大岡山", time: 2 },
    { station1: "大岡山", station2: "洗足", time: 2 },
    { station1: "洗足", station2: "西小山", time: 2 },
    { station1: "西小山", station2: "武蔵小山", time: 2 },
    { station1: "武蔵小山", station2: "不動前", time: 1 },
    { station1: "不動前", station2: "目黒", time: 2 },
    { station1: "多摩川", station2: "沼部", time: 2 },
    { station1: "沼部", station2: "鵜の木", time: 2 },
    { station1: "鵜の木", station2: "下丸子", time: 2 },
    { station1: "下丸子", station2: "武蔵新田", time: 2 },
    { station1: "武蔵新田", station2: "矢口渡", time: 2 },
    { station1: "矢口渡", station2: "蒲田", time: 2 },
    { station1: "蒲田", station2: "蓮沼", time: 2 },
    { station1: "蓮沼", station2: "池上", time: 2 },
    { station1: "池上", station2: "千鳥町", time: 2 },
    { station1: "千鳥町", station2: "久が原", time: 1 },
    { station1: "久が原", station2: "御嶽山", time: 2 },
    { station1: "御嶽山", station2: "雪が谷大塚", time: 1 },
    { station1: "雪が谷大塚", station2: "石川台", time: 2 },
    { station1: "石川台", station2: "洗足池", time: 1 },
    { station1: "洗足池", station2: "長原", time: 2 },
    { station1: "長原", station2: "旗の台", time: 2 },
    { station1: "旗の台", station2: "荏原中延", time: 1 },
    { station1: "荏原中延", station2: "戸越銀座", time: 2 },
    { station1: "戸越銀座", station2: "大崎広小路", time: 2 },
    { station1: "大崎広小路", station2: "五反田", time: 2 },
];

/**
 * 駅名から駅コードを検索する
 * @param {string} value 駅名
 * @returns {string} 駅コード
 */
function getStationCode(value) {
    return Object.keys(stationMapping).find((key) => stationMapping[key] === value);
}

/**
 * 駅コードから駅名を検索する
 * @param {string} key 駅コード
 * @returns {string} 駅名
 */
function getStationName(key) {
    return stationMapping[key];
}

/**
 * stationGraphの生成
 */
function genGraph() {
    let stationGraph = {};
    for (const elm of timeData) {
        const data1 = {
            station: getStationCode(elm.station1),
            time: elm.time,
        };
        const data2 = {
            station: getStationCode(elm.station2),
            time: elm.time,
        };
        if (stationGraph[getStationCode(elm.station2)]) {
            stationGraph[getStationCode(elm.station2)].push(data1);
        } else {
            let array = new Array();
            array.push(data1);
            stationGraph[getStationCode(elm.station2)] = array;
        }
        if (stationGraph[getStationCode(elm.station1)]) {
            stationGraph[getStationCode(elm.station1)].push(data2);
        } else {
            let array = new Array();
            array.push(data2);
            stationGraph[getStationCode(elm.station1)] = array;
        }
    }
    console.log(stationGraph);
}

getName();
function getName() {
    const name = "蓮沼";
    console.log(getStationCode(name));
}
