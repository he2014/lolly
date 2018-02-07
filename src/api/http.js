import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from "axios";
import Qs from "qs"
import store from '@/vuex/store'
import routes from '@/routes'
import {
    serverUrl
} from '@/common/js/public'
Vue.use(ElementUI);
var vue = new Vue({
    store
});
axios.defaults.baseURL = serverUrl;
axios.interceptors.request.use(
    config => {
        let token = vue.$store.state.loginKey || JSON.parse(unescape(sessionStorage.getItem('user')))
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['X-Token'] = token['token'];
            config.headers['userName'] = token['backUserId'];
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器

axios.interceptors.response.use(
    response => {
        if (response.status === 401) {
            sessionStorage.removeItem('user');
            routes.replace({
                path: '/login'
            })
        }
        return response;
    },
    error => {

        return Promise.reject(error)
    });
export default {
    post(url, data, successfn, errorfn) {
        let r = new Date().getTime();
        let repeatUrl = url + "?v=" + r;
        axios({
            url: repeatUrl,
            method: 'post',
            // baseURL:"http://192.168.12.54:8080/",
            transformRequrest: [function(data) {
                // before the request data is sent to the server
                return data;
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformResponse: [function(data) {
                return data;
            }],
            // withCredentials: false,   //  默认false
            data: Qs.stringify(data, {
                arrayFormat: 'brackets'
            }),
            timeout: 60 * 20 * 1000,
            responseType: 'json', // default
            // contentType: "application/json; charset=utf-8",
            xsrfCookieName: 'XSRF-TOKEN', // default
            xsrfHeaderName: 'X-XSRF-TOKEN', // default
            validateStatus: function(status) {
                return status >= 0 && status < 500; // 默认的
            },
            // headers: {'contentType': "application/json; charset=utf-8"},
            maxRedirects: 5, // default
            proxy: {} //  defines the hostname and port of the proxy server
        }).then(
            (response) => {
                if (response.data.code === 0) {
                    successfn(response.data);
                } else {
                    if (response.data.code) vue.$message.error('接口调用失败!原因:code=' + response.data.code);
                    else vue.$message.error('接口调用失败');

                }

            }
        ).catch(
            (error) => {

                if (error.response) {
                    // vue.$message.error('response');
                    //  发出了请求，服务端返回了 状态码 2xx
                    //console.log("%cresponse error %o", "color:red;font-size:16px;", error.response)
                    if (error.response.status === 0) {

                        // loginTimeout();
                    }
                } else if (error.request) {
                    // vue.$message.error('接口异常');
                    if (error.request.status === 0 && error.request.statusText == "") {
                        //登录超时处理
                        // if (loginTimeoutFlag) {
                        //     loginTimeoutFlag = false;
                        //     loginTimeout();
                        // }
                        // vue.$message.error('登录超时');

                    }
                    // 请求发出了，但是没有接受到 响应
                    //  'error.request' 是一个 浏览器中的XMLHttpRequest 实例，
                    //   在node.js 中 就是 http.ClientRequest 实例；
                    //console.log("%crequest error %o", "color:red;font-size:16px;", error.request);
                } else {
                    //vue.$message.error('登录失败');
                    console.log("Error", error.message);
                }
                console.log("Error", error.message);
                if (typeof errorfn !== "undefined") {
                    errorfn(error);
                }
            }
        )
    },
    get(url, data, successfn, errorfn) {
        let r = new Date().getTime();
        let repeatUrl = url + "?v=" + r;
        axios({
            url: repeatUrl,
            method: 'get',
            timeout: 10000,
            params: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
                // 'Content-Type': "application/json;charset=UTF-8"
            },
            validateStatus: function(status) {
                return status >= 0 && status < 500; // 默认的
            },
            responsetype: 'json' //返回数据类型
        }).then((response) => {
            if (response.data.code === 0) {
                successfn(response.data);
            } else {
                if (response.data.code) vue.$message.error('接口调用失败!原因:code=' + response.data.code);
                else vue.$message.error('接口调用失败');
            }
        }).catch(
            (error) => {
                console.log(error)
                if (error.response) {
                    //  发出了请求，服务端返回了 状态码 2xx
                    if (error.response.status === 0) {
                        // vue.$message.error('登录超时');
                    }
                } else if (error.request) {
                    if (error.request.status === 0 && error.request.statusText == "") {}
                    // 请求发出了，但是没有接受到 响应
                    //  'error.request' 是一个 浏览器中的XMLHttpRequest 实例，
                    //   在node.js 中 就是 http.ClientRequest 实例；
                    console.log("%crequest error %o", "color:red;font-size:16px;", error.request);
                } else {
                    vue.$message.error('接口调用失败');
                    console.log("Error", error.message);
                }
                if (typeof errorfn !== "undefined") {
                    errorfn(error);
                }
            }
        )
    }



};