<template>
<section>
  <el-row :style="{paddingTop:'20px ',paddingBottom:'20px '}">
    <el-col>
      <el-button type="primary" size="small" @click="returnUserMan"> 返回</el-button>
    </el-col>
  </el-row>
  <el-row :style="{width:'40%'}">
    <el-col>
      <el-form v-loading="listLoading" size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商城代码" prop="shop">
          <el-input type="text" v-model="data.shop"></el-input>
        </el-form-item>
        <el-form-item label="金额(美分)" prop="giftNum">
          <el-input type="number" v-model="data.giftNum"></el-input>
        </el-form-item>
        <el-form-item label="触发条件" prop="type">
          <el-select v-model="data.type" placeholder="请选择">
            <el-option v-for="item in sortoptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返币(美分)" prop="reValue">
          <el-input type="number" v-model="data.reValue"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="zhaung">
          <el-select v-model="data.zhaung" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
  <el-row :style="{paddingTop:'20px',paddingLeft:'100px'}">
    <el-button size="mini" type="primary" @click="dialogVisibl(true)">提交</el-button>
    <el-button size="mini" @click="dialogVisibl(false)">取消</el-button>
  </el-row>
</section>
</template>
<script>
import {
  gitfList
} from '@/api/api'
export default {
  name: "",
  data: () => ({
    data: [],
    listLoading: false,
    sortoptions: [1, 2],
    options: [1, 2]

  }),
  created() {
    //do something after creating vue instance
    this.lists()
  },
  methods: {
    async lists() {
      this.listLoading = true;
      await gitfList()
        .then((msg) => {
          let list = msg.data.data;
          this.data = list.splice(0, 1)[0]
          this.listLoading = false;
          console.log(msg)
        })
    },
    dialogVisibl(val) {
      if (val) {
        this.$confirm('确认提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!',
              duration: 1000
            });
            this.lists();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消提交',
              duration: 1000
            });
          });


      } else {
        // this.$message({
        //   type: 'info',
        //   message: '取消新建!',
        //   duration: 1000
        // });
        this.lists();
      }




    },
    returnUserMan() {
      this.$router.push('/recharge/ios')
    }
  }
}
</script>
<style lang="scss" scoped>
div {}
</style>
