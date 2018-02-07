// if (process.env.NODE_ENV == "development") {
// export const baseUrl = "http://www.7najm.com/resource/";
// export const uploadUrl = "http://10.10.32.160:6007/photo/upload"
// export const excelUrl = "http://10.10.32.160:6543/back/"
// export const serverUrl = 'http://10.10.32.160:6543'
// export const uploadUrlImg = "http://10.10.32.160:6007/photo/uploadBack"
// export const serverUrl = 'http://10.10.32.84:6543'
//线上(阿语版)
// export const baseUrl = "http://fast.lollyou.com/";
// export const uploadUrl = "http://photo.lollyou.com/photo/upload";
// export const uploadUrlImg = "http://photo.lollyou.com/photo/uploadBack"
// export const excelUrl = "http://lolly-back-proxy-1749771842.eu-central-1.elb.amazonaws.com/back/"
// export const serverUrl = 'http://lolly-back-proxy-1749771842.eu-central-1.elb.amazonaws.com'
//线上(德语版)
export const baseUrl = "http://fast.mooveely.com/";
export const uploadUrl = "http://photo.mooveely.com/photo/upload";
export const uploadUrlImg = "http://photo.mooveely.com/photo/uploadBack"
export const excelUrl = "http://ger-back-proxy-1435500772.eu-central-1.elb.amazonaws.com/back/"
export const serverUrl = 'http://ger-back-proxy-1435500772.eu-central-1.elb.amazonaws.com'
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
    'showtime': function(source) {
        var month = source.getMonth() + 1
        return source.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (source.getDate() < 10 ? '0' + source.getDate() : source.getDate());
    },
    'fulltime': function(source) {
        var hours = source.getHours(),
            minutes = source.getMinutes(),
            seconds = source.getSeconds();
        return this.showtime(source) + ' ' +
            (hours < 10 ? '0' + hours : hours) +
            ':' + (minutes < 10 ? '0' + minutes : minutes) +
            ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
}
/**
 * 获取url参数
 * @param {*} name
 */
export const getQueryStringByName = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
