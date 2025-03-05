/* ========== モジュールのインポート ========== */
import { Constants } from "./constants.js";
import { StationLocations } from "./stationLocations.js";

/* ========== function ========== */
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

        console.log("緯度：" + latitude+ "\n経度：" + longitude + "\n位置の精度：" + accuracy);

        const nearbyStations = StationLocations.findNearbyStations(latitude, longitude);
        sessionStorage.setItem(Constants.SESSION_NEARBY_STATIONS, JSON.stringify(nearbyStations));
        return nearbyStations;

    } catch(error) {
        console.log(error.message);
        return [];
    };
};

/* ========== モジュールのエクスポート ========== */
export const Locations = {
    getNearByStation
};
