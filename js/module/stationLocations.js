/* 各駅の緯度経度情報 */
const stationLocations = {
    AZAMINO: { latitude: 35.568717, longitude: 139.553556 },
    SUZUKAKEDAI: { latitude: 35.516963, longitude: 139.481467 },
    TAMAPLAZA: { latitude: 35.577427, longitude: 139.558447 },
    TSUKIMINO: { latitude: 35.510335, longitude: 139.458029 },
    TSUKUSHINO: { latitude: 35.527625, longitude: 139.48512 },
    MINATOMIRAI: { latitude: 35.457917, longitude: 139.632314 },
    UNOKI: { latitude: 35.575519, longitude: 139.680615 },
    EBARANAKANOBU: { latitude: 35.609953, longitude: 139.711954 },
    EBARAMACHI: { latitude: 35.603782, longitude: 139.70781 },
    OKUSAWA: { latitude: 35.59689, longitude: 139.66732 },
    YOKOHAMA: { latitude: 35.466188, longitude: 139.622715 },
    SHIMOMARUKO: { latitude: 35.571305, longitude: 139.685618 },
    SHIMOSHINMEI: { latitude: 35.608851, longitude: 139.726242 },
    GAKUGEIDAIGAKU: { latitude: 35.628845, longitude: 139.685284 },
    KAJIGAYA: { latitude: 35.594102, longitude: 139.606008 },
    KAMATA: { latitude: 35.562479, longitude: 139.716051 },
    HATANODAI: { latitude: 35.604848, longitude: 139.702497 },
    KIKUNA: { latitude: 35.50963984, longitude: 139.630734 },
    KUGAHARA: { latitude: 35.57984, longitude: 139.685345 },
    MIYAZAKIDAI: { latitude: 35.587325, longitude: 139.591349 },
    MIYAMAEDAIRA: { latitude: 35.584945, longitude: 139.581919 },
    KUHONBUTSU: { latitude: 35.605411, longitude: 139.661023 },
    KOMAZAWADAIGAKU: { latitude: 35.633471, longitude: 139.661702 },
    MOTOSUMIYOSHI: { latitude: 35.56432, longitude: 139.654046 },
    MOTOMACHICHUKAGAI: { latitude: 35.442411, longitude: 139.650472 },
    TOGOSHIGINZA: { latitude: 35.616008, longitude: 139.715032 },
    TOGOSHIKOEN: { latitude: 35.608795, longitude: 139.718056 },
    GOTANDA: { latitude: 35.626446, longitude: 139.723444 },
    ONTAKESAN: { latitude: 35.585303, longitude: 139.682367 },
    EDA: { latitude: 35.558646, longitude: 139.551509 },
    MIZONOKUCHI: { latitude: 35.600032, longitude: 139.610626 },
    TSUNASHIMA: { latitude: 35.536992, longitude: 139.634996 },
    TAKATSU: { latitude: 35.603548, longitude: 139.61747 },
    SAGINUMA: { latitude: 35.579579, longitude: 139.573018 },
    SAKURASHINMACHI: { latitude: 35.631666, longitude: 139.644779 },
    SANGENJAYA: { latitude: 35.643515, longitude: 139.671162 },
    ICHIGAO: { latitude: 35.551477, longitude: 139.541388 },
    JIYUGAOKA: { latitude: 35.607577, longitude: 139.669094 },
    SHIBUYA: { latitude: 35.6586161, longitude: 139.6993714 },
    NUMABE: { latitude: 35.582506, longitude: 139.673249 },
    KAMINOGE: { latitude: 35.612007, longitude: 139.638861 },
    SHINMARUKO: { latitude: 35.580626, longitude: 139.661919 },
    SHINTAKASHIMA: { latitude: 35.461892, longitude: 139.626823 },
    NISHIKOYAMA: { latitude: 35.615685, longitude: 139.698866 },
    AOBADAI: { latitude: 35.542955, longitude: 139.517182 },
    ISHIKAWADAI: { latitude: 35.596943, longitude: 139.685257 },
    YUKIGAYAOTSUKA: { latitude: 35.592002, longitude: 139.680978 },
    CHIDORICHO: { latitude: 35.57293, longitude: 139.691459 },
    SENZOKU: { latitude: 35.61043, longitude: 139.694367 },
    SENZOKUIKE: { latitude: 35.599796, longitude: 139.691098 },
    TAMAGAWA: { latitude: 35.589766, longitude: 139.668835 },
    DAIKANYAMA: { latitude: 35.648104, longitude: 139.703168 },
    OIMACHI: { latitude: 35.606249, longitude: 139.734855 },
    OOKAYAMA: { latitude: 35.607531, longitude: 139.685637 },
    OSAKIHIROKOJI: { latitude: 35.622469, longitude: 139.722486 },
    OKURAYAMA: { latitude: 35.522019, longitude: 139.629916 },
    IKEGAMI: { latitude: 35.572097, longitude: 139.702885 },
    IKEJIRIOHASHI: { latitude: 35.650603, longitude: 139.684319 },
    NAKANOBU: { latitude: 35.605479, longitude: 139.713679 },
    CHUORINKAN: { latitude: 35.50788411, longitude: 139.4441171 },
    NAKAMEGURO: { latitude: 35.644307, longitude: 139.699157 },
    NAGAHARA: { latitude: 35.602237, longitude: 139.697903 },
    NAGATSUTA: { latitude: 35.53168368, longitude: 139.4952627 },
    DENENCHOFU: { latitude: 35.603844, longitude: 139.6723 },
    TANA: { latitude: 35.536177, longitude: 139.504835 },
    TORITSUDAIGAKU: { latitude: 35.617835, longitude: 139.676393 },
    HIGASHIHAKURAKU: { latitude: 35.483425, longitude: 139.629361 },
    TODOROKI: { latitude: 35.60833, longitude: 139.648069 },
    FUJIGAOKA: { latitude: 35.543595, longitude: 139.527873 },
    MINAMIMACHIDAGRANBERRYPARK: { latitude: 35.511502, longitude: 139.470318 },
    FUTAKOTAMAGAWA: { latitude: 35.611499, longitude: 139.626624 },
    FUTAKOSHINCHI: { latitude: 35.607125, longitude: 139.622399 },
    HIYOSHI: { latitude: 35.553064, longitude: 139.646783 },
    NIHONODORI: { latitude: 35.446821, longitude: 139.642608 },
    BASHAMICHI: { latitude: 35.450135, longitude: 139.636175 },
    HAKURAKU: { latitude: 35.489697, longitude: 139.627892 },
    TANMACHI: { latitude: 35.47474, longitude: 139.625337 },
    OYAMADAI: { latitude: 35.606891, longitude: 139.654051 },
    FUDOMAE: { latitude: 35.625679, longitude: 139.713406 },
    MUSASHIKOYAMA: { latitude: 35.620507, longitude: 139.704413 },
    MUSASHIKOSUGI: { latitude: 35.57657493, longitude: 139.6594451 },
    MUSASHINITTA: { latitude: 35.567711, longitude: 139.692579 },
    KITASENZOKU: { latitude: 35.60632, longitude: 139.693214 },
    MYORENJI: { latitude: 35.498474, longitude: 139.633139 },
    MEGURO: { latitude: 35.633998, longitude: 139.715828 },
    YAGUCHINOWATASHI: { latitude: 35.562609, longitude: 139.699925 },
    YUTENJI: { latitude: 35.637696, longitude: 139.691155 },
    YOGA: { latitude: 35.626436, longitude: 139.633928 },
    MIDORIGAOKA: { latitude: 35.60638, longitude: 139.679366 },
    HASUNUMA: { latitude: 35.564376, longitude: 139.708521 },
    SHINTSUNASHIMA: { latitude: 35.53594459, longitude: 139.6360912 },
    SHINYOKOHAMA: { latitude: 35.50670837, longitude: 139.6168805 },
};

/**
 * 近い順に5駅取得する
 */
function findNearbyStations(latitude, longitude) {
    let stationDistances = [];
    for (const [station, location] of Object.entries(stationLocations)) {
        let distance = calcDistance(latitude, longitude, location.latitude, location.longitude);
        stationDistances.push({ station: station, distance: distance });
    }
    stationDistances.sort((a, b) => a.distance - b.distance);
    return stationDistances.slice(0, 5);
}

/**
 * 距離の計算
 */
function calcDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * 度からラジアンに変換
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/* ========== モジュールのエクスポート ========== */
export const StationLocations = {
    findNearbyStations,
};
