/* ========== モジュールのインポート ========== */
import { Constants } from './module/constants.js';
import { Logger } from './module/logging.js';

/*========== Logger初期化 ==========*/
const logger = new Logger();

/* パスワード */
const password = Constants.PASSWORD;

/* ========== 画面表示時の実行メソッド ========== */
// ページ読み込み時にCookieをチェックする
checkCookie();

/* ========== function ========== */
/**
 * Cookieを取得する
 *
 * @param {string} name Cookie名
 * @returns {string} Cookie値
 */
function getCookie(name) {
    const value = ';' + document.cookie;
    const parts = value.split(';' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * Cookieを設定する
 *
 * @param {string} name Cookie名
 * @param {string} value Cookie値
 * @param {number} hours 有効時間
 */
function setCookie(name, value, hours) {
    let expires = '';
    if (hours) {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + '; path=/' + expires;
}

/**
 * Cookieをチェックしてパスワードを入力する
 */
async function checkCookie() {
    if (getCookie(Constants.COOKIE_KEY) === 'true') {
        window.location.href = './operation.html';
    } else {
        setTimeout(async () => {
            const userInput = prompt('パスワードを入力してください:');
            if (userInput === password) {
                setCookie(Constants.COOKIE_KEY, 'true', Constants.COOKIE_EXPIRES);
                await logger.Info('Success to login as admin.');
                window.location.href = './operation.html';
            } else {
                alert('パスワードが違います。');
            }
        }, 100);
    }
}
