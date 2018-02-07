<template>
<section>
    <!--新建账号 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top: 0px;">
        <el-form :inline="true" :model="account" ref="accountForm" class="demo-form-inline">
            <el-form-item size="mini" label="账号查询" prop="userId">
                <el-input v-model.trim="account.userId" placeholder="输入运营账号"></el-input>
            </el-form-item>
            <el-button size="mini" type="primary" @click="searchAccount" icon="search">查询</el-button>
            <el-button size="mini" type="primary" @click.stop="userdetails" icon="search">新建IM内容</el-button>
        </el-form>
    </el-col>

    <!-- 列表-->
    <el-table border :data="IMList" v-loading="listLoading" @selection-change="selsChange" style="width:100%">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column prop="userId" label="运营账号" width="80"></el-table-column>
        <el-table-column prop="content" label="IM内容" min-width="280">
            <template scope="scope">
            <img v-if="scope.row.type===2"  :src="imgUrl+scope.row.maxPic" :alt="scope.row.maxPic" :style="{width:'30px',height:'30px'}" />
            <span v-if="scope.row.type===1">{{scope.row.content}}</span>
      </template>
        </el-table-column>
        <el-table-column prop="createDate" label="发送时间" min-width="100"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" min-width="100"></el-table-column>
        <!-- <el-table-column prop="sendDate" label="发送时间" min-width="160"></el-table-column> -->
        <el-table-column label="操作" min-width="100">
            <template scope="scope">
                    <el-button type="primary" :disabled="scope.row.jobType==2" size="mini" @click.stop="handleEditPwd(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>

    <!--新增界面lock-scroll title="新建消息" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false"-->
    <el-dialog title="新建消息" size="mini" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <section>
            <el-form size="mini" :rules="addFormrules" :model="addForm" label-width="200" ref="addForm">
                <el-form-item label="发送类型" prop="jobType">
                    <el-radio-group @change="jobTypeChange" v-model="addForm.jobType">
                        <el-radio :label="1">导入运营账号</el-radio>
                        <el-radio :label="2" v-show="isWord">固定任务(新用户发注册发站内信)</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="addForm.jobType==1" label="账号ID" prop="userId">
                    <el-input size="small" placeholder="请输入账号id" v-model="addForm.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="选项：" prop="type">
                    <el-radio-group @change="radioChange" v-model="addForm.type">
                        <el-radio :label="1">文字</el-radio>
                        <el-radio v-if="addForm.jobType==1" :label="2">图片</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内容en" prop="enContent" v-if="ifcontent&&addForm.jobType==2">
                    <el-input size="mini" :maxlength="length" type="textarea" placeholder="请输入内容" v-model="addForm.enContent"></el-input>
                </el-form-item>
                <el-form-item label="内容ar" prop="arContent" v-if="ifcontent&&addForm.jobType==2">
                    <el-input size="mini" :maxlength="length" type="textarea" placeholder="请输入内容" v-model="addForm.arContent"></el-input>
                </el-form-item>
                <el-form-item label="内容ge" prop="geContent" v-if="ifcontent&&addForm.jobType==2">
                    <el-input size="mini" :maxlength="length" type="textarea" placeholder="请输入内容" v-model="addForm.geContent"></el-input>
                </el-form-item>
                <el-form-item label="内容tr" prop="trContent" v-if="ifcontent&&addForm.jobType==2">
                    <el-input size="mini" :maxlength="length" type="textarea" placeholder="请输入内容" v-model="addForm.trContent"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" v-if="ifcontent&&addForm.jobType==1">
                    <el-input size="mini" :maxlength="length" type="textarea" placeholder="请输入内容" v-model="addForm.content"></el-input>
                </el-form-item>
                <el-form-item v-if="ifImg" label="上传高清图片">
                    <el-upload accept=".jpg, .png,.gif,.jpeg" name="pic" :on-success="uploadsuccess1" :on-error="uploadError" :limit="1" class="upload-demo" ref="upload" :action="uploadUrls" :file-list="fileList1" list-type="picture" :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload')">上传到服务器</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item v-if="ifImg" label="上传缩略图片">
                    <el-upload accept=".jpg,.png,.gif,.jpeg" name="pic" :on-success="uploadsuccess2" :on-error="uploadError" :limit="1" class="upload-demo" ref="upload1" :action="uploadUrls" :file-list="fileList2" list-type="picture" :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload1')">上传到服务器</el-button>
                    </el-upload>
                </el-form-item>
                <!--<el-form-item v-if="ifImg" prop="money" label="是否付费">
                    <el-radio-group v-model="addForm.money">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="付费金额(金币)" prop="price" v-if="ifImg">
                    <el-input-number size="mini" :min="0" placeholder="请输入金额" v-model="addForm.price"></el-input-number>
                </el-form-item>
                <el-form-item label="发送时间" prop="createDate">
                    <el-date-picker v-model="addForm.createDate" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-date-picker v-model="addForm.endDate" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </section>

        <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible=false">取消</el-button>
            <el-button type="primary" :disabled="addSubmitDisable" @click.stop="addSubmit">确定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑页面 -->
    <el-dialog title="编辑消息" size="mini" :visible.sync="EditFormVisible" :close-on-click-modal="false">
        <section>
            <el-form size="mini" :model="EditForm" label-width="200" ref="EditForm">

                <!--<el-form-item label="选项：" prop="nk">
                    <el-radio-group @change="radioChange" v-model="EditForm.nk">
                        <el-radio :label="1">文字</el-radio>
                        <el-radio :label="2">图片</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="内容" prop="content" v-if="EditForm.type===1">
                    <el-input size="mini" type="textarea" placeholder="请输入内容" v-model="EditForm.content"></el-input>
                </el-form-item>
                <!--<el-form-item label="内容" prop="content" v-if="EditForm.type===1">
                    <el-input size="mini" type="textarea" placeholder="请输入内容" v-model="EditForm.content"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" v-if="EditForm.type===1">
                    <el-input size="mini" type="textarea" placeholder="请输入内容" v-model="EditForm.content"></el-input>
                </el-form-item>-->
                <el-form-item label="付费金额(金币)" prop="price" v-if="EditForm.type===2">
                    <el-input size="mini" type="number" placeholder="请输入金额" v-model="EditForm.price"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="createDate">
                    <el-date-picker v-model="EditForm.createDate" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-date-picker v-model="EditForm.endDate" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </section>

        <div slot="footer" class="dialog-footer">
            <el-button @click.native="EditFormVisible=false">取消</el-button>
            <el-button type="primary" @click.stop="EditFormsubmit">确定</el-button>
        </div>
    </el-dialog>
