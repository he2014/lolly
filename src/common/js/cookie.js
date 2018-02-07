import {
    serverUrl
} from '@/common/js/public'
export default {
    'duration': 1 * 24 * 60 * 60 * 1000,

    'key': {
        login_name: "login_name"
    },

    'cookieDomain': "http://127.0.0.1:8888",

    'get': function(cookie_name) {
        if (!cookie_name || cookie_name == '') {
            return null;
        }
        var reg = new RegExp("(^| )" + cookie_name + "=([^;]*)(;|$)");
        var arr = document.cookie.match(reg);
        if (arr) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    'set': function(cookie_name, cookie_val, time) {
        time = time || this.duration;
        if (!cookie_name || cookie_name == '') {
            return;
        }
        var cookie_str = cookie_name + "=" + escape(cookie_val) + ";";
        if (time > 0) {
            var date = new Date();
            date.setTime(date.getTime() + time);
            cookie_str += "expires=" + date.toGMTString() + ";";
        }
        cookie_str += "path=/;domain=" + this.cookieDomain + ";";
        document.cookie = cookie_str;
    },
    'delete': function(cookie_name) {
        if (!cookie_name || cookie_name == '') {
            return;
        }
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = cookie_name + "=; expires=" + date.toGMTString() + ";path=/;domain=" + this.cookieDomain + ";";
    }
}
