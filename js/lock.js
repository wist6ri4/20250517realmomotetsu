import { Constants } from "./constants.js";

/* パスワード */
const password = Constants.PASSWORD;

/**
 * Cookieを取得する
 */
function getCookie(name) {
    const value = ";" + document.cookie;
    const parts = value.split(";" + name + "=");
    if(parts.length === 2) return parts.pop().split(";").shift();
};

/**
 * Cookieを設定する
 */
function setCookie(name, value, hours) {
    let expires = "";
    if(hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + "; path=/" + expires;
};

// ページ読み込み時にCookieをチェックする
checkCookie();

/**
 * Cookieをチェックしてパスワードを入力する
 */
function checkCookie() {
    if(getCookie(Constants.COOKIE_KEY) === 'true') {
        window.location.href = './operation.html';
    } else {
        setTimeout(() => {
            const userInput = prompt("パスワードを入力してください:");
            if(userInput === password) {
                setCookie(Constants.COOKIE_KEY, 'true', 3); // 3時間保持
                window.location.href = './operation.html';
            } else {
                alert("パスワードが違います。");
            };
        }, 1500);
    };
};
