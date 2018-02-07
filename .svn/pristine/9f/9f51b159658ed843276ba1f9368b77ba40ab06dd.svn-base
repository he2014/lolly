import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './routes'
import cookie from "@/common/js/cookie"
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
// import VueI18n from 'vue-i18n'//多语言
// import enLocale from 'element-ui/lib/locale/lang/en';
// import arLocale from 'element-ui/lib/locale/lang/ar'   //tr-TR     ar    en    zh-CN
// Vue.use(VueI18n) //设置语言
// Vue.config.lang = 'en'
//Vue.locale('en',enLocale)
//默认情况下中文语言包依旧是被引入的，可以使用 webpack 的 NormalModuleReplacementPlugin 替换默认语言包。
Vue.use(ElementUI); // 引入component  ：Vue.component(ElementUI)
Vue.use(VueRouter);
Vue.use(Vuex);

//NProgress.configure({ showSpinner: false });

// const router = new VueRouter({
//     routes
// })

// router.beforeEach((to, from, next) => {
//     if (to.path == '/login') {
//         sessionStorage.removeItem('user');
//         //cookie.delete(cookie.key.login_name)
//     }
//
//     // let user = sessionStorage.getItem('user');
//     //
//     // if (!user && to.path != '/login') {
//     //     next({
//     //         path: '/login'
//     //     })
//     // } else {
//     next()
//     // }
// })

// router.afterEach(transition => {
// NProgress.done();
// });

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App) //createElement
}).$mount('#app')
