import { Constants } from "./constants.js";

const LoggingConstants = {
    // API_URL: 'https://wvemjhvoca.execute-api.ap-northeast-1.amazonaws.com/default/20250517_realmomotetsu_logging'
    API_URL: 'test'
}

const LogLevel = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL',
}

const uuid = sessionStorage.getItem(Constants.SESSION_UUID);

class Logger {
    constructor() {
        this.uuid = uuid;
    };

    async log(logLevel, logMessage=null) {
        const request = {
            'uuid': this.uuid,
            'logLevel': logLevel,
            'logMessage': logMessage,
        }
        await this.sendLog(request);
    }

    async sendLog(request) {
        const body = {
            'logContent': {
                'uuid': request.uuid,
                'logLevel': request.logLevel,
                'logMessage': request.logMessage,
            }
        }
        try {
            fetch(LoggingConstants.API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(body),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        };
    };

    async Debug(logMessage=null) {
        await Log(LogLevel.DEBUG, logMessage);
    };

    async Info(logMessage=null) {
        await Log(LogLevel.INFO, logMessage);
    };

    async Warning(logMessage=null) {
        await Log(LogLevel.WARNING, logMessage);
    };

    async Error(logMessage=null) {
        await Log(LogLevel.ERROR, logMessage);
    };

    async Critical(logMessage=null) {
        await Log(LogLevel.CRITICAL, logMessage);
    };
};

export { Logger };
