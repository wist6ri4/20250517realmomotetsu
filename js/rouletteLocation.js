import { StationCode } from "./stationCode.js";
import { Locations } from "./location.js";

setNearByStation();

/**
 * 最寄り駅を取得して表示
 */
async function setNearByStation() {
    try {
        const nearbyStations = await Locations.getNearByStation();
        console.log(nearbyStations);
        const nearbyStation = nearbyStations[0].station;
        console.log(nearbyStation);
        $('#current-station').val(StationCode.getStationName(nearbyStation));
    } catch (error) {
        console.log(error.message);
    };
};