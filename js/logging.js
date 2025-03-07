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
        this.request = {
            uuid: this.uuid,
            logLevel: null,
            logMessage: null,
        }
    };

    async Debug(logMessage=null) {
        this.request.logLevel = LogLevel.DEBUG;
        this.request.logMessage = logMessage;
        await sendLog(this.request);
    };

    async Info(logMessage=null) {
        this.request.logLevel = LogLevel.INFO;
        this.request.logMessage = logMessage;
        await sendLog(this.request);
    };

    async Warning(logMessage=null) {
        this.request.logLevel = LogLevel.WARNING;
        this.request.logMessage = logMessage;
        await sendLog(this.request);
    };

    async Error(logMessage=null) {
        this.request.logLevel = LogLevel.ERROR;
        this.request.logMessage = logMessage;
        await sendLog(this.request);
    };

    async Critical(logMessage=null) {
        this.request.logLevel = LogLevel.CRITICAL;
        this.request.logMessage = logMessage;
        await sendLog(this.request);
    };
};

async function sendLog(request) {
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

export { Logger };
