<template>
<section :style="{width:'40%'}">
    <el-row :style="{paddingTop:'20px',paddingBottom:'20px',paddingLeft:'50px'}">
        <el-col>
            <el-button type="primary" size="mini" @click="returnUserMan"> 返回</el-button>
        </el-col>
    </el-row>
    <el-form size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        </el-form-item>
        <el-form-item label="名称" prop="pushName">
            <el-input type="text" size="mini" v-model="data.pushName"></el-input>
        </el-form-item>
        <!--<el-form-item label="语言" prop="checkList">
            <el-checkbox-group v-model="data.checkList">
                <el-checkbox label="en">英语</el-checkbox>
                <el-checkbox label="ar">阿语</el-checkbox>
                <el-checkbox label="de">德语</el-checkbox>
            </el-checkbox-group>
        </el-form-item>-->
        <!-- <el-form-item label="目标">
            <el-upload :on-success="uploadExcel" on-error="uploadError" class="upload-demo" :limit="1" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" accept=".xlsx, .xls" :file-list="fileLists" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </el-form-item> -->
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
                <el-option v-for="item in sortoptions" :key="item" :label="item" :value="item">
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
    <el-row>
        <el-col :style="{paddingLeft:'100px',paddingTop:'20px'}">
            <el-button @click.stop="changeMessage(true)" size="mini" type="primary">提交</el-button>
            <el-button @click.stop="changeMessage(false)" size="mini" type="primary">重置</el-button>
        </el-col>
    </el-row>
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
        query: "",
        data: {},
        fileLists: [],
        bool: false,
        length: 135,
        list: [],
        options: ["启用", '禁用'],
        sortoptions: ['H5', "通知"],
        total: "",
        listLoading: false,
        dialogVisible: false,
        excelVisible: false,
        palyoptions: ["google play", "ritiri"],

    }),
    created() {
        this.query = this.$route.query.msg;
        this.lists()
    },
    methods: {
        changeMessage(bool) {
            if (bool) {
                let val = Object.assign({}, this.data);
                let _this = this;
                val.returnType = val.returnType === "通知" ? "N" : "H";
                val.endDate = getTimeStap(val.endDate);
                val.createDate = getTimeStap(val.createDate);
                http.post("/back/push/editPush", val, function() {
                    _this.$message({
                        type: 'success',
                        message: '修改成功!',
                        duration: 1000
                    });
                    _this.lists()
                })
            } else {
                // this.$refs.ruleForm2.
                this.lists();
            }

        },
        returnUserMan() {
            this.$router.push("/news/msg?page=" + this.$route.query.page)
        },

        changeval(val) {
            if (val === "H5") {
                this.bool = true;
            } else {
                this.bool = false;
            }
        },
        async lists() {
            this.listLoading = true;
            let _this = this;
            await http.get("/back/push/queryPush/" + this.query, {}, function(data) {
                let dataLists = data.dataInfo;
                dataLists.createDate = new Date(dataLists.createDate);
                dataLists.endDate = new Date(dataLists.endDate);
                dataLists.returnType = dataLists.returnType === "N" ? "通知" : "H5";
                _this.bool = dataLists.returnType === "通知" ? false : true;
                _this.data = dataLists;
                // alert(_this.bool)
            });

            //this.day =
        }

    },
}
</script>
<style lang="scss" scoped>
</style>
