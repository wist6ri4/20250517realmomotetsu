import { Constants } from "./constants.js";

const LoggingConstants = {
    API_URL: 'https://wvemjhvoca.execute-api.ap-northeast-1.amazonaws.com/default/20250517_realmomotetsu_logging'
}

const LoggingConfig = {
    LOG_LEVEL: 'INFO',
}

const LogLevel = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL',
}

class Logger {
    constructor() {
        const uuid = sessionStorage.getItem(Constants.SESSION_UUID);
        this.uuid = uuid;
    };

    async log(logLevel, logMessage, logObject=null) {
        const request = {
            'uuid': this.uuid,
            'logLevel': logLevel,
            'logMessage': logMessage,
            'logObject': logObject ? JSON.stringify(logObject) : null,
        }
        await this.sendLog(request);
    }

    async sendLog(request) {
        const logContent = {
            uuid: request.uuid,
            logLevel: request.logLevel,
            logMessage: request.logMessage,
        };

        if(request.logObject) {
            logContent.logObject = request.logObject;
        };

        const body = {
            logContent: logContent,
        };

        try {
            fetch(LoggingConstants.API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
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

    async Debug(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        }
        console.log(`[DEBUG]${logMessage}|`, logObject);
        await this.log(LogLevel.DEBUG, logMessage, logObject);
    };

    async Info(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        }
        console.log(`[INFO]${logMessage}|`, logObject);
        await this.log(LogLevel.INFO, logMessage , logObject);
    };

    async Warning(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        }
        console.warn(`[WARNING]${logMessage}|`, logObject);
        await this.log(LogLevel.WARNING, logMessage, logObject);
    };

    async Error(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        }
        console.error(`[ERROR]${logMessage}|`, logObject);
        await this.log(LogLevel.ERROR, logMessage, logObject);
    };

    async Critical(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR, LogLevel.CRITICAL]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        }
        console.error(`[CRITICAL]${logMessage}|`, logObject);
        await this.log(LogLevel.CRITICAL, logMessage, logObject);
    };
};

export { Logger };
