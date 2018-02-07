<template>
<section>
    <div style="display:none;" class="landscape"></div>
    <div style="display:none;" class="filter"></div>
    <canvas style="display:none;" id="canvas" width="100%" height="100%"></canvas>
    <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model.trim="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" @keyup.enter.native="handleSubmit2" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--<el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.stop="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</section>
</template>

<script>
import http from '@/api/http';
import cookie from "@/common/js/cookie"
import {
    mapMutations
} from 'vuex'
//import NProgress from 'nprogress'
export default {
    data() {
        return {
            logining: false,
            loginForm: {
                account: '',
                checkPass: ''
            },
            rules2: {
                account: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass }
                ],
                checkPass: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true
        };
    },
    methods: {
        ...mapMutations([
            'LOGIN'
        ]),
        handleReset2() {
            this.$refs.loginForm.resetFields();
        },
        handleSubmit2(ev) {
            var _this = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    //_this.$router.replace('/table');
                    this.logining = true;
                    //NProgress.start();
                    var loginParams = {
                        userName: this.loginForm.account,
                        password: this.loginForm.checkPass
                    };
                    http.post("/back/op/login", loginParams, function(msg) {
                        // _this.logining = false;
                        // cookie.set("login_name", msg.dataInfo)escape
                        _this.LOGIN(msg.dataInfo);
                        // console.log(_this.$store.state)
                        if (_this.checked) {
                            sessionStorage.setItem('user', escape(JSON.stringify(msg.dataInfo)));
                        }

                        _this.$router.push({
                            path: '/'
                        });
                    }, function(error) {
                        if (error.request) {
                            // if (error.request.status === 0 && error.request.statusText == "") {
                            _this.$message.error('登录超时！');
                            // }
                        } else {
                            _this.$message.error('登录失败！');
                        }
                        _this.logining = false;
                        console.log(error)
                        return false;
                    })


                }

            })
        }

    }
}
</script>

<style lang="scss" scoped>
.login-container {
    position: fixed;
    top: 50%;
    left: 50%;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: -155px auto auto -190px;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0 auto 40px;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0 0 35px;
    }
}
/* canvas 动画*/
section {
    margin: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    /*cursor:none;*/
    background: black;
    background: linear-gradient(to bottom,#000 0%,#20a0ff 100%);
}
.filter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #ADD8E6;
    /*animation:colorChange 30s ease-in-out infinite;*/
    /*animation-fill-mode:both;*/
    mix-blend-mode: overlay;
}
@keyframes colorChange {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
}
.landscape {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background-image:url('http://www.jq22.com/css/img/xkbg.png');*/
    background-size: 1000px 250px;
    background-repeat: repeat-x;
    background-position: center bottom;
}
</style>
