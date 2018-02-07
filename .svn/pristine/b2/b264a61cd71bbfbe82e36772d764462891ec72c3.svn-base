<template>
<section>
    <!-- <div :style="{paddingTop:'20px',paddingBottom:'20px'}"></div> -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
        <el-button size="mini" @click.stop="newlyBuild" type="primary">新建</el-button>
    </el-col>
    <el-table v-loading="listLoading" :data="list" show-header border size="mini" style="width: 100%">
        <el-table-column prop="pushName" label="名称" min-width="60">
        </el-table-column>

        <!-- <el-table-column prop="lang" label="语言" width="40">
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="40">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column> -->
        <el-table-column prop="status" label="状态(1未开始2完成)" width="100">
        </el-table-column>
        <el-table-column prop="" label="成功量(点击量)" min-width="100">
            <template scope="scope">
                      <el-button type="text" @click.stop="handiosand(scope.row)">查看</el-button>
                </template>
        </el-table-column>
        <!--<el-table-column prop="zhaung" label="(ios/andorid)" min-width="100">
        </el-table-column>-->
        <el-table-column prop="createDate" label="开始时间" min-width="90">
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间" min-width="90">
        </el-table-column>
        <el-table-column prop="" label="上传excel" min-width="60">
            <template scope="scope">
                          <el-button type="text" @click.stop="handExcel(scope.row)">上传excel</el-button>
                    </template>
        </el-table-column>
        <el-table-column prop="" label="操作" min-width="150">
            <template scope="scope">
             <el-button :disabled="scope.row.status!==1" size="mini" @click.stop="editTable(scope.row)" type="primary">修改</el-button>
              <el-button :disabled="scope.row.status!==1" size="mini" type="primary" @click.stop="deleteTable(scope.row,true)">开始</el-button>
              <!--<el-button size="mini" type="danger" @click.stop="deleteTable(scope.row,false)">删除</el-button>-->
        </template>
        </el-table-column>
    </el-table>
    <el-col>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
    <el-dialog lock-scroll title="新建消息" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <section :style="{overflow:'auto', height:'300px',paddingRight:'20px'}">
            <el-form :rules="addFormRules" size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                </el-form-item>
                <el-form-item label="名称" prop="pushName">
                    <el-input type="text" size="mini" v-model="data.pushName"></el-input>
                </el-form-item>
                <el-form-item label="内容(en)" prop="enMessage">
                    <el-input type="textarea" :maxlength="length" size="mini" v-model="data.enMessage"></el-input>
                </el-form-item>
                <el-form-item label="内容(ar)" prop="arMessage">
                    <el-input type="textarea" :maxlength="length" size="mini" v-model="data.arMessage"></el-input>
                </el-form-item>
                <el-form-item label="内容(ge)" prop="geMessage">
                    <el-input type="textarea" :maxlength="length" size="mini" v-model="data.geMessage"></el-input>
                </el-form-item>
                <el-form-item label="内容(tr)" prop="trMessage">
                    <el-input type="textarea" :maxlength="length" size="mini" v-model="data.trMessage"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="createDate">

                    <el-date-picker size="mini" v-model="data.createDate" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                    <!-- <el-date-picker size="mini" v-model="data.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">

                    <el-date-picker size="mini" v-model="data.endDate" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                    <!-- <el-date-picker size="mini" v-model="data.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
                </el-form-item>

                <el-form-item label="类型" prop="returnType">
                    <el-select @change="changeval" v-model="data.returnType" placeholder="请选择">
                        <el-option v-for="item in sortoptions" :key="item.val" :label="item.val" :value="item.label">
                        </el-option>
                    </el-select>
                    <!-- <el-radio-group  v-model="data.radio2">
            <el-radio label="h5">H5</el-radio>
            <el-radio label="通知">通知</el-radio>
          </el-radio-group> -->
                </el-form-item>
                <el-form-item label="H5地址" v-if="bool" prop="param">
                    <el-input type="text" size="mini" v-model="data.param"></el-input>
                </el-form-item>
            </el-form>
        </section>
        <span slot="footer">
    <el-button @click="dialogVisibls(false)">取 消</el-button>
    <el-button type="primary" :disabled="isDisable" @click="dialogVisibls(true)">确 定</el-button>
    </span>
    </el-dialog>
    <!--accept=".xlsx, .xls"-->
    <el-dialog lock-scroll title="上传表格" :visible.sync="exceldialogVisible" width="50%" :close-on-click-modal="false">
        <el-col :style="{color:'red',padding:'0 0 10px 0'}">注：上传的Excel文件类型为".xls"，格式为第一列为ID，第二列为语言，语言请填数字代号：1表示英语;2表示阿语;3表示德语;4表示土耳其语</el-col>
        <el-upload :headers="uploadheaders" name="file" :on-success="uploadExcel" :on-error="uploadError" class="upload-demo" :limit="1" ref="uploadexcel" :action="exceluploadUrl" accept=".xls" :file-list="fileLists" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取excel</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传excel</el-button>
        </el-upload>
    </el-dialog>
    <el-dialog lock-scroll title="查看点击(成功)量" :visible.sync="iosdialogVisible" width="50%" :close-on-click-modal="false">
        <div>
            点击量：{{iosanData.clickCount}}
        </div>
        <div>
            成功量：{{iosanData.successCount}}
        </div>
    </el-dialog>
