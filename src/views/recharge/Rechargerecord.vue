<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
        <span style="float:left;padding-right: 10px;">查询方式</span>
        <!-- <span style="float:left;">
            <el-select v-model="value" placeholder="请选择查询方式" size="mini" @change="changeValue">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </span> -->
        <span style="padding-left: 10px;float:left;">
            <span style="float:left;"><el-input v-model="userId" size="mini" placeholder="请输入用户id"></el-input></span>
        <span style="float:left;"><el-select v-model="paymentType"  placeholder="选择平台类型" size="mini">
                <el-option v-for="item in paymentTypeoption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select></span>
        <span style="float:left;"><el-date-picker size="mini" @blur="pickerblur"  v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker></span>

        </span>
        <span style="padding-left: 10px;float:left;">
            <el-button type="primary" size="mini" @click="searchValue">查询</el-button>
        </span>

    </el-col>
    <el-col :span="24">
        <el-table :data="data" style="width: 100%" border v-loading="listLoading">
            <el-table-column prop="userId" label="用户ID" width="80">
            </el-table-column>
            <el-table-column prop="money" label="金额(美分)">
            </el-table-column>
            <el-table-column prop="balance" label="代币数">
            </el-table-column>
            <el-table-column prop="returnBalance" width="60" label="返币数">
            </el-table-column>
            <el-table-column prop="paymentProductId" label="支付充值产品id">
            </el-table-column>
            <el-table-column prop="paymentType" label="支付类型" mini-width="120">
            </el-table-column>
            <el-table-column prop="rechargeSerialId" label="充值流水" min-width="150">
            </el-table-column>
            <el-table-column prop="promoted" label="是否使用优惠券">
            </el-table-column>
            <el-table-column prop="couponDefineId" label="优惠券ID" width="50">
            </el-table-column>
            <el-table-column prop="rechargeTime" label="充值时间" min-width="120">
            </el-table-column>
        </el-table>
    </el-col>
    <el-col :span="24" class="toolbar">
        <!--    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
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
        total: 10,
        pageSize: 20,
        page: 0,
        paymentType: '',
        userId: '',
        startTime: '',
        endTime: '',
        data: [],
        date: '',
        value: '',
        isTime: false,
        ispaymentType: false,
        isUserId: false,
        options: [{
            label: '用户id',
            value: 1,
        }, {
            label: '支付平台',
            value: 2,
        }, {
            label: '时间',
            value: 3
        }],
        paymentTypeoption: [{
            label: 'GOOGLE_IAB',
            value: 1
        }, {
            label: 'IOS_IAP',
            value: 2
        }, {
            label: "PAYMENTWALL",
            value: 3
        }, {
            label: 'GPAY',
            value: 4
        }, {
            label: "全部",
            value: ""
        }]
    }),
    mounted() {
        //do something after mounting vue instance
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
        changeValue(val) {
            switch (val) {
                case 1:
                    this.isUserId = true;
                    this.ispaymentType = false;
                    this.isTime = false;
                    this.paymentType = "";
                    this.startTime = "";
                    this.endTime = "";
                    this.date = "";
                    break;
                case 2:
                    this.isUserId = false;
                    this.ispaymentType = true;
                    this.isTime = false;
                    // this.paymentType ="";
                    this.userId = "";
                    this.startTime = "";
                    this.endTime = "";
                    this.date = ''
                    break;
                case 3:
                    this.isUserId = false;
                    this.ispaymentType = false;
                    this.isTime = true;
                    this.paymentType = "";
                    this.userId = "";
                    break;
            }

        },
        handleCurrentChange(val) {
            this.page = (val - 1) * this.pageSize;
            this.list();
        },
        async list() {
            this.listLoading = true;
            await http.get("/back/recharge/pqrh", {
                offset: this.page,
                limit: this.pageSize,
                paymentType: this.paymentType,
                userId: this.userId,
                startTime: this.startTime,
                endTime: this.endTime
            }, (data) => {
                this.total = data.dataInfo.count;
                let list = data.dataInfo.data;
                list.forEach((item, key) => {
                    switch (item.paymentType) {
                        case 1:
                            list[key]['paymentType'] = 'GOOGLE_IAB';
                            break;
                        case 2:
                            list[key]['paymentType'] = 'IOS_IAP';
                            break;
                        case 3:
                            list[key]['paymentType'] = 'PAYMENTWALL';
                            break;
                        case 4:
                            list[key]['paymentType'] = 'GPAY';
                            break;
                    }
                    list[key]['rechargeTime'] = dateTime.fulltime(new Date(item.rechargeTime))
                    if (item['promoted']) {
                        list[key]['promoted'] = "是"
                    } else {
                        list[key]['promoted'] = "否"
                    }
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
