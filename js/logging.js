/* ========== モジュールのインポート ========== */
import { Constants } from "./constants.js";

/* ========== 固有定数の設定 ========== */
// Loggingの定数
const LoggingConstants = {
    API_URL: 'https://wvemjhvoca.execute-api.ap-northeast-1.amazonaws.com/default/20250517_realmomotetsu_logging'
}

// Loggingの設定
const LoggingConfig = {
    LOG_LEVEL: 'DEBUG', // ログレベル [DEBUG, INFO, WARNING, ERROR, CRITICAL]
}

// ログレベル文字列
const LogLevel = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL',
}

/* ========== クラス定義 ========== */
/**
 * Loggerクラス
 */
class Logger {
    /**
     * Loggerのコンストラクタ
     */
    constructor() {
        const uuid = sessionStorage.getItem(Constants.SESSION_UUID);
        this.uuid = uuid;
    };

    /**
     * ログのフォーマット
     *
     * @param {string} logLevel ログレベル
     * @param {string} logMessage ログメッセージ
     * @param {object} logObject ログオブジェクト
     */
    async log(logLevel, logMessage, logObject=null) {
        const viewName = window.location.pathname.split('/').pop().split('.').shift();
        const request = {
            'uuid': this.uuid,
            'logLevel': logLevel,
            'logMessage': logMessage,
            'logObject': logObject ? JSON.stringify(logObject) : null,
            'viewName': viewName,
        }
        await this.sendLog(request);

        // ログのコンソール出力
        const logContent = `[${logLevel}] ${new Date().toLocaleString()} [${viewName}] ${logMessage} |`
        if(new Set([LogLevel.DEBUG, LogLevel.INFO]).has(LoggingConfig.LOG_LEVEL)) {
            console.log(logContent, logObject);
        } else if (new Set([LogLevel.WARNING]).has(LoggingConfig.LOG_LEVEL)) {
            console.warn(logContent, logObject);
        } else if (new Set([LogLevel.ERROR, LogLevel.CRITICAL]).has(LoggingConfig.LOG_LEVEL)) {
            console.error(logContent, logObject);
        };
    };

    /**
     * ログの送信
     *
     * @param {object} request ログリクエスト
     * @returns {Promise} ログ送信結果
     * @throws {Error} ログ送信エラー
     */
    async sendLog(request) {
        const logContent = {
            uuid: request.uuid,
            logLevel: request.logLevel,
            logMessage: request.logMessage,
            viewName: request.viewName,
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

    /**
     * DEBUG
     *
     * @param {string} logMessage ログメッセージ
     * @param {object} logObject ログオブジェクト
     */
    async Debug(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        };
        await this.log(LogLevel.DEBUG, logMessage, logObject);
    };

    /**
     * INFO
     *
     * @param {string} logMessage ログメッセージ
     * @param {object} logObject ログオブジェクト
     */
    async Info(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        };
        await this.log(LogLevel.INFO, logMessage , logObject);
    };

    /**
     * WARNING
     *
     * @param {string} logMessage ログメッセージ
     * @param {object} logObject ログオブジェクト
     */
    async Warning(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        };
        await this.log(LogLevel.WARNING, logMessage, logObject);
    };

    /**
     * ERROR
     *
     * @param {string} logMessage ログメッセージ
     * @param {object} logObject ログオブジェクト
     */
    async Error(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        };
        await this.log(LogLevel.ERROR, logMessage, logObject);
    };

    /**
     * CRITICAL
     *
     * @param {string} logMessage ログメッセージ
     * @param {object} logObject ログオブジェクト
     */
    async Critical(logMessage, logObject=null) {
        if(!new Set([LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR, LogLevel.CRITICAL]).has(LoggingConfig.LOG_LEVEL)) {
            return;
        };
        await this.log(LogLevel.CRITICAL, logMessage, logObject);
    };
};

/* ========== モジュールのエクスポート ========== */
export { Logger };
