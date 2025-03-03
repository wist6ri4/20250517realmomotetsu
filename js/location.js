import { StationLocations } from "./stationLocations.js";

export const Locations = {
    getNearByStation
};

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

        console.log("緯度：" + latitude);
        console.log("経度：" + longitude);
        console.log("位置の精度：" + accuracy);

        return StationLocations.findNearbyStations(latitude, longitude);

    } catch(error) {
        console.log(error.message);
        return [];
    };
};
