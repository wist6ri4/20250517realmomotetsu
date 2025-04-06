/* ========== モジュールのインポート ========== */
import { Constants } from "./constants.js";
import { StationLocations } from "./stationLocations.js";
import { StationCode } from "./stationCode.js";
import { Logger } from "./logging.js";

/*========== Logger初期化 ==========*/
const logger = new Logger();

/* ========== function ========== */
/**
 * 現在地から近くの駅を取得する
 *
 * @returns {Array} 近くの駅
 */
async function getNearByStation() {
    if(!("geolocation" in navigator)){
        return [];
    };

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        });
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let accuracy = position.coords.accuracy;

        const nearbyStations = StationLocations.findNearbyStations(latitude, longitude);
        sessionStorage.setItem(Constants.SESSION_NEARBY_STATIONS, JSON.stringify(nearbyStations));

        logger.Debug(
            `Get current location. NearbyStation:${StationCode.getStationName(nearbyStations[0].station)} Latitude:${latitude} Longitude:${longitude} Accuracy:${accuracy}`,
            nearbyStations
        );
        return nearbyStations;

    } catch(error) {
        logger.Warning('Failed to get nearby station.', error);
        return [];
    };
};

/* ========== モジュールのエクスポート ========== */
export const Locations = {
    getNearByStation
};
