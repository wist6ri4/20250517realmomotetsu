import { Constants } from "./constants.js";

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

const password = Constants.PASSWORD;

if(getCookie(Constants.COOKIE_KEY) !== 'true') {
    const userInput = prompt("パスワードを入力してください:");
    if(userInput === password) {
        setCookie(Constants.COOKIE_KEY, 'true', 3); // 3時間保持
        window.location.href = './operation.html';
    } else {
        alert("パスワードが違います。");
    };
} else {
    window.location.href = './operation.html';
};

