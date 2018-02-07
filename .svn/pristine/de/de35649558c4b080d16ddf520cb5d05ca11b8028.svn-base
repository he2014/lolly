<template>
<section>
    <!-- <div :style="{paddingTop:'20px',paddingBottom:'20px'}"></div> -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
        <!--text-align: center;-->
        <el-col :span="2" style="text-align: center;">查询方式</el-col>
        <el-select size="mini" v-model="sertchvalue" placeholder="请选择">
            <el-option v-for="item in sertchOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-button size="mini" @click.stop="sertchChange" type="primary">查询</el-button>
        <el-button size="mini" @click.stop="newlyBuild" type="primary">新建</el-button>
        <el-button size="mini" @click.stop="refresh" type="primary">刷新</el-button>
        </el-button>
    </el-col>
    <el-col :span="24" :style="{paddingBottom: '10px',color:'red'}">
    </el-col>
    <el-table name="tables" v-loading="listLoading" :data="list" border size="mini" style="width: 100%">
        <el-table-column prop="paymentType" label="渠道" min-width="80">
        </el-table-column>
        <el-table-column prop="paymentProductId" label="商城代码" min-width="100">
        </el-table-column>
        <el-table-column prop="money" label="金额(单位：美分)" min-width="100">
        </el-table-column>
        <el-table-column prop="balance" label="金币">
        </el-table-column>
        <el-table-column prop="returnBalance" label="返币额度" width="80">
        </el-table-column>
        <el-table-column prop="desc" min-width="100" label="描述">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="50">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template scope="scope">
           <el-button size="mini" @click.stop="editTable(scope.row)" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click.stop="deleteTable(scope.row)">删除</el-button>
       </template>
        </el-table-column>
    </el-table>
    <el-dialog title="充值新建" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
        <el-form :rules="addFormRules" size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="渠道" prop="paymentType">
                <el-select v-model="data.paymentType" placeholder="请选择渠道">
                    <el-option v-for="item in palyoptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商城代码" prop="paymentProductId">
                <el-input type="text" placeholder="请输入商城代码" v-model="data.paymentProductId"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="text" placeholder="请输入描述内容" v-model="data.desc"></el-input>
            </el-form-item>
            <el-form-item label="金额(美分)" prop="money">
                <el-input-number :min="1" v-model="data.money"></el-input-number>
            </el-form-item>
            <el-form-item label="金币" prop="balance">
                <el-input-number :min="1" v-model="data.balance"></el-input-number>
            </el-form-item>
            <el-form-item label="返币额度" prop="returnBalance">
                <el-input-number :min="0" v-model="data.returnBalance"></el-input-number>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="data.status" placeholder="请选择状态">
                    <el-option v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer">
    <el-button @click="dialogVisibl(false)">取 消</el-button>
    <el-button type="primary" @click="dialogVisibl(true)">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog title="状态编辑" :visible.sync="editState" width="30%">
        <el-select v-model="nowState" @change="stateChange" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
    <el-button @click="editState = false">取 消</el-button>
    <el-button type="primary" @click="submitEdit">确 定</el-button>
  </span>
    </el-dialog>