</section>
</template>
<script>
import http from '@/api/http';
import {
    dateTime,
    baseUrl,
    uploadUrl,
    getTimeStap
} from '@/common/js/public'
export default {
    data() {
        return {
            length: 240,
            imgUrl: baseUrl,
            addSubmitDisable: false,
            uploadUrls: uploadUrl,
            fileList1: [],
            fileList2: [],
            ifcontent: true,
            isjobTypeChange: true,
            jobtypes: "",
            ifImg: false,
            ifWord: true,
            ifPic: false,
            isWord: true,
            sels: [],
            IMList: [],
            listLoading: false,
            filters: {
                name: ''
            },
            account: {
                userId: '',
            },
            page: 0,
            total: 0,
            pageSize: 15,
            editFormVisible: false, //默认隐藏编辑弹窗
            editLoading: false,
            addFormVisible: false, //新增界面是否显示
            EditFormVisible: false,
            addLoading: false,
            addForm: {
                userId: '',
                type: 1,
                content: "",
                enContent: "",
                arContent: "",
                geContent: "",
                trContent: "",
                minPic: "",
                maxPic: "",
                createDate: "",
                endDate: "",
                price: 0,
                jobType: 1
            },
            addFormrules: {},
            EditForm: {
                endDate: "",
                createDate: ""
            }
        }
    },

    methods: {
        //获取用户列表
        getIMList() {
            this.listLoading = true;
            let _this = this;
            http.get("/back/im/pageQueryIm", {
                offset: this.page,
                limit: this.pageSize,
                userId: this.account.userId
            }, function(ref) {
                let datas = ref.dataInfo.data;
                datas.forEach((val, key) => {
                    datas[key].createDate = dateTime.fulltime(new Date(val.createDate))
                    datas[key].sendDate = dateTime.fulltime(new Date(val.sendDate))
                    datas[key].endDate = dateTime.fulltime(new Date(val.endDate))
                    datas[key].content = val.content.substring(0, 100);
                })

                _this.IMList = datas;
                _this.total = ref.dataInfo.count;
                _this.listLoading = false;
            })
        },
        searchAccount() {
            this.getIMList();
        },
        radioChange(val) {
            //this.$refs.addForm.resetFields();
            if (val === 2) {
                this.ifImg = true;
                this.ifcontent = false;
                this.addForm.content = "";
                this.isWord = false;
            } else {
                this.isWord = true;
                this.ifImg = false;
                this.ifcontent = true;
                this.addForm.minPic = "";
                this.addForm.maxPic = "";
                this.addForm.price = "";
            }
        },
        jobTypeChange(val) {
            //this.$refs.addForm.resetFields();
            if (val === 2) {
                this.isjobTypeChange = false;
                this.addForm.userId = "";
                this.addForm.content = "";
                this.addForm.enContent = "";
                //this.$refs['addForm'].resetFields();
            } else {
                this.isjobTypeChange = true;
                this.addForm.enContent = "";
                this.addForm.arContent = "";
                this.addForm.geContent = "";
                this.addForm.trContent = "";
                //this.$refs['addForm'].resetFields();
            }
        },
        submitUpload(ele) {
            this.$refs[ele].submit();
        },


        //删除
        handleDel(row) {
            this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    this.listLoading = true;
                    let _this = this;
                    http.get("/back/im/deleteIm/" + row.imId, {}, function() {
                        _this.$message({
                            message: '删除成功！',
                            type: 'success',
                            duration: 1000
                        });
                        _this.listLoading = false;
                        _this.getIMList()
                    })
                })
                .catch(() => {
                    this.$message({
                        message: '取消删除！',
                        type: 'info',
                        duration: 1000
                    });
                });
        },
        handleCurrentChange(val) {
            this.page = (val - 1) * this.pageSize;
            this.getIMList();
            console.log(val);
        },

        //新增
        addSubmit: function() {
            this.addLoading = true;
            let _this = this;
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if ((this.addForm.jobType == 1 && this.addForm.userId) || this.addForm.jobType == 2) {
                        let data = Object.assign({}, this.addForm); //getTimeStap
                        if (data.createDate && data.endDate) {
                            this.addSubmitDisable = true;
                        }
                        data.createDate = getTimeStap(data.createDate);
                        data.endDate = getTimeStap(data.endDate);
                        http.post("/back/im/createIm", data, function() {
                            // _this.addLoading =false
                            //NProgress.done();
                            _this.$message({
                                message: '提交成功',
                                type: 'success',
                                duration: 1000
                            });
                            _this.addSubmitDisable = false;
                            // _this.$refs['addForm'].resetFields();
                            _this.addFormVisible = false;
                            _this.addLoading = false;
                            _this.ifImg = false;
                            _this.ifcontent = true;
                            _this.getIMList();
                        })
                    } else {
                        _this.$message({
                            message: '账号ID不能为空',
                            type: 'warning',
                            duration: 1000
                        });
                    }


                }
            });
        },
        selsChange: function(sels) {
            this.sels = sels;
            console.log(sels)
        },
        //批量删除
        batchRemove: function() {

            let ids = this.sels.map(item => item.imId).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    this.listLoading = true;
                    http.post("/back/im/batchDeleteIm", {
                        imId: ids
                    }, () => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getIMList();
                    })
                })
                .catch(() => {

                });
        },

        //新建IM消息
        userdetails() {
            this.addFormVisible = true;

        },
        EditFormsubmit() {
            let data = Object.assign({}, this.EditForm);
            let _this = this;
            data.createDate = getTimeStap(data.createDate);
            data.endDate = getTimeStap(data.endDate);
            http.post("/back/im/editIm", data, function() {
                _this.$message({
                    message: '修改成功!',
                    type: 'success'
                });
                _this.getIMList();
                _this.EditFormVisible = false;
                _this.listLoading = false;
            })
        },
        handleEditPwd(val) {
            this.EditFormVisible = true;
            let that = this
            http.get("/back/im/queryIm/" + val.imId, {}, function(data) {
                data.dataInfo.createDate = new Date(data.dataInfo.createDate);
                data.dataInfo.endDate = new Date(data.dataInfo.endDate);
                that.EditForm = data.dataInfo;
                that.jobtypes = that.EditForm.jobType;
            })
            //this.EditForm = val;


        },
        uploadsuccess1(response, file, fileList) {
            console.log(response)
            if (response.code != 0) {
                this.$message({
                    type: 'error',
                    message: '上传系统异常!',
                    duration: 1000
                });
            } else {
                this.addForm.maxPic = response.dataInfo
                this.$message({
                    type: 'success',
                    message: '上传成功!',
                    duration: 1000
                });
            }

        },
        uploadsuccess2(response, file, fileList) {
            if (response.code != 0) {
                this.$message({
                    type: 'error',
                    message: '上传系统异常!',
                    duration: 1000
                });
            } else {
                this.addForm.minPic = response.dataInfo
                this.$message({
                    type: 'success',
                    message: '上传成功!',
                    duration: 1000
                });
            }

        },
        uploadError() {
            this.$message({
                type: 'error',
                message: '上传失败!',
                duration: 1000
            });
        }

    },

    mounted() {
        this.getIMList();
    },
    watch: {
        addFormVisible() {
            this.fileList1 = [];
            this.fileList2 = [];
            this.$nextTick(() => {
                this.addSubmitDisable = false;
                this.$refs['addForm'].resetFields();
            })
        },
        // addForm: {
        //     handler() {
        //         this.$nextTick(() => {
        //             // console
        //             if (this.addForm.content.length >= 135 || this.addForm.enContent.length >= 135 || this.addForm.arContent.length >= 135 || this.addForm.geContent.length >= 135 || this.addForm.trContent.length >= 135) {
        //                 this.$message({
        //                     type: 'warning',
        //                     message: '内容达到最大长度!',
        //                     duration: 1000
        //                 });
        //             }
        //         })
        //     },
        //     deep: true
        // }
    }
}
</script>

<style scoped>
.demo-form-inline {
    margin-top: 20px;
}

.el-select {
    margin-bottom: 20px;
}

.el-input {
    width: 180px;
}

.el-select .el-input {
    width: 130px;
}
</style>
