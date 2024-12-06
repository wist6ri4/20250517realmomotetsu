/* 共通ヘッダーの読み込み */
$(function() {
    $.ajaxSetup({cache:false});
    $('.header-contents').load("./header.html", function() {
        $('#home-header').removeClass('active');
        $('#roulette-header').removeClass('active');
        $('#googleform-header').addClass('active');
    });
})