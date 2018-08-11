// フェードインで表示するコンテンツをdisplay:noneで非表示にする
$('head').append('<style type="text/css">#wrapper{display:none;}</style>');

$(function() {
  // フェードインidを指定と表示速度ミリ秒
$('#wrapper').fadeIn(2000);
// ページ遷移時にフェードアウトさせるclickイベントの要素を指定。ここではli a
$('#fadeout a, a.windowFade').click(function() {
var url = $(this).attr("href");
// アニメーションで透過0になるまでフェードアウトさせる。速度ミリ秒
$('#wrapper').animate({"opacity": 0}, 500, function() {
location.href = url;
});
return false;
});
});

$(function() {
var showFlag = false;
var topBtn = $('#page-top');
topBtn.css('bottom', '-100px');
var showFlag = false;
//スクロールが100に達したらボタン表示
$(window).scroll(function () {
if ($(this).scrollTop() > 100) {
if (showFlag == false) {
showFlag = true;
topBtn.stop().animate({'bottom' : '10px'}, 200); 
}
} else {
if (showFlag) {
showFlag = false;
topBtn.stop().animate({'bottom' : '-100px'}, 200); 
}
}
});
//スクロールしてトップ
topBtn.click(function () {
$('body,html').animate({
scrollTop: 0
}, 500);
return false;
});
});
