/* 駅名と駅コードのマッピング */
const stationMapping = {
    AOBADAI: '青葉台',
    AZAMINO: 'あざみ野',
    BASHAMICHI: '馬車道',
    CHIDORICHO: '千鳥町',
    CHUORINKAN: '中央林間',
    DAIKANYAMA: '代官山',
    DENENCHOFU: '田園調布',
    EBARAMACHI: '荏原町',
    EBARANAKANOBU: '荏原中延',
    EDA: '江田',
    FUDOMAE: '不動前',
    FUJIGAOKA: '藤が丘',
    FUTAKOSHINCHI: '二子新地',
    FUTAKOTAMAGAWA: '二子玉川',
    GAKUGEIDAIGAKU: '学芸大学',
    GOTANDA: '五反田',
    HAKURAKU: '白楽',
    HASUNUMA: '蓮沼',
    HATANODAI: '旗の台',
    HIGASHIHAKURAKU: '東白楽',
    HIYOSHI: '日吉',
    ICHIGAO: '市が尾',
    IKEGAMI: '池上',
    IKEJIRIOHASHI: '池尻大橋',
    ISHIKAWADAI: '石川台',
    JIYUGAOKA: '自由が丘',
    KAJIGAYA: '梶が谷',
    KAMATA: '蒲田',
    KAMINOGE: '上野毛',
    KIKUNA: '菊名',
    KITASENZOKU: '北千束',
    KOMAZAWADAIGAKU: '駒沢大学',
    KUGAHARA: '久が原',
    KUHONBUTSU: '九品仏',
    MEGURO: '目黒',
    MIDORIGAOKA: '緑が丘',
    MINAMIMACHIDAGRANBERRYPARK: '南町田グランベリーパーク',
    MINATOMIRAI: 'みなとみらい',
    MIYAMAEDAIRA: '宮前平',
    MIYAZAKIDAI: '宮崎台',
    MIZONOKUCHI: '溝の口',
    MOTOMACHICHUKAGAI: '元町・中華街',
    MOTOSUMIYOSHI: '元住吉',
    MUSASHIKOSUGI: '武蔵小杉',
    MUSASHIKOYAMA: '武蔵小山',
    MUSASHINITTA: '武蔵新田',
    MYORENJI: '妙蓮寺',
    NAGAHARA: '長原',
    NAGATSUTA: '長津田',
    NAKAMEGURO: '中目黒',
    NAKANOBU: '中延',
    NIHONODORI: '日本大通り',
    NISHIKOYAMA: '西小山',
    NUMABE: '沼部',
    OIMACHI: '大井町',
    OKURAYAMA: '大倉山',
    OKUSAWA: '奥沢',
    ONTAKESAN: '御嶽山',
    OOKAYAMA: '大岡山',
    OSAKIHIROKOJI: '大崎広小路',
    OYAMADAI: '尾山台',
    SAGINUMA: '鷺沼',
    SAKURASHINMACHI: '桜新町',
    SANGENJAYA: '三軒茶屋',
    SENZOKU: '洗足',
    SENZOKUIKE: '洗足池',
    SHIBUYA: '渋谷',
    SHIMOMARUKO: '下丸子',
    SHIMOSHINMEI: '下神明',
    SHINMARUKO: '新丸子',
    SHINTAKASHIMA: '新高島',
    SHINTSUNASHIMA: '新綱島',
    SHINYOKOHAMA: '新横浜',
    SUZUKAKEDAI: 'すずかけ台',
    TAKATSU: '高津',
    TAMAGAWA: '多摩川',
    TAMAPLAZA: 'たまプラーザ',
    TANA: '田奈',
    TANMACHI: '反町',
    TODOROKI: '等々力',
    TOGOSHIGINZA: '戸越銀座',
    TOGOSHIKOEN: '戸越公園',
    TORITSUDAIGAKU: '都立大学',
    TSUKIMINO: 'つきみ野',
    TSUKUSHINO: 'つくし野',
    TSUNASHIMA: '綱島',
    UNOKI: '鵜の木',
    YAGUCHINOWATASHI: '矢口渡',
    YOGA: '用賀',
    YOKOHAMA: '横浜',
    YUKIGAYAOTSUKA: '雪が谷大塚',
    YUTENJI: '祐天寺',
};

