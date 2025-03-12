import { Constants } from './constants.js';

checkUuid();
/**
 * UUIDをチェックしてsessionStorageにセットする
 *
 * @returns {string} UUID
 */
function checkUuid() {
    const uuid = sessionStorage.getItem(Constants.SESSION_UUID);
    if(uuid) {
        return uuid;
    } else {
        // UUIDがない場合、新しく生成してセットする
        const newUUID = crypto.randomUUID();
        sessionStorage.setItem(Constants.SESSION_UUID, newUUID);
        return newUUID;
    };
};

export { checkUuid };
