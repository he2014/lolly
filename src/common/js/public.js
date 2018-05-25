// if (process.env.NODE_ENV == "development") {
export const baseUrl = "http://www.7najm.com/resource/";
export const uploadUrl = "http://10.10.32.160:6007/photo/upload"
export const uploadVideoUrl = "http://10.10.32.160:6007/photo/uploadVideo"
export const uploadUrlImg = "http://10.10.32.160:6007/photo/uploadBack"
export const excelUrl = "http://10.10.32.160:6543/back/"
export const serverUrl = 'http://10.10.32.160:6543'


// export const serverUrl = 'http://10.10.32.84:6543'
//线上(阿语版)
// export const baseUrl = "http://fast.mooveely.com/";
// export const uploadUrl = "http://photo.mooveely.com/photo/upload";
// export const uploadVideoUrl = "http://photo.mooveely.com/photo/uploadVideo"
// export const uploadUrlImg = "http://photo.mooveely.com/photo/uploadBack"
// export const excelUrl = "http://lolly-back-proxy-1749771842.eu-central-1.elb.amazonaws.com/back/"
// export const serverUrl = 'http://lolly-back-proxy-1749771842.eu-central-1.elb.amazonaws.com'
//线上(南非版)
// export const baseUrl = "http://fast.camshot.top/";
// export const uploadUrl = "http://photo.camshot.top/photo/upload";
// export const uploadVideoUrl = "http://photo.camshot.top/photo/uploadVideo"
// export const uploadUrlImg = "http://photo.camshot.top/photo/uploadBack"
// export const excelUrl = "http://ger-back-proxy-1435500772.eu-central-1.elb.amazonaws.com/back/"
// export const serverUrl = 'http://ger-back-proxy-1435500772.eu-central-1.elb.amazonaws.com'
/**
 * 获取style
 * @param  {[type]} element            [el]
 * @param  {[type]} attr               [description]
 * @param  {String} [NumberMode='int'] 在获取 opactiy 时需要获取小数 parseFloat
 * @return {[type]}                    [description]
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : Math.floor(target);
}
/**
 * [freshScrollbar description]
 * 解决smooth-scrollbar 存在弹窗，弹窗不显示
 * @param  {[type]} bool [description]
 * @param  {[type]} el   [description]
 * @return {[type]}      [description]
 */
export const freshScrollbar = (bool, el) => { //smooth-scrollbar解决scrollbar导致el-dialog不显示问题
    if (bool) {
        el.firstChild.setAttribute("class", "")
        setTimeout(() => { //延迟加载,去掉style
            el.firstChild.setAttribute("style", "")
        })
    } else {
        el.firstChild.setAttribute("class", 'scroll-content')
    }

}
/** 生成时间戳
 * [getTimeStr description]
 * 将时间年月日转成时间戳 eg:2017-09-09
 * @param  {[type]} dateStr [description]
 * @return {[type]}         [description]
 */
export const getTimeStr = dateStr => {
    let newstr = dateStr.replace(/-/g, '/');
    let date = new Date(dateStr);
    let time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}
//标准时间转时间戳
export const getTimeStap = time => {
    //let date = new Date()
    return Date.parse(new Date(time));
}
/**
 * 时间戳转日期
 */
export const dateTime = {
    'showtime': function (source) {
        var month = source.getMonth() + 1
        return source.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (source.getDate() < 10 ? '0' + source.getDate() : source.getDate());
    },
    'fulltime': function (source) {
        var hours = source.getHours(),
            minutes = source.getMinutes(),
            seconds = source.getSeconds();
        return this.showtime(source) + ' ' +
            (hours < 10 ? '0' + hours : hours) +
            ':' + (minutes < 10 ? '0' + minutes : minutes) +
            ':' + (seconds < 10 ? '0' + seconds : seconds);
    },
    /**
     * 
     *   获取时长
     * @param {any} leftTime 时间戳
     * @returns 
     */
    "getTime": function (leftTime, bool) {
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
        var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
        var hours_date = days;

        function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        var time_str = days + ":" + hours + ":" + minutes + ":" + seconds;
        var hours_str = checkTime(Number(hours_date * 24 * 60) + Number(hours)) + ":" + minutes + ":" + seconds;
        return bool ? hours_str : time_str;

        // this.timeHtml = stringFormat(template.messageSpan, time_str);
        // 
    },
}

/**
 * 获取url参数
 * @param {*} name
 */
export const getQueryStringByName = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}