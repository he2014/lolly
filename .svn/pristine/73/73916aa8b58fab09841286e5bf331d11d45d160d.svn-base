<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
        <el-button type="primary" size="mini" @click="buildBanners">新建</el-button>
    </el-col>
    <el-col :span="24">
        <el-table :data="list" style="width: 100%" border v-loading="listLoading">
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
    <el-dialog size="mini" :visible.sync="isBanner" title="新建Banner">
        <el-form size="small" :model="addBanner" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="banner类型" prop="select">
                <el-select v-model="addBanner.select" placeholder="请选择">
                    <el-option v-for="item in addOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传banner" prop="imageUrl">
                <el-upload class="avatar-uploader" name="pic" accept=".jpg, .png, .jegp, .git" drag :action="uploadUrls" :show-file-list="false" :on-error="uploadError" :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                    <div class="uploadText">
                        <div class="uploadTextPop"></div>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" :style="{color:'#409EFF'}">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" v-show="!imageUrl" slot="tip" :style="{color:'red'}">只能上传jpg/png/jegp/git文件</div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input-number v-model="addBanner.sort" :min="1" :max="1000000"></el-input-number>
            </el-form-item>
            <el-form-item label="h5活动链接" prop="url" v-show="addBanner.select===2">
                <el-input v-model="addBanner.url" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startDate">
                <el-date-picker v-model="addBanner.startDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endDate">
                <el-date-picker v-model="addBanner.endDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  size="mini" @click.stop="isBanner=false">取消</el-button>
            <el-button type="primary" size="mini" @click.stop="submitBanner">确定</el-button>
        </span>
    </el-dialog>
</section>
</template>
<script>
import http from '@/api/http';
//   banner 在路由中被隐藏掉了！
import {
    dateTime,
    getTimeStap,
    uploadUrl,
} from "@/common/js/public"
export default {
    name: "",
    data: () => ({
        imageUrl: "",
        listLoading: false,
        isBanner: false,
        list: [],
        uploadUrls: uploadUrl,
        addOption: [{
            label: '充值banner',
            value: 1
        }, {
            label: 'H5banner',
            value: 2
        }, {
            label: '普通banner',
            value: 3
        }],
        addBanner: {
            select: 3,
            startDate: '',
            endDate: '',
            imageUrl: '',
            url: '',
            sort: 1,

        }

    }),
    methods: {
        buildBanners() {
            this.isBanner = true;
        },
        submitBanner() {

        },
        handleAvatarSuccess(res, file) {
            //console.log(file)
            if (res.code == 0) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.addBanner.imageUrl = res.dataInfo;
                this.$message({
                    message: '上传成功!',
                    type: 'success',
                    duration: 1000
                });
            } else {
                this.$message({
                    message: '系统错误！',
                    type: 'error',
                    duration: 1000
                });
            }

        },
        uploadError() {
            this.$message({
                message: '上传失败！',
                type: 'error',
                duration: 1000
            });
        },
        async listBanner() {
            //this.listLoading =true;
            // await http.get("",{},(data)=>{
            //this.listLoading= false;
            // })
        },
    },
    watch: {
        isBanner() {
            this.$nextTick(() => {
                this.imageUrl = "";
                this.$refs.ruleForm2.resetFields();
            })
        }
    },
    mounted() {
        this.listBanner()
        //do something after mounting vue instance

    }
}
</script>
<style lang="scss" scoped>
.avatar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
}
.uploadText {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 66;
    width: 100%;
    height: 100%;

}
.uploadTextPop {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 65;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.5);
}
</style>