</section>
</template>
<script>
import http from '@/api/http'
import {
    dateTime
} from '@/common/js/public'
export default {
    data() {
        return {
            list: [],
            sertchOption: [{
                label: "GOOGLE_IAB",
                value: 1
            }, {
                label: "IOS_IAP",
                value: 2,
            }, {
                label: 'PAYMENTWALL',
                value: 3
            }, {
                label: 'GPAY',
                value: 4
            }],
            sertchvalue: "",
            listLoading: false,
            dialogVisible: false,
            stateChanged: false,
            editState: false, //编辑
            nowState: "",
            shopId: "",
            options: [{
                label: "启用",
                value: 0
            }, {
                label: '禁用',
                value: 1
            }],
            statusoptions: [{
                label: "启用",
                value: 0
            }, {
                label: '禁用',
                value: 1
            }],
            data: { //新建
                paymentType: 'GOOGLE_IAB',
                paymentProductId: '',
                balance: '',
                returnBalance: '',
                money: '',
                desc: '',
                status: '启用'
            },
            palyoptions: [{ //
                label: "GOOGLE_IAB",
                value: 1
            }, {
                label: "IOS_IAP",
                value: 2,
            }, {
                label: 'PAYMENTWALL',
                value: 3
            }, {
                label: 'GPAY',
                value: 4
            }],
            addFormRules: {
                // paymentType: [{
                //     required: true,
                //     message: '请选择充值渠道',
                //     type: 'number',
                //     trigger: 'blur',
                //
                // }],
                paymentProductId: [{
                    required: true,
                    message: '请输入商城代码',
                    trigger: 'blur'
                }],
                desc: [{
                    required: true,
                    message: '请输入描述内容',
                    trigger: 'blur'
                }],
                // status: [{
                //     required: true,
                //     message: '请选择状态',
                //     type: 'number',
                //     trigger: 'blur',
                //
                // }],

            }
        }
    },
    mounted() {
        //do something after creating vue instance
        this.lists();
        //this.payType()
    },
    methods: {
        async lists() {
            this.listLoading = true;
            await http.get("/back/recharge/listQueryRecharge", {}, (msg) => {
                let data = msg.dataInfo;
                //渠道：1代表GOOGLE_IAB;2代表IOS_IAP;3代表PAYMENTWALL;4代表GPAY;
                data.forEach((item, key) => {
                    switch (item['paymentType']) {
                        case 1:
                            data[key].paymentType = 'GOOGLE_IAB';
                            break;
                        case 2:
                            data[key].paymentType = 'IOS_IAP';
                            break;
                        case 3:
                            data[key].paymentType = 'PAYMENTWALL';
                            break;
                        case 4:
                            data[key].paymentType = 'GPAY';
                            break;
                    }
                    data[key].createTime = dateTime.showtime(new Date(item.createTime));
                    data[key].status = item.status == 0 ? "启用" : "禁用"
                })
                this.list = data;
                this.listLoading = false;
                //    console.log(msg)
            })


        },
        // async payType() {
        //     await http.get("/back/recharge/listAllPT", {}, (data) => {
        //         console.log(data)
        //     })
        // },
        searchData() {
            this.listLoading = true;
            http.get("/back/recharge/listQueryRecharge", {
                paymentType: this.sertchvalue
            }, (msg) => {
                let data = msg.dataInfo;
                //渠道：1代表GOOGLE_IAB;2代表IOS_IAP;3代表PAYMENTWALL;4代表GPAY;
                data.forEach((item, key) => {
                    switch (item['paymentType']) {
                        case 1:
                            data[key].paymentType = 'GOOGLE_IAB';
                            break;
                        case 2:
                            data[key].paymentType = 'IOS_IAP';
                            break;
                        case 3:
                            data[key].paymentType = 'PAYMENTWALL';
                            break;
                        case 4:
                            data[key].paymentType = 'GPAY';
                            break;
                    }
                    data[key].createTime = dateTime.showtime(new Date(item.createTime))
                    data[key].status = item.status == 0 ? "启用" : "禁用"
                })
                this.list = data;
                this.listLoading = false;
            })
        },
        sertchChange() {
            if (this.sertchvalue) {
                this.searchData();
            } else {
                this.$message({
                    type: 'warning',
                    message: '请选择查询条件!',
                    duration: 1000
                });
            }
        },
        stateChange(val) {
            this.stateChanged = true;
        },
        editTable(val) { //编辑
            this.editState = true;
            this.nowState = val.status;
            //console.log(val)
            this.shopId = val.localProductId
        },
        submitEdit() {
            if (this.stateChanged) {
                http.post("/back/recharge/erp", {
                    localProductId: this.shopId,
                    status: this.nowState
                }, () => {
                    if (this.sertchvalue) {
                        this.searchData();
                    } else {
                        this.lists();
                    }
                    this.$message({
                        type: 'success',
                        message: '状态更改成功!',
                        duration: 1000
                    });
                    this.editState = false;
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: '状态未改变，不能提交!',
                    duration: 1000
                });
            }
        },
        newlyBuild() { //新建
            this.dialogVisible = true;
        },
        dialogVisibl(val) {
            this.$refs.ruleForm2.validate((valid) => {
                if (val) {
                    if (valid) {
                        let data = this.data;
                        if (data.paymentType == 'GOOGLE_IAB') {
                            data.paymentType = 1;
                        }
                        if (data.status == '启用') {
                            data.status = 0;
                        }
                        http.post("/back/recharge/crp", data, () => {
                            this.$message({
                                type: 'success',
                                message: '新建成功!',
                                duration: 1000
                            });
                            if (this.sertchvalue) {
                                this.searchData();
                            } else {
                                this.lists()
                            }
                            this.dialogVisible = false;
                            this.$refs.ruleForm2.resetFields();

                        })
                    }
                } else {
                    this.$message({
                        type: 'info',
                        message: '取消新建!',
                        duration: 1000
                    });
                    this.dialogVisible = false;
                    // this.$refs.ruleForm2.resetFields();
                }


            })

        },
        deleteTable(val) { //删除
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => { //ajax
                //  this.listLoading = true;
                //localProductId
                http.post('/back/recharge/drp/' + val.localProductId, {}, () => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        duration: 1000
                    });
                    if (this.sertchvalue) {
                        this.searchData();
                    } else {
                        this.lists()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除',
                    duration: 1000
                });
            });
            console.log(val)
        },
        refresh() {
            http.get('/back/recharge/cc', {}, () => {
                this.$message({
                    type: 'success',
                    message: '刷新成功！',
                    duration: 1000
                });
            })
        }

    },
    watch: {
        dialogVisibl() {
            this.$refs.ruleForm2.resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.spanLine {

    margin: 10px 0;
    background-color: #409EFF;
    height: 1px;
}
</style>
