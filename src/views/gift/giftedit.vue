<template>
<section>
    <div :style="{paddingTop:'20px',paddingBottom:'20px'}">
        <el-button type="primary" size="mini" @click="returnUser">返回</el-button>
    </div>
    <div :style="{width:'30%'}">
        <el-form v-loading="listLoading" size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="礼物名称" prop="giftName">
                <el-input type="text" v-model="data.giftName"></el-input>
            </el-form-item>
            <el-form-item label="礼物价格" prop="price">
                <el-input-number :min="1" :max="100000000" v-model="data.price"></el-input-number>
            </el-form-item>
            <el-form-item label="礼物状态" prop="giftStatus">
                <el-select v-model="data.giftStatus" placeholder="请选择">
                    <el-option v-for="item in options" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker :default-value="defaultDate" v-model="data.startTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item :default-value="defaultDate" label="结束时间" prop="endTime">
                <el-date-picker v-model="data.endTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="排序" prop="giftNo">
                <el-input type="text" v-model="data.giftNo"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</section>
</template>
<script>
import http from '@/api/http'
import {
    dateTime,
    getTimeStap
} from '@/common/js/public'
export default {
    name: "",
    data: () => ({
        defaultDate: new Date(),
        data: {
            startTime: "",
            endTime: ""
        },
        giftId: "",
        listLoading: false,
        options: ["启用", "禁用"],
        sort: 1,
    }),
    created() {
        this.giftId = this.$route.query.msg;
    },
    mounted() {
        //console.log(http)
        this.getGift();
    },
    methods: {
        getGift() {
            this.listLoading = true;
            http.get("/back/gift/queryGift/" + this.giftId, {}, this.getGiftData)
        },
        getGiftData(data) {
            if (data.code === 0) {
                let resource = data.dataInfo;
                resource.startTime = new Date(resource.startTime);
                resource.endTime = new Date(resource.endTime);
                resource.giftStatus = resource.giftStatus === 0 ? "启用" : "禁用";
                this.data = resource;
                this.listLoading = false;
            }
        },
        returnUser() {
            this.$router.push("/operate/gift?page=" + this.$route.query.page);
        },
        submitForm(form) {
            this.$confirm('确认提交吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => {
                    let data = Object.assign({}, this.data);
                    data.giftStatus = this.data.giftStatus === "启用" ? 0 : 1;
                    data.startTime = getTimeStap(data.startTime);
                    data.endTime = getTimeStap(data.endTime);
                    // console.log(this.data)

                    http.post("/back/gift/editGift", data, this.updateGift)

                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消提交！',
                        duration: 1000
                    });
                    this.getGift();
                });
        },
        updateGift(data) {
            this.$message({
                type: 'success',
                message: '提交成功!',
                duration: 1000
            });
            this.getGift();
        },
        resetForm() {
            this.getGift()
        }
    }

}
</script>
<style lang="scss" scoped>
div {}
</style>
