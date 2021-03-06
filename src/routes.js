import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'
import Home from '@/views/Home.vue'
import Main from '@/views/Main.vue'
// import systemUser from '@/views/system/systemUser.vue'
import userManage from '@/views/user/userManage.vue'
import IMnews from '@/views/news/IMnews.vue'
import SensitiveWord from '@/views/Sensitive/SensitiveWord.vue'
import Userdetails from '@/views/user/Userdetails.vue'
import userImage from '@/views/user/userImage.vue'
import thenumberofgifts from '@/views/user/thenumberofgifts.vue'
import giftMain from '@/views/gift/giftMain.vue'
import giftedit from '@/views/gift/giftedit.vue'
// import IosRecharge from '@/views/recharge/iosRecharge.vue'
import androidRecharge from '@/views/recharge/androidRecharge.vue'
import Rechargerecord from '@/views/recharge/Rechargerecord.vue'
// import IosRechargeEdit from '@/views/recharge/iosRechargeEdit.vue'
// import androidRechargeEdit from '@/views/recharge/androidRechargeEdit.vue'
// import IMImage from '@/views/news/IMImage.vue'
// import IMEdit from '@/views/news/IMEdit.vue'
import pushMessage from '@/views/news/pushMessage.vue'
import pushMessageEdit from '@/views/news/pushMessageEdit.vue'
import DisableDisplay from '@/views/disable/DisableDisplay.vue'
import hostInformation from '@/views/news/hostInformation.vue'
import datastatistics from '@/views/datastatistics/userData.vue'
import UnreceivedStatistics from '@/views/datastatistics/UnreceivedStatistics.vue'
import Banner from "@/views/active/banner/bnaner.vue"
import singleMonitor from "@/views/monitor/singleMonitor.vue"
import monitorCenter from "@/views/monitor/monitorCenter.vue"

let routes = [{
    path: '/',
    redirect: '/home', //重定向
    component: Home,
    hidden: true,
    iconCls: 'fa fa-home',
    children: [{
        path: '/home',
        component: Main,
        name: '',
        hidden: true
    }]
},
{
    path: '/login',
    component: Login, // 注册组件
    name: '',
    hidden: true
},
{
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
},
{
    path: '/user',
    name: '用户系统',
    component: Home,
    iconCls: 'fa fa-user',
    children: [{
        path: '/user/userManage',
        name: '用户列表',
        component: userManage,
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: '/user/Userdetails',
        hidden: true,
        name: '修改',
        component: Userdetails,
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: '/user/userImage',
        hidden: true,
        name: '照片状态更改',
        component: userImage,
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: "/user/thenumberofgifts",
        hidden: true,
        name: "收礼数",
        component: thenumberofgifts,
        meta: {
            keepAlive: false // 需要被缓存
        }
    }
    ]
},
{
    path: '/operate',
    component: Home,
    name: '基础数据',
    iconCls: 'fa fa-list-alt',
    children: [{
        path: '/operate/gift',
        name: '礼物',
        component: giftMain,
        meta: {
            keepAlive: false // 需要被缓存
        }
    }, {
        path: '/operate/giftedit',
        name: "修改",
        hidden: true,
        component: giftedit,
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: '/operate/banner',
        name: "banner",
        component: Banner,
        hidden: true,
        meta: {
            keepAlive: false // 需要被缓存
        }
    }
    ]
},
{
    path: '/recharge',
    component: Home,
    name: '充值管理',
    iconCls: 'fa fa-credit-card',
    children: [
        //   {
        //   path: '/recharge/ios',
        //   name: 'ios充值',
        //   component: IosRecharge
        // }, {
        //   path: "/recharge/iosEdit",
        //   name: "ios充值修改",
        //   hidden: true,
        //   component: IosRechargeEdit
        // },
        {
            path: '/recharge/android',
            name: '充值',
            component: androidRecharge
        },
        {
            path: '/recharge/red',
            name: '充值记录',
            component: Rechargerecord
        }
        // {
        //   path: "/recharge/androidEdit",
        //   name: 'android充值修改',
        //   hidden: true,
        //   component: androidRechargeEdit
        // }
    ]
},

{
    path: '/safe',
    component: Home,
    name: '安全',
    iconCls: 'fa fa-bell',
    children: [{
        path: '/disable/DisableDisplay.vue',
        name: '禁用操作记录',
        component: DisableDisplay
    }]
},
// {
//     path: '/system',
//     component: Home,
//     name: '系统配置',
//     iconCls: 'fa fa-cog',
//     children: [
//         // {
//         //     // path: '/system/systemUser',
//         //     // name: '系统用户管理',
//         //     // component: systemUser
//         // },
//         // { path: '', name:'ttt', component: Table},
//     ]
// },

{
    path: '/news',
    component: Home,
    name: '消息系统',
    iconCls: 'fa fa-envelope',
    children: [{
        path: '/news/IMnews',
        name: 'IM管理',
        component: IMnews
    },
    // {
    //   path: '/news/IMImage',
    //   hidden: true,
    //   name: 'IM照片状态更改',
    //   component: IMImage
    // },
    // {
    //     path: '/news/IMEdit',
    //     hidden: true,
    //     name: 'IM编辑',
    //     component: IMEdit
    // },
    {
        path: '/news/msg',
        name: 'push消息',
        component: pushMessage,
        meta: {
            keepAlive: false // 需要被缓存
        }
    }, {
        path: '/news/msgEdit',
        name: '修改',
        hidden: true,
        component: pushMessageEdit,
        meta: {
            keepAlive: false // 需要被缓存
        }
    },
    {
        path: '/news/hostInformation',
        name: '主播申请列表',
        component: hostInformation
    }
    ]
},
{ //datastatistics
    path: '/datastatistics',
    component: Home,
    name: '数据统计',
    iconCls: 'fa fa-list-alt',
    children: [{
        path: '/datastatistics/suer',
        name: '统计详情',
        component: datastatistics
    }, {
        path: '/datastatistics/UnreceivedStatistics',
        name: '主播未接听统计',
        component: UnreceivedStatistics
    }]
},
{
    path: '/Sensitive',
    component: Home,
    name: '敏感词库',
    iconCls: 'fa fa-user-times',
    children: [{
        path: '/Sensitive/SensitiveWord',
        name: '昵称敏感词',
        component: SensitiveWord
    }]
},
{ //datastatistics
    path: '/monitor',
    component: Home,
    name: '监控管理',
    iconCls: 'fa fa-desktop',
    children: [{
        path: '/monitor/single',
        name: '视频聊天监控',
        component: singleMonitor
    },
    {
        path: '/monitor/all',
        name: '监控中心',
        component: monitorCenter
    }]
},
{
    path: '*',
    hidden: true,
    redirect: {
        path: '/404'
    }
},

];
const router = new VueRouter({
    routes
})
export default router;