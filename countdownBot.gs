/*
 カウントダウンbot
 発言内容： <例> 「〇〇会社の面接まで、あと▲日のお知らせ！」
 発言時間： トリガーで設定
 */
function doBot() {
    //2017年3月1日と今の差を取得
    var days = compareDate(2017, 3, 1);

    //カウントダウンの対象となるもの
    var target = '〇〇会社の面接';

    //slackに投稿
    postMessage(days, target);
}

//あと何日かを求める関数
function compareDate(year, month, day) {
    var targetDate = new Date(year, month - 1, day);
    var currentDate = new Date();
    var diff = targetDate - currentDate;
    var diffDate = Math.floor(diff / 86400000); //1日は86400000ミリ秒
    return diffDate;
}

//slackに投稿する関数
function postMessage(days, target) {
    var payload =
    {
        "token": SLACK_TOKEN,
        "text" : target +"まで、あと"+ days +"日のお知らせ！",   //botの発言内容
        "username" : "カウントダウンbot",
        "icon_emoji" : ":date:",
        "channel" : "bot"
    };

    var options =
    {
        "method" : "post",
        "payload" : payload
    };

    UrlFetchApp.fetch("https://slack.com/api/chat.postMessage", options);
}

