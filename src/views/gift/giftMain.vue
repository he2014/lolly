<template>
<section>
    <!-- <div :style="{paddingTop:'20px',paddingBottom:'20px'}"></div> -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
        <el-button size="mini" @click.stop="newlyBuild" type="primary">新建</el-button>
        <el-button :style="{float:'right',marginRight:'50px'}" size="mini" @click.stop="refreshBuild" type="primary">刷新</el-button>
    </el-col>
    <el-table v-loading="listLoading" :data="list" show-header border size="mini" style="width: 100%">
        <el-table-column prop="giftId" label="ID" width="80">
        </el-table-column>
        <el-table-column prop="giftName" label="名称" width="80">
        </el-table-column>
        <el-table-column prop="giftMinPic" label="礼物图">
            <template scope="scope">
          <img :src="imgUrl+scope.row.giftMinPic" />
       </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
        </el-table-column>
        <el-table-column prop="giftStatus" label="状态">
        </el-table-column>
        <el-table-column prop="" label="操作" width="160">
            <template scope="scope">
           <el-button size="mini" @click.stop="editTable(scope.row)" type="primary">修改</el-button>
            <el-button size="mini" type="danger" @click.stop="deleteTable(scope.row)">删除</el-button>
       </template>
        </el-table-column>
    </el-table>
    <el-col>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
    <el-dialog title="新建礼物" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
        <section :style="{overflow:'auto', height:'300px',paddingRight:'20px'}">
            <el-col :style="{color:'red'}">小图</el-col>
            <el-upload accept=".jpg,.png,.gif,.jpeg" name="pic" size="mini" ref="upload1" :auto-upload="false" :on-success="uploadsuccess1" :on-error="uploadError" :on-exceed="limitmessage" class="upload-demo" :action="uploadUrls" :limit="1" :file-list="fileList1"
                list-type="picture">
                <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload('upload1')">上传到服务器</el-button>
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <el-row>
                <el-col>
                    <p class="spanLine"></p>
                </el-col>
            </el-row>
            <el-col :style="{color:'red'}">大图</el-col>
            <el-upload accept=".jpg, .png,.gif" name="pic" ref="upload2" :auto-upload="false" :on-success="uploadsuccess2" :on-error="uploadError" :on-exceed="limitmessage" class="upload-demo" :action="uploadUrls" :limit="1" :file-list="fileList2" list-type="picture">
                <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload('upload2')">上传到服务器</el-button>
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <el-row>
                <el-col>
                    <p class="spanLine"></p>
                </el-col>
            </el-row>
            <el-form :rules="addFormRules" size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="礼物名称" prop="giftName">
                    <el-input type="text" v-model="data.giftName"></el-input>
                </el-form-item>
                <el-form-item label="礼物价格" prop="price">
                    <el-input-number :min="0" :max="100000000" v-model="data.price"></el-input-number>
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
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker :default-value="defaultDate" v-model="data.endTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="排序" prop="giftNo">
                    <el-input type="text" v-model="data.giftNo"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>-->
                </el-form-item>
            </el-form>
        </section>
        <span slot="footer">
    <el-button @click="dialogVisibl(false)">取 消</el-button>
    <el-button type="primary" @click="dialogVisibl(true)">确 定</el-button>
    </span>

    </el-dialog>

