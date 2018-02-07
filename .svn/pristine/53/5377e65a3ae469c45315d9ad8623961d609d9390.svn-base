<template>
<section>
    <div :style="{paddingTop:'20px',paddingBottom:'20px'}">
        <el-button type="primary" size="mini" @click="returnUser">返回</el-button>
    </div>
    <div>
        <el-date-picker :picker-options="pickerOptions" v-model="date" @change="dateChange" type="daterange" range-separator="一" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <!-- <div>查询时间段收入总数</div> -->
    </div>
    <el-table show-summary :data="tabelData2" border style="width: 100%">
        <el-table-column prop="incomeMonth" label="结算日期(日结算)" width="180">
        </el-table-column>
        <el-table-column prop="onlineTime" label="视频时长(秒)" width="180">
        </el-table-column>
        <el-table-column prop="timeBalance" label="视频收入">
        </el-table-column>
        <el-table-column prop="giftBalance" label="礼物收入">
        </el-table-column>
        <el-table-column prop="photoBalance" label="照片收入">
        </el-table-column>
        <!--<el-table-column prop="allNum" label="总收入">
        </el-table-column>-->
    </el-table>
</section>
</template>
<script>
import http from '@/api/http'
import {
    getTimeStap,
    dateTime
} from '@/common/js/public'
export default {
    data() {
        return {
            tabelData2: [],
            date: '',
            userID: "",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    created() {
        this.userID = this.$route.query.ids;
    },
    methods: {
        returnUser() {
            this.$router.push('/user/userManage?page=' + this.$route.query.page)
        },
        dateChange(file) {
            //得到选取的时间的时间戳
            if (file) {
                let startTime = getTimeStap(file[0]);
                let endTime = getTimeStap(file[1]);
                http.get("/back/user/queryReceive", {
                    userId: this.$route.query.ids,
                    startTime: startTime,
                    endTime: endTime
                }, (data) => {
                    let datas = data.dataInfo;
                    datas.forEach((item, key) => {
                        datas[key].createTime = dateTime.showtime(new Date(item.createTime))
                    })

                    this.tabelData2 = datas;
                })
            }
            //this.tabelData2 = [];


        }
    },
    mounted() {

        // gitfNumber()
        //     .then((msg) => {
        //         this.tabelData1.push(msg.data.data);
        //         //console.log(msg)
        //     })

    },
    watch: {

    }
};
</script>

<style lang="scss" scoped>
div {}
</style>
