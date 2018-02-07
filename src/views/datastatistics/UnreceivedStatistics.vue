<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
        <span style="float:left;padding-right: 10px;padding-top: 5px;">主播ID</span>
        <span style="padding-left: 10px;float:left;">
            <span style="float:left;"><el-input v-model="hostId" size="mini" placeholder="请输入主播id"></el-input></span>
        <span style="float:left;padding-left: 10px;"><el-date-picker size="mini" @blur="pickerblur"  v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker></span>
        </span>
        <span style="padding-left: 10px;float:left;">
            <el-button type="primary" size="mini" @click="searchValue">查询</el-button>
        </span>
    </el-col>
    <el-col :span="24">
        <el-table :data="data" style="width: 100%" border v-loading="listLoading">
            <el-table-column prop="createTime" label="时间">
            </el-table-column>
            <el-table-column prop="hostId" label="主播ID">
            </el-table-column>
            <el-table-column label="操作" min-width="150" align="left">
                <template scope="scope">
                <el-button type="primary" v-show="scope.row.identity!=='用户'"  @click.stop="userOnlineChange(scope.row)" size="mini">查看在线状态</el-button>
    				</template>
            </el-table-column>
        </el-table>
    </el-col>
    <el-col :span="24" class="toolbar">
        <!--    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
    <el-dialog custom-class="addForm" title="在线状态" size="mini" :visible.sync="userOnlinevisible" :close-on-click-modal="false">
        <!-- <el-form :model="userOnline" size="mini">
            <el-form-item label="状态" prop="ot"> -->
        <div>在线状态(<span :style="{color:'red'}">0空闲;1在聊;2勿扰</span>)：{{userOnline.ot}}</div>
        <!-- </el-form-item>
        </el-form> -->

    </el-dialog>
</section>
</template>
<script>
import http from '@/api/http';
import {
    dateTime,
    getTimeStap
} from "@/common/js/public"
export default {
    data: () => ({
        listLoading: false,
        userOnlinevisible: false,
        total: 10,
        pageSize: 20,
        page: 0,
        paymentType: '',
        hostId: '',
        startTime: '',
        endTime: '',
        data: [],
        date: '',
        value: '',
        userOnline: { //在线状态
            hostId: "",
            ot: ''
        },
        userOnlineOptions: [{
            label: "空闲",
            value: 0
        }, {
            label: "在聊",
            value: 1
        }, {
            label: "勿扰",
            value: 2
        }]
    }),
    mounted() {
        this.list();
    },
    methods: {
        pickerblur(val) {
            // console.log(val)
            // alert(1)
        },
        searchValue() {
            // console.log()
            if (this.date) {
                this.startTime = getTimeStap(this.date[0]);
                this.endTime = getTimeStap(this.date[1]);
            } else {
                this.startTime = "";
                this.endTime = "";
            }
            this.list();

        },

        handleCurrentChange(val) {
            this.page = (val - 1) * this.pageSize;
            this.list();
        },
        userOnlineChange(row) {
            this.userOnlinevisible = true;
            this.userOnline.hostId = row.hostId;
            http.get("/back/user/queryUser/" + row.hostId, {}, (data) => {

                this.userOnline.ot = data.dataInfo.ot
            })
        },
        // submitUserOnline() {
        //     if (!this.isOnline) {
        //         this.userOnlinevisible = false;
        //     } else {
        //         http.post("/back/user/changeStatus/" + this.userOnline.hostId, {
        //             ot: this.userOnline.ot
        //         }, () => {
        //             this.$message({
        //                 message: '在线状态变更成功！',
        //                 type: 'success',
        //                 duration: 1000
        //             });
        //             this.userOnlinevisible = false;
        //             this.list();
        //             this.isOnline = false;
        //         })
        //     }
        // },
        onlineChange() {
            this.isOnline = true;
        },
        async list() {
            this.listLoading = true;
            await http.get("/back/record/pquh", {
                offset: this.page,
                limit: this.pageSize,
                hostId: this.hostId,
                startTime: this.startTime,
                endTime: this.endTime
            }, (data) => {
                this.total = data.dataInfo.count;
                let list = data.dataInfo.data;
                list.forEach((item, key) => {
                    list[key]['createTime'] = dateTime.fulltime(new Date(item.createTime))
                })
                this.listLoading = false;
                this.data = list;
                //console.log(list)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-table {
    font-size: 12px !important;
}
</style>
