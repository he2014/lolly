export default {
               'duration': 7 * 24 * 60 * 60 * 1000,
               'cookieDomain': "localhost://8080",
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
                       cookie_str += "expires=" + date.toGMTString()+";";
                       console.log(date.toGMTString());
                   }
                     cookie_str += "path=/;";
                     document.cookie = cookie_str;
               },
               'delete': function(cookie_name,domain) {
                   if (!cookie_name || cookie_name == '') {
                       return;
                   }
                   var date = new Date(0);
                  //  date.getDate(date.getDate() - 10000);
                  if(domain === undefined) {
                     document.cookie = cookie_name + "='adfsd'; expires=" + date.toUTCString()+ ";path=/;";
                  }else {
                     document.cookie = cookie_name + "='adfsd'; expires=" + date.toUTCString()+ ";path=/;domain=" + domain+';';
                  }
               }
              //    store
           }
