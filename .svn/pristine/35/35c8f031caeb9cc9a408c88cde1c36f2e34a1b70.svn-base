<template>
<section>
  <el-row>
    <el-col>
      <el-button type="primary" size="small" @click="returnUserMan"> 返回</el-button>
    </el-col>
  </el-row>


  <!-- <el-row>
    <el-col>
      <p class="spanLine"></p>
    </el-col>
  </el-row> -->
  <el-row>
    <el-col :span="8">
      <el-form size="mini" :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <!-- <el-form-item label="IM内容" prop="nickname">
          <el-input type="textarea" v-model="ruleForm2.nickname" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="发送时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="12">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm2.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <p class="spanLine"></p>
    </el-col>
  </el-row>
  <!-- <el-row>
    <el-col>
      <p :style="{color:'#000'}">缩略图片上传：(<i :style="{color:'red'}">只能上传png/jpg文件，且不超过500kb</i>)</p>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <el-upload :file-list="fileList2" action="https://jsonplaceholder.typicode.com/posts/" :limit="9" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </el-col>
  </el-row> -->
</section>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      fileList1: [],
      fileList2: [],
      identitystatus: ["PGC", '用户', '运营账号'],
      userStatusoptions: ['启用', '禁用'],
      userSortoptions: ["推荐", "不推荐"],
      settlementoptions: ['周结', '月结'],
      ruleForm2: {
        nickname: '',
        userStatus: "启用",
        Useridentitystatus: "PGC",
        userSort: "推荐",
        settlement: "周结",
        proportion: "30%",
        date1: "",
        date2: ""
      }

    };
  },
  mounted() {
    //do something after mounting vue instance

  },
  methods: {
    // returnUserMan() {
    //   this.$router.push("/news/IMnews");
    // },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //标记是否是为付费图片
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {

        if (valid) {
          //  alert(JSON.stringify(this.ruleForm2))
          //alert(valid)
          //alert('submit!');
          this.$confirm('是否确定提交此次修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!',
              duration: 1000
            });
            // alert(0)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交！',
              duration: 1000
            });
            this.$refs[formName].resetFields();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="scss" scoped>
section {
    padding-top: 20px;
}
.spanLine {
    margin: 10 0;
    height: 1px;
    background: #409EFF;
}
</style>