</section>
</template>
<script>
// import {
//     gitfList
// } from '@/api/api'
import {
    dateTime,
    baseUrl,
    uploadUrl,
    getTimeStap
} from '@/common/js/public'
import http from '@/api/http'
export default {
    name: "",
    data() {
        return {
            defaultDate: new Date(),
            imgUrl: baseUrl,
            uploadUrls: uploadUrl,
            bool: false,
            total: 50,
            pageSize: 15,
            page: 0,
            list: [],
            fileList1: [], //ios小图
            fileList2: [], //ios大图
            fileList3: [], //andorid小图
            fileList4: [], //andorid大图
            options: ["启用", '禁用'],
            listLoading: false,
            dialogVisible: false,
            data: {
                giftName: "",
                price: 0,
                giftStatus: "启用",
                giftNo: "",
                startTime: "",
                endTime: "",
                minPic: "",
                webResource: ""
            },
            addFormRules: {
                giftName: [{
                    required: true,
                    message: '请输入名称!',
                    trigger: 'blur'
                }],
                giftNo: [{
                    required: true,
                    message: '请输入排序!',

                }],
                endTime: [{
                    required: true,
                    message: '请输入结束时间!',

                }],
                startTime: [{
                    required: true,
                    message: '请输入开始时间!',

                }],
                // giftNum: [{
                //   required: true,
                //   message: '请输入名称!',
                //   trigger: 'blur'
                // }],

            }
        }
    },
    created() {
        //do something after creating vue instance
        // giftListall({
        //     offset: 1,
        //     limit: 20
        // }).then((ref) => {
        //     console.log(ref)
        // })
        // if (this.$route.query.page) {
        //     this.page = this.$route.query.page;
        // }
        this.http()
        //this.lists();
        //console.log(dateTime.showtime(new Date(1510128082000)))
    },
    methods: {
        refreshBuild() {
            http.get("/back/gift/clearCache", {}, () => {
                this.$message({
                    type: 'success',
                    message: '刷新成功!',
                    duration: 1000
                });
            })
        },
        http() {
            this.listLoading = true;
            http.get("/back/gift/listQueryGift", {
                offset: this.page,
                limit: this.pageSize
            }, this.success)
        },
        success(data) {
            this.listLoading = false;
            let result = data.dataInfo.data
            result.forEach((item, key) => {
                //giftStatus
                result[key]['createTime'] = dateTime.showtime(new Date(item['createTime']))
                result[key]['endTime'] = dateTime.fulltime(new Date(item['endTime']))
                result[key]['startTime'] = dateTime.fulltime(new Date(item['startTime']))
                result[key]['giftStatus'] = item['giftStatus'] === 0 ? "启用" : "禁用"
            })
            this.list = data.dataInfo.data;
            this.total = data.dataInfo.count;
        },
        handleCurrentChange(val) {
            //alert(val)
            this.page = (val - 1) * this.pageSize;
            this.http();
        },
        editTable(val) { //编辑
            this.$router.push('/operate/giftedit?msg=' + val.giftId + "&page=" + this.page)
        },
        newlyBuild() { //新建
            this.dialogVisible = true;
        },
        dialogVisibl(val) {
            if (val) {
                if (this.fileList1.length > 0 && this.fileList2.length > 0) {
                    this.$refs.ruleForm2.validate((valid) => {
                        if (valid) {
                            if (this.data.price >= 0) {
                                let _this = this;
                                let data = Object.assign({}, this.data);
                                data.giftStatus = this.data.giftStatus === "启用" ? 0 : 1;
                                data.endTime = getTimeStap(this.data.endTime);
                                data.startTime = getTimeStap(this.data.startTime);
                                http.post("/back/gift/createGift", data, function() {
                                    _this.$message({
                                        type: 'success',
                                        message: '新建成功!',
                                        duration: 1000
                                    });
                                    _this.$refs.ruleForm2.resetFields();
                                    _this.dialogVisible = false;
                                    _this.http();
                                })

                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '礼物价格必须大于0!',
                                    duration: 1000
                                });
                            }
                        }
                    })

                    //this.fileList2 = [];
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请上传礼物图片!',
                        duration: 1000
                    });
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
        },
        deleteTable(val) { //删除
            //console.log(val)
            this.$confirm('确认提交此次操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(() => { //ajax
                    //  this.listLoading = true;
                    http.get("/back/gift/deleteGift/" + val.giftId, {}, this.deleteTablesuccess)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除',
                        duration: 1000
                    });
                });
        },
        deleteTablesuccess(data) {
            this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 1000
            });
            this.http();
        },
        limitmessage() {
            this.$message({
                type: 'warning',
                message: '上传文件达到最大!',
                duration: 2000
            });
        },
        uploadError() {
            this.$message({
                type: 'error',
                message: '上传失败!',
                duration: 1000
            });
        },
        uploadsuccess1(response, file, fileList) {
            if (response.code != 0) {
                this.$message({
                    type: 'error',
                    message: '上传系统异常!',
                    duration: 1000
                });
            } else {
                this.data.minPic = response.dataInfo;
                this.fileList1 = fileList;
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
                this.data.webResource = response.dataInfo;
                this.fileList2 = fileList;
                this.$message({
                    type: 'success',
                    message: '上传成功!',
                    duration: 1000
                });
            }

        },
        uploadsuccess3(response, file, fileList) {
            this.fileList3 = fileList;
            this.$message({
                type: 'success',
                message: '上传成功!',
                duration: 1000
            });
        },
        uploadsuccess4(response, file, fileList) {
            this.fileList4 = fileList;
            this.$message({
                type: 'success',
                message: '上传成功!',
                duration: 1000
            });
        },
        submitUpload(ele) {
            //console.log(ele)
            this.$refs[ele].submit();
        }

    },
    watch: {
        dialogVisible() {
            this.fileList1 = [];
            this.fileList2 = [];
            this.fileList3 = [];
            this.fileList4 = [];
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
img {
    width: 40px;
    height: 40px;
}
</style>
