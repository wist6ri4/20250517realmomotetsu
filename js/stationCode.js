const stationMapping = {
    AOBADAI: "青葉台",
    AZAMINO: "あざみ野",
    BASHAMICHI: "馬車道",
    CHIDORICHO: "千鳥町",
    CHUORINKAN: "中央林間",
    DAIKANYAMA: "代官山",
    DENENCHOFU: "田園調布",
    EBARAMACHI: "荏原町",
    EBARANAKANO: "荏原中延",
    EDA: "江田",
    FUDOMAE: "不動前",
    FUJIGAOKA: "藤が丘",
    FUTAKOSHINCHI: "二子新地",
    FUTAKOTAMAGAWA: "二子玉川",
    GAKUGEIDAIGAKU: "学芸大学",
    GOTANDA: "五反田",
    HAKURAKU: "白楽",
    HANAMICHI: "反町",
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
    MIYAMAEHIRA: "宮前平",
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
    TODOROKI: "等々力",
    TOGOSHIGINZA: "戸越銀座",
    TOGOSHIKOEN: "戸越公園",
    TORITSUDAIGAKU: "都立大学",
    TSUKIMINO: "つきみ野",
    TSUKUSHINO: "つくし野",
    TSUNASHIMA: "綱島",
    UNOKI: "鵜の木",
    YAGUCHIWATASHI: "矢口渡",
    YOGA: "用賀",
    YOKOHAMA: "横浜",
    YUKIGAYAOTSUKA: "雪が谷大塚",
    YUTENJI: "祐天寺",
};

const stationGraph = {
    'YOKOHAMA': [{station: 'YUTENJI', time: 2}],
    'YUTENJI': [{station: 'YOKOHAMA', time: 2}, {station: 'TAKATSU', time: 3}],
    'TAKATSU': [{station: 'YUTENJI', time: 3}, {station: 'OSAKIHIROKOJI', time: 4}],
    'OSAKIHIROKOJI': [{station: 'TAKATSU', time: 4}]
};

/**
 * 駅名から駅コードを検索する
 * @param {string} value 駅名
 * @returns {string} 駅コード
 */
function getStationCode(value) {
    return Object.keys(stationMapping).find(key => stationMapping[key] === value);
};

/**
 * 駅コードから駅名を検索する
 * @param {string} key 駅コード
 * @returns {string} 駅名
 */
function getStationName(key) {
    return stationMapping[key];
};