</section>
</template>
<script>
import http from '@/api/http'
import {
    dateTime,
    getTimeStap,
    excelUrl
} from "@/common/js/public"
// import uploadExcel from '@/components/UploadExcel/index.vue'
export default {
    components: {
        // uploadExcel
    },
    name: "",
    data() {
        var checkAge = (rule, value, callback) => {
            if (value <= 0) {
                return callback(new Error('礼物价格必须大于0'));
            }
        }
        return {
            fileLists: [],
            exceluploadUrl: "",
            exceldialogVisible: false,
            isDisable: false,
            iosdialogVisible: false,
            iosanData: {},
            uploadheaders: {},
            bool: false,
            length: 135,
            list: [],
            page: 0,
            pageSize: 15,
            total: 0,
            options: ["启用", '禁用'],
            sortoptions: [{
                val: "通知",
                label: "N"
            }, {

                val: 'H5',
                label: "H"
            }],
            listLoading: false,
            dialogVisible: false,
            excelVisible: false,
            palyoptions: ["google play", "ritiri"],
            data: {
                pushName: "",
                returnType: "通知", //单选类型
                enMessage: "",
                arMessage: "",
                geMessage: "",
                trMessage: "",
                createDate: "",
                endDate: "", //选取标准时间
                param: "" //h5选取时的地址
            },
            time1: "",
            time2: '',
            returnTypes: "",
            addFormRules: {
                pushName: [{
                    required: true,
                    message: '请输入名称!',
                    trigger: 'blur'
                }],
                checkList: [{
                    required: true,
                    message: '请选择语言！'
                }],
                address: [{
                    required: true,
                    message: '请选择语言！'
                }]
            }
        }
    },
    created() {
        //do something after creating vue instance
        // config.headers['X-Token'] = token['token'];
        // config.headers['userName'] = token['backUserId'];
        var user = this.$store.state.loginKey || JSON.parse(unescape(sessionStorage.getItem('user')));
        this.uploadheaders = {
            "X-Token": user['token'],
            "userName": user['backUserId']
        }
        // if (this.$route.query.page) {
        //     this.page = this.$route.query.page;
        // }
        this.lists();
    },
    methods: {
        handiosand(val) {
            this.iosdialogVisible = true;
            let _this = this;
            http.get("/back/push/queryPush/" + val.jobId, {}, function(data) {
                _this.iosanData = data.dataInfo;
            })
        },
        handExcel(val) {
            this.exceldialogVisible = true;
            this.exceluploadUrl = excelUrl + "push/upload/" + val.jobId;
            //console.log(this.exceluploadUrl)
        },
        handleCurrentChange(val) {
            this.page = (val - 1) * this.pageSize;
            this.lists();

        },
        uploadError() {
            this.$message({
                type: 'error',
                message: '上传失败!',
                duration: 1000
            })
        },
        submitUpload() {
            this.$refs.uploadexcel.submit();
        },
        uploadExcel(res, file, fileList) {
            this.fileLists = fileList;
            this.$message({
                type: 'success',
                message: '上传成功!',
                duration: 1000
            });
            // alert(JSON.stringify(this.fileLists))
            // console.log(res)
            // console.log(file)
            // console.log(fileList);
        },
        changeval(val) {
            if (val === "N") {
                this.bool = false;
            } else {
                this.bool = true;
            }
        },
        changs(val) {
            if (val === "excel") {
                this.excelVisible = true;
            }
            //console.log(this.data.checkList)
            //  console.log(val)
        },
        selected(val) {
            //val.results.split("")
            if (val) {
                this.$message({
                    type: 'success',
                    message: '上传成功!',
                    duration: 1000
                })
                this.excelVisible = false;
            }
            //console.log(val)
            //  console.log(JSON.stringify(val.results))
        },
        async lists() {
            let _this = this;
            this.listLoading = true;
            await http.get("/back/push/pageQueryPush", {
                offset: this.page,
                limit: this.pageSize
            }, function(data) {

                let resource = data.dataInfo.data;
                resource.forEach((item, key) => {
                    resource[key].createDate = dateTime.fulltime(new Date(item.createDate));
                    resource[key].endDate = dateTime.fulltime(new Date(item.endDate));
                })
                _this.list = resource;
                _this.total = data.dataInfo.count;
                _this.listLoading = false;
            })
        },
        editTable(val) { //编辑
            // console.log(val)
            //  this.list = []
            //
            //alert()
            //  let h = escape(data)
            this.$router.push('/news/msgEdit?msg=' + val.jobId + "&page=" + this.page);
        },
        newlyBuild() { //新建
            this.dialogVisible = true;
        },
        dialogVisibls(val) {
            this.$refs.ruleForm2.validate((valid) => {

                if (val) {
                    if (valid) {
                        this.time1 = this.data.createDate;
                        this.time2 = this.data.endDate;
                        if (this.time1 && this.time2) {
                            this.isDisable = true;
                        }
                        // this.returnTypes = this.data.returnType;
                        let resou = this.data;
                        let _this = this;
                        //N表示通知
                        resou.returnType = this.data.returnType === "通知" ? "N" : "H";
                        resou.createDate = getTimeStap(this.time1);
                        resou.endDate = getTimeStap(this.time2);
                        http.post("/back/push/createPush", resou, function() {
                            _this.$message({
                                type: 'success',
                                message: '新建成功!',
                                duration: 1000
                            });
                            _this.isDisable = false;
                            _this.lists();
                            _this.dialogVisible = false;
                            _this.$refs.ruleForm2.resetFields();
                        })
                    }
                } else {
                    this.$message({
                        type: 'info',
                        message: '取消新建!',
                        duration: 1000
                    });
                    this.dialogVisible = false;
                    this.$refs.ruleForm2.resetFields();
                }
            })
        },
        deleteTable(val, bool) { //删除
            let _this = this;
            if (bool) {
                this.$confirm('确认现在开始吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => { //ajax
                        http.get("/back/push/start/" + val.jobId, {}, function() {
                            _this.$message({
                                type: 'success',
                                message: '成功!',
                                duration: 1000
                            });
                            _this.lists()
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消！',
                            duration: 1000
                        });
                    });
            } else {
                this.$confirm('确认删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => { //ajax
                        //  this.listLoading = true;
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 1000
                        });
                        this.lists()
                        //this.listLoading = true;
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除！',
                            duration: 1000
                        });
                    });
            }

            //    console.log(val)
        },
        limitmessage() {
            this.$message({
                type: 'warning',
                message: '上传文件达到最大!',
                duration: 2000
            });
        },
        submitForm(ele) {
            if (this.data.giftNum > 0) {
                this.$message({
                    type: 'success',
                    message: '提交成功!',
                    duration: 1000
                });
            } else {
                this.$message({
                    type: 'warning',
                    message: '礼物价格必须大于0!',
                    duration: 1000
                });
            }
        },
        resetForm(ele) {
            this.$refs[ele].resetFields();
        }
    },
    watch: {
        data: {
            handler() {
                if (this.data.enMessage.length >= 135 || this.data.arMessage.length >= 135 || this.data.geMessage.length >= 135 || this.data.trMessage.length >= 135) {
                    this.$message({
                        type: 'warning',
                        message: '内容达到最大长度!',
                        duration: 1000
                    });
                }
            },
            deep: true
        },
        exceldialogVisible() {
            this.fileLists = [];
        },
        dialogVisible() {
            this.$nextTick(() => {
                this.isDisable = false;
            })
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