/* 各駅の間隔の定義 */
const stationGraph = {
    AOBADAI: [
        { station: 'TANA', time: 2 },
        { station: 'FUJIGAOKA', time: 1 },
    ],
    AZAMINO: [
        { station: 'EDA', time: 2 },
        { station: 'TAMAPLAZA', time: 1 },
    ],
    BASHAMICHI: [
        { station: 'NIHONODORI', time: 2 },
        { station: 'MINATOMIRAI', time: 2 },
    ],
    CHIDORICHO: [
        { station: 'IKEGAMI', time: 2 },
        { station: 'KUGAHARA', time: 1 },
    ],
    CHUORINKAN: [{ station: 'TSUKIMINO', time: 2 }],
    DAIKANYAMA: [
        { station: 'NAKAMEGURO', time: 2 },
        { station: 'SHIBUYA', time: 2 },
    ],
    DENENCHOFU: [
        { station: 'TAMAGAWA', time: 2 },
        { station: 'JIYUGAOKA', time: 2 },
        { station: 'OKUSAWA', time: 2 },
    ],
    EBARAMACHI: [
        { station: 'HATANODAI', time: 2 },
        { station: 'NAKANOBU', time: 1 },
    ],
    EBARANAKANOBU: [
        { station: 'HATANODAI', time: 1 },
        { station: 'TOGOSHIGINZA', time: 2 },
    ],
    EDA: [
        { station: 'ICHIGAO', time: 2 },
        { station: 'AZAMINO', time: 2 },
    ],
    FUDOMAE: [
        { station: 'MUSASHIKOYAMA', time: 1 },
        { station: 'MEGURO', time: 2 },
    ],
    FUJIGAOKA: [
        { station: 'AOBADAI', time: 1 },
        { station: 'ICHIGAO', time: 2 },
    ],
    FUTAKOSHINCHI: [
        { station: 'TAKATSU', time: 1 },
        { station: 'FUTAKOTAMAGAWA', time: 2 },
    ],
    FUTAKOTAMAGAWA: [
        { station: 'FUTAKOSHINCHI', time: 2 },
        { station: 'YOGA', time: 3 },
        { station: 'KAMINOGE', time: 2 },
    ],
    GAKUGEIDAIGAKU: [
        { station: 'TORITSUDAIGAKU', time: 2 },
        { station: 'YUTENJI', time: 2 },
    ],
    GOTANDA: [{ station: 'OSAKIHIROKOJI', time: 2 }],
    HAKURAKU: [
        { station: 'HIGASHIHAKURAKU', time: 2 },
        { station: 'MYORENJI', time: 2 },
    ],
    HASUNUMA: [
        { station: 'KAMATA', time: 2 },
        { station: 'IKEGAMI', time: 2 },
    ],
    HATANODAI: [
        { station: 'KITASENZOKU', time: 2 },
        { station: 'EBARAMACHI', time: 2 },
        { station: 'NAGAHARA', time: 2 },
        { station: 'EBARANAKANOBU', time: 1 },
    ],
    HIGASHIHAKURAKU: [
        { station: 'TANMACHI', time: 2 },
        { station: 'HAKURAKU', time: 2 },
    ],
    HIYOSHI: [
        { station: 'TSUNASHIMA', time: 2 },
        { station: 'MOTOSUMIYOSHI', time: 2 },
        { station: 'SHINTSUNASHIMA', time: 3 },
    ],
    ICHIGAO: [
        { station: 'FUJIGAOKA', time: 2 },
        { station: 'EDA', time: 2 },
    ],
    IKEGAMI: [
        { station: 'HASUNUMA', time: 2 },
        { station: 'CHIDORICHO', time: 2 },
    ],
    IKEJIRIOHASHI: [
        { station: 'SANGENJAYA', time: 3 },
        { station: 'SHIBUYA', time: 3 },
    ],
    ISHIKAWADAI: [
        { station: 'YUKIGAYAOTSUKA', time: 2 },
        { station: 'SENZOKUIKE', time: 1 },
    ],
    JIYUGAOKA: [
        { station: 'DENENCHOFU', time: 2 },
        { station: 'TORITSUDAIGAKU', time: 2 },
        { station: 'KUHONBUTSU', time: 2 },
        { station: 'MIDORIGAOKA', time: 2 },
    ],
    KAJIGAYA: [
        { station: 'MIYAZAKIDAI', time: 2 },
        { station: 'MIZONOKUCHI', time: 2 },
    ],
    KAMATA: [
        { station: 'YAGUCHINOWATASHI', time: 2 },
        { station: 'HASUNUMA', time: 2 },
    ],
    KAMINOGE: [
        { station: 'FUTAKOTAMAGAWA', time: 2 },
        { station: 'TODOROKI', time: 2 },
    ],
    KIKUNA: [
        { station: 'MYORENJI', time: 2 },
        { station: 'OKURAYAMA', time: 2 },
    ],
    KITASENZOKU: [
        { station: 'OOKAYAMA', time: 2 },
        { station: 'HATANODAI', time: 2 },
    ],
    KOMAZAWADAIGAKU: [
        { station: 'SAKURASHINMACHI', time: 3 },
        { station: 'SANGENJAYA', time: 2 },
    ],
    KUGAHARA: [
        { station: 'CHIDORICHO', time: 1 },
        { station: 'ONTAKESAN', time: 2 },
    ],
    KUHONBUTSU: [
        { station: 'OYAMADAI', time: 2 },
        { station: 'JIYUGAOKA', time: 2 },
    ],
    MEGURO: [{ station: 'FUDOMAE', time: 2 }],
    MIDORIGAOKA: [
        { station: 'JIYUGAOKA', time: 2 },
        { station: 'OOKAYAMA', time: 1 },
    ],
    MINAMIMACHIDAGRANBERRYPARK: [
        { station: 'TSUKIMINO', time: 1 },
        { station: 'SUZUKAKEDAI', time: 2 },
    ],
    MINATOMIRAI: [
        { station: 'BASHAMICHI', time: 2 },
        { station: 'SHINTAKASHIMA', time: 2 },
    ],
    MIYAMAEDAIRA: [
        { station: 'SAGINUMA', time: 2 },
        { station: 'MIYAZAKIDAI', time: 2 },
    ],
    MIYAZAKIDAI: [
        { station: 'MIYAMAEDAIRA', time: 2 },
        { station: 'KAJIGAYA', time: 2 },
    ],
    MIZONOKUCHI: [
        { station: 'KAJIGAYA', time: 2 },
        { station: 'TAKATSU', time: 2 },
    ],
    MOTOMACHICHUKAGAI: [{ station: 'NIHONODORI', time: 2 }],
    MOTOSUMIYOSHI: [
        { station: 'HIYOSHI', time: 2 },
        { station: 'MUSASHIKOSUGI', time: 1 },
    ],
    MUSASHIKOSUGI: [
        { station: 'MOTOSUMIYOSHI', time: 1 },
        { station: 'SHINMARUKO', time: 1 },
    ],
    MUSASHIKOYAMA: [
        { station: 'NISHIKOYAMA', time: 2 },
        { station: 'FUDOMAE', time: 1 },
    ],
    MUSASHINITTA: [
        { station: 'SHIMOMARUKO', time: 2 },
        { station: 'YAGUCHINOWATASHI', time: 2 },
    ],
    MYORENJI: [
        { station: 'HAKURAKU', time: 2 },
        { station: 'KIKUNA', time: 2 },
    ],
    NAGAHARA: [
        { station: 'SENZOKUIKE', time: 2 },
        { station: 'HATANODAI', time: 2 },
    ],
    NAGATSUTA: [
        { station: 'TSUKUSHINO', time: 3 },
        { station: 'TANA', time: 2 },
    ],
    NAKAMEGURO: [
        { station: 'YUTENJI', time: 2 },
        { station: 'DAIKANYAMA', time: 2 },
    ],
    NAKANOBU: [
        { station: 'EBARAMACHI', time: 1 },
        { station: 'TOGOSHIKOEN', time: 2 },
    ],
    NIHONODORI: [
        { station: 'MOTOMACHICHUKAGAI', time: 2 },
        { station: 'BASHAMICHI', time: 2 },
    ],
    NISHIKOYAMA: [
        { station: 'SENZOKU', time: 2 },
        { station: 'MUSASHIKOYAMA', time: 2 },
    ],
    NUMABE: [
        { station: 'TAMAGAWA', time: 2 },
        { station: 'UNOKI', time: 2 },
    ],
    OIMACHI: [{ station: 'SHIMOSHINMEI', time: 3 }],
    OKURAYAMA: [
        { station: 'KIKUNA', time: 2 },
        { station: 'TSUNASHIMA', time: 2 },
    ],
    OKUSAWA: [
        { station: 'DENENCHOFU', time: 2 },
        { station: 'OOKAYAMA', time: 2 },
    ],
    ONTAKESAN: [
        { station: 'KUGAHARA', time: 2 },
        { station: 'YUKIGAYAOTSUKA', time: 1 },
    ],
    OOKAYAMA: [
        { station: 'MIDORIGAOKA', time: 1 },
        { station: 'KITASENZOKU', time: 2 },
        { station: 'OKUSAWA', time: 2 },
        { station: 'SENZOKU', time: 2 },
    ],
    OSAKIHIROKOJI: [
        { station: 'TOGOSHIGINZA', time: 2 },
        { station: 'GOTANDA', time: 2 },
    ],
    OYAMADAI: [
        { station: 'TODOROKI', time: 2 },
        { station: 'KUHONBUTSU', time: 2 },
    ],
    SAGINUMA: [
        { station: 'TAMAPLAZA', time: 2 },
        { station: 'MIYAMAEDAIRA', time: 2 },
    ],
    SAKURASHINMACHI: [
        { station: 'YOGA', time: 2 },
        { station: 'KOMAZAWADAIGAKU', time: 3 },
    ],
    SANGENJAYA: [
        { station: 'KOMAZAWADAIGAKU', time: 2 },
        { station: 'IKEJIRIOHASHI', time: 3 },
    ],
    SENZOKU: [
        { station: 'OOKAYAMA', time: 2 },
        { station: 'NISHIKOYAMA', time: 2 },
    ],
    SENZOKUIKE: [
        { station: 'ISHIKAWADAI', time: 1 },
        { station: 'NAGAHARA', time: 2 },
    ],
    SHIBUYA: [
        { station: 'DAIKANYAMA', time: 2 },
        { station: 'IKEJIRIOHASHI', time: 3 },
    ],
    SHIMOMARUKO: [
        { station: 'UNOKI', time: 2 },
        { station: 'MUSASHINITTA', time: 2 },
    ],
    SHIMOSHINMEI: [
        { station: 'TOGOSHIKOEN', time: 2 },
        { station: 'OIMACHI', time: 3 },
    ],
    SHINMARUKO: [
        { station: 'MUSASHIKOSUGI', time: 1 },
        { station: 'TAMAGAWA', time: 2 },
    ],
    SHINTAKASHIMA: [
        { station: 'MINATOMIRAI', time: 2 },
        { station: 'YOKOHAMA', time: 2 },
    ],
    SHINTSUNASHIMA: [
        { station: 'HIYOSHI', time: 3 },
        { station: 'SHINYOKOHAMA', time: 4 },
    ],
    SHINYOKOHAMA: [{ station: 'SHINTSUNASHIMA', time: 4 }],
    SUZUKAKEDAI: [
        { station: 'MINAMIMACHIDAGRANBERRYPARK', time: 2 },
        { station: 'TSUKUSHINO', time: 2 },
    ],
    TAKATSU: [
        { station: 'MIZONOKUCHI', time: 2 },
        { station: 'FUTAKOSHINCHI', time: 1 },
    ],
    TAMAGAWA: [
        { station: 'SHINMARUKO', time: 2 },
        { station: 'DENENCHOFU', time: 2 },
        { station: 'NUMABE', time: 2 },
    ],
    TAMAPLAZA: [
        { station: 'AZAMINO', time: 1 },
        { station: 'SAGINUMA', time: 2 },
    ],
    TANA: [
        { station: 'NAGATSUTA', time: 2 },
        { station: 'AOBADAI', time: 2 },
    ],
    TANMACHI: [
        { station: 'YOKOHAMA', time: 1 },
        { station: 'HIGASHIHAKURAKU', time: 2 },
    ],
    TODOROKI: [
        { station: 'KAMINOGE', time: 2 },
        { station: 'OYAMADAI', time: 2 },
    ],
    TOGOSHIGINZA: [
        { station: 'EBARANAKANOBU', time: 2 },
        { station: 'OSAKIHIROKOJI', time: 2 },
    ],
    TOGOSHIKOEN: [
        { station: 'NAKANOBU', time: 2 },
        { station: 'SHIMOSHINMEI', time: 2 },
    ],
    TORITSUDAIGAKU: [
        { station: 'JIYUGAOKA', time: 2 },
        { station: 'GAKUGEIDAIGAKU', time: 2 },
    ],
    TSUKIMINO: [
        { station: 'CHUORINKAN', time: 2 },
        { station: 'MINAMIMACHIDAGRANBERRYPARK', time: 1 },
    ],
    TSUKUSHINO: [
        { station: 'SUZUKAKEDAI', time: 2 },
        { station: 'NAGATSUTA', time: 3 },
    ],
    TSUNASHIMA: [
        { station: 'OKURAYAMA', time: 2 },
        { station: 'HIYOSHI', time: 2 },
    ],
    UNOKI: [
        { station: 'NUMABE', time: 2 },
        { station: 'SHIMOMARUKO', time: 2 },
    ],
    YAGUCHINOWATASHI: [
        { station: 'MUSASHINITTA', time: 2 },
        { station: 'KAMATA', time: 2 },
    ],
    YOGA: [
        { station: 'FUTAKOTAMAGAWA', time: 3 },
        { station: 'SAKURASHINMACHI', time: 2 },
    ],
    YOKOHAMA: [
        { station: 'SHINTAKASHIMA', time: 2 },
        { station: 'TANMACHI', time: 1 },
    ],
    YUKIGAYAOTSUKA: [
        { station: 'ONTAKESAN', time: 1 },
        { station: 'ISHIKAWADAI', time: 2 },
    ],
    YUTENJI: [
        { station: 'GAKUGEIDAIGAKU', time: 2 },
        { station: 'NAKAMEGURO', time: 2 },
    ],
};

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

/* ========== モジュールのエクスポート ========== */
export const StationCode = {
    stationMapping,
    stationGraph,
    getStationCode,
    getStationName,
};
