<template>
<section>
    <el-row>
        <el-col>
            <el-button type="primary" size="mini" @click="returnUserMan"> 返回</el-button>
            <p :style="{color:'red'}">
                只有用户性别为女时才能成为PGC
            </p>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <p class="spanLine"></p>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6">
            <el-form size="mini" :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="修改昵称" prop="nickName">
                    <el-input type="text" v-model="ruleForm2.nickName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户身份更改" prop="identity">
                    <el-select :disabled="ruleForm2.sex!=2" v-model="ruleForm2.identity" placeholder="请选择">
                        <el-option v-for="item in identitystatus" :key="item.value" :label="item.lable" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select :disabled="ruleForm2.identity!=='用户'" v-model="ruleForm2.sex" placeholder="请选择">
                        <el-option v-for="item in sex" :key="item.value" :label="item.lable" :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="color:red;font-size:10px">*1男 2女</span>
                </el-form-item>
                <el-form-item label="结算方式" prop="exchangeType">
                    <el-select v-model="ruleForm2.exchangeType" :disabled="ruleForm2.identity==='用户'||!ruleForm2.identity" placeholder="请选择">
                        <el-option v-for="item in settlementoptions" :key="item.value" :label="item.lable" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结算比例(%)" prop="exchangeRate">
                    <el-input :disabled="ruleForm2.identity==='用户'||!ruleForm2.identity" type="text" v-model="ruleForm2.exchangeRate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <p class="spanLine"></p>
        </el-col>
    </el-row>
</section>
</template>
<script>
import http from "@/api/http"
export default {
    name: "",
    data() {
        return {
            sex: [{
                lable: 1,
                value: 1

            }, {
                lable: 2,
                value: 2
            }],
            identitystatus: [{
                lable: "PGC",
                value: "PGC"
            }, {
                lable: '用户',
                value: "用户"
            }, {
                lable: '运营',
                value: "运营"
            }],
            settlementoptions: [{
                lable: '周结',
                value: "周结"
            }, {
                lable: '月结',
                value: "月结"
            }],
            ruleForm2: {
                userId: ""
            },
        };
    },
    mounted() {
        //do something after mounting vue instance
        this.userData();
    },
    methods: {
        async userData() {
            let id = this.$route.query.ids;
            await http.get("/back/user/queryUser/" + id, {}, (data) => {
                let userData = data.dataInfo;
                userData.identity = userData.identity == 0 ? "PGC" : userData.identity == 1 ? "运营" : userData.identity == 2 ? "用户" : "";
                userData.exchangeType = userData.exchangeType == 1 ? "周结" : userData.exchangeType == 2 ? "月结" : "";
                userData.exchangeRate = userData.exchangeRate ? userData.exchangeRate * 100 : userData.exchangeRate;
                this.ruleForm2 = userData;
            })
        },
        returnUserMan() {
            this.$router.push("/user/userManage?page=" + this.$route.query.page);
        },

        submitForm(formName) {

            //console.log(this.ruleForm2)

            this.$confirm('是否确定提交此次修改?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    if (this.ruleForm2.identity == "PGC" && !this.ruleForm2.exchangeType && !this.ruleForm2.exchangeRate || this.ruleForm2.identity == "PGC" && this.ruleForm2.exchangeType && !this.ruleForm2.exchangeRate || this.ruleForm2.identity ==
                        "PGC" && !this.ruleForm2.exchangeType && this.ruleForm2.exchangeRate) {
                        this.$message({
                            type: 'warning',
                            message: '请选择结算方式与比例！',
                            duration: 1000
                        });
                        return false;
                    }
                    let data = this.ruleForm2;
                    switch (data.identity) {
                        case "PGC":
                            data.identity = 0;
                            break;
                        case "运营":
                            data.identity = 1;
                            break;
                        case "用户":
                            data.identity = 2;
                            break;
                    }
                    switch (data.exchangeType) {
                        case "周结":
                            data.exchangeType = 1;
                            break;
                        case "月结":
                            data.exchangeType = 2;
                            break;
                    }
                    data.userId = this.$route.query.ids

                    http.post("/back/user/editUser", data, () => {
                        this.$message({
                            type: 'success',
                            message: '提交成功!',
                            duration: 1000
                        });
                        this.userData()
                    })



                    // alert(0)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交！',
                        duration: 1000
                    });
                    this.userData();
                    // this.$refs[formName].resetFields();
                });



        },
        resetForm(formName) {
            // this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
section {
    padding-top: 20px;
}
.spanLine {
    margin: 10 0;
    height: 1px;
    background: #409EFF;
}
</style>
