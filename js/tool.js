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


const stationLocations = [
    {
        "stationName": "あざみ野",
        "latitude": 35.568717,
        "longitude": 139.553556
    },
    {
        "stationName": "すずかけ台",
        "latitude": 35.516963,
        "longitude": 139.481467
    },
    {
        "stationName": "たまプラーザ",
        "latitude": 35.577427,
        "longitude": 139.558447
    },
    {
        "stationName": "つきみ野",
        "latitude": 35.510335,
        "longitude": 139.458029
    },
    {
        "stationName": "つくし野",
        "latitude": 35.527625,
        "longitude": 139.48512
    },
    {
        "stationName": "みなとみらい",
        "latitude": 35.457917,
        "longitude": 139.632314
    },
    {
        "stationName": "鵜の木",
        "latitude": 35.575519,
        "longitude": 139.680615
    },
    {
        "stationName": "荏原中延",
        "latitude": 35.609953,
        "longitude": 139.711954
    },
    {
        "stationName": "荏原町",
        "latitude": 35.603782,
        "longitude": 139.70781
    },
    {
        "stationName": "奥沢",
        "latitude": 35.59689,
        "longitude": 139.66732
    },
    {
        "stationName": "横浜",
        "latitude": 35.466188,
        "longitude": 139.622715
    },
    {
        "stationName": "下丸子",
        "latitude": 35.571305,
        "longitude": 139.685618
    },
    {
        "stationName": "下神明",
        "latitude": 35.608851,
        "longitude": 139.726242
    },
    {
        "stationName": "学芸大学",
        "latitude": 35.628845,
        "longitude": 139.685284
    },
    {
        "stationName": "梶が谷",
        "latitude": 35.594102,
        "longitude": 139.606008
    },
    {
        "stationName": "蒲田",
        "latitude": 35.562479,
        "longitude": 139.716051
    },
    {
        "stationName": "旗の台",
        "latitude": 35.604848,
        "longitude": 139.702497
    },
    {
        "stationName": "菊名",
        "latitude": 35.50963984,
        "longitude": 139.630734
    },
    {
        "stationName": "久が原",
        "latitude": 35.57984,
        "longitude": 139.685345
    },
    {
        "stationName": "宮崎台",
        "latitude": 35.587325,
        "longitude": 139.591349
    },
    {
        "stationName": "宮前平",
        "latitude": 35.584945,
        "longitude": 139.581919
    },
    {
        "stationName": "九品仏",
        "latitude": 35.605411,
        "longitude": 139.661023
    },
    {
        "stationName": "駒沢大学",
        "latitude": 35.633471,
        "longitude": 139.661702
    },
    {
        "stationName": "元住吉",
        "latitude": 35.56432,
        "longitude": 139.654046
    },
    {
        "stationName": "元町・中華街",
        "latitude": 35.442411,
        "longitude": 139.650472
    },
    {
        "stationName": "戸越銀座",
        "latitude": 35.616008,
        "longitude": 139.715032
    },
    {
        "stationName": "戸越公園",
        "latitude": 35.608795,
        "longitude": 139.718056
    },
    {
        "stationName": "五反田",
        "latitude": 35.626446,
        "longitude": 139.723444
    },
    {
        "stationName": "御嶽山",
        "latitude": 35.585303,
        "longitude": 139.682367
    },
    {
        "stationName": "江田",
        "latitude": 35.558646,
        "longitude": 139.551509
    },
    {
        "stationName": "溝の口",
        "latitude": 35.600032,
        "longitude": 139.610626
    },
    {
        "stationName": "綱島",
        "latitude": 35.536992,
        "longitude": 139.634996
    },
    {
        "stationName": "高津",
        "latitude": 35.603548,
        "longitude": 139.61747
    },
    {
        "stationName": "鷺沼",
        "latitude": 35.579579,
        "longitude": 139.573018
    },
    {
        "stationName": "桜新町",
        "latitude": 35.631666,
        "longitude": 139.644779
    },
    {
        "stationName": "三軒茶屋",
        "latitude": 35.643515,
        "longitude": 139.671162
    },
    {
        "stationName": "市が尾",
        "latitude": 35.551477,
        "longitude": 139.541388
    },
    {
        "stationName": "自由が丘",
        "latitude": 35.607577,
        "longitude": 139.669094
    },
    {
        "stationName": "渋谷",
        "latitude": 35.6586161,
        "longitude": 139.6993714
    },
    {
        "stationName": "沼部",
        "latitude": 35.582506,
        "longitude": 139.673249
    },
    {
        "stationName": "上野毛",
        "latitude": 35.612007,
        "longitude": 139.638861
    },
    {
        "stationName": "新丸子",
        "latitude": 35.580626,
        "longitude": 139.661919
    },
    {
        "stationName": "新高島",
        "latitude": 35.461892,
        "longitude": 139.626823
    },
    {
        "stationName": "西小山",
        "latitude": 35.615685,
        "longitude": 139.698866
    },
    {
        "stationName": "青葉台",
        "latitude": 35.542955,
        "longitude": 139.517182
    },
    {
        "stationName": "石川台",
        "latitude": 35.596943,
        "longitude": 139.685257
    },
    {
        "stationName": "雪が谷大塚",
        "latitude": 35.592002,
        "longitude": 139.680978
    },
    {
        "stationName": "千鳥町",
        "latitude": 35.57293,
        "longitude": 139.691459
    },
    {
        "stationName": "洗足",
        "latitude": 35.61043,
        "longitude": 139.694367
    },
    {
        "stationName": "洗足池",
        "latitude": 35.599796,
        "longitude": 139.691098
    },
    {
        "stationName": "多摩川",
        "latitude": 35.589766,
        "longitude": 139.668835
    },
    {
        "stationName": "代官山",
        "latitude": 35.648104,
        "longitude": 139.703168
    },
    {
        "stationName": "大井町",
        "latitude": 35.606249,
        "longitude": 139.734855
    },
    {
        "stationName": "大岡山",
        "latitude": 35.607531,
        "longitude": 139.685637
    },
    {
        "stationName": "大崎広小路",
        "latitude": 35.622469,
        "longitude": 139.722486
    },
    {
        "stationName": "大倉山",
        "latitude": 35.522019,
        "longitude": 139.629916
    },
    {
        "stationName": "池上",
        "latitude": 35.572097,
        "longitude": 139.702885
    },
    {
        "stationName": "池尻大橋",
        "latitude": 35.650603,
        "longitude": 139.684319
    },
    {
        "stationName": "中延",
        "latitude": 35.605479,
        "longitude": 139.713679
    },
    {
        "stationName": "中央林間",
        "latitude": 35.50788411,
        "longitude": 139.4441171
    },
    {
        "stationName": "中目黒",
        "latitude": 35.644307,
        "longitude": 139.699157
    },
    {
        "stationName": "長原",
        "latitude": 35.602237,
        "longitude": 139.697903
    },
    {
        "stationName": "長津田",
        "latitude": 35.53168368,
        "longitude": 139.4952627
    },
    {
        "stationName": "田園調布",
        "latitude": 35.603844,
        "longitude": 139.6723
    },
    {
        "stationName": "田奈",
        "latitude": 35.536177,
        "longitude": 139.504835
    },
    {
        "stationName": "都立大学",
        "latitude": 35.617835,
        "longitude": 139.676393
    },
    {
        "stationName": "東白楽",
        "latitude": 35.483425,
        "longitude": 139.629361
    },
    {
        "stationName": "等々力",
        "latitude": 35.60833,
        "longitude": 139.648069
    },
    {
        "stationName": "藤が丘",
        "latitude": 35.543595,
        "longitude": 139.527873
    },
    {
        "stationName": "南町田グランベリーパーク",
        "latitude": 35.511502,
        "longitude": 139.470318
    },
    {
        "stationName": "二子玉川",
        "latitude": 35.611499,
        "longitude": 139.626624
    },
    {
        "stationName": "二子新地",
        "latitude": 35.607125,
        "longitude": 139.622399
    },
    {
        "stationName": "日吉",
        "latitude": 35.553064,
        "longitude": 139.646783
    },
    {
        "stationName": "日本大通り",
        "latitude": 35.446821,
        "longitude": 139.642608
    },
    {
        "stationName": "馬車道",
        "latitude": 35.450135,
        "longitude": 139.636175
    },
    {
        "stationName": "白楽",
        "latitude": 35.489697,
        "longitude": 139.627892
    },
    {
        "stationName": "反町",
        "latitude": 35.47474,
        "longitude": 139.625337
    },
    {
        "stationName": "尾山台",
        "latitude": 35.606891,
        "longitude": 139.654051
    },
    {
        "stationName": "不動前",
        "latitude": 35.625679,
        "longitude": 139.713406
    },
    {
        "stationName": "武蔵小山",
        "latitude": 35.620507,
        "longitude": 139.704413
    },
    {
        "stationName": "武蔵小杉",
        "latitude": 35.57657493,
        "longitude": 139.6594451
    },
    {
        "stationName": "武蔵新田",
        "latitude": 35.567711,
        "longitude": 139.692579
    },
    {
        "stationName": "北千束",
        "latitude": 35.60632,
        "longitude": 139.693214
    },
    {
        "stationName": "妙蓮寺",
        "latitude": 35.498474,
        "longitude": 139.633139
    },
    {
        "stationName": "目黒",
        "latitude": 35.633998,
        "longitude": 139.715828
    },
    {
        "stationName": "矢口渡",
        "latitude": 35.562609,
        "longitude": 139.699925
    },
    {
        "stationName": "祐天寺",
        "latitude": 35.637696,
        "longitude": 139.691155
    },
    {
        "stationName": "用賀",
        "latitude": 35.626436,
        "longitude": 139.633928
    },
    {
        "stationName": "緑が丘",
        "latitude": 35.60638,
        "longitude": 139.679366
    },
    {
        "stationName": "蓮沼",
        "latitude": 35.564376,
        "longitude": 139.708521
    },
    {
        "stationName": "新綱島",
        "latitude": 35.53594459,
        "longitude": 139.6360912
    },
    {
        "stationName": "新横浜",
        "latitude": 35.50670837,
        "longitude": 139.6168805
    }
]

/**
 * 駅名から駅コードを検索する
 * @param {string} value 駅名
 * @returns {string} 駅コード
 */
function getStationCode(value) {
    const stationCode = Object.keys(stationMapping).find((key) => stationMapping[key] === value);
    if(stationCode) {
        return stationCode;
    } else {
        console.log(value);
        return stationCode;
    };
};

/**
 * 駅コードから駅名を検索する
 * @param {string} key 駅コード
 * @returns {string} 駅名
 */
function getStationName(key) {
    const stationName = stationMapping[key];
    if(stationName) {
        return stationName;
    } else {
        console.log(key);
        return stationName;
    };
};

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

genLocation();
function genLocation() {
    let locations = {};
    for(const e of stationLocations) {
        locations[getStationCode(e.stationName)] = {
            latitude: e.latitude,
            longitude: e.longitude
        }
    }
    console.log(Object.values(locations).length, locations);
}