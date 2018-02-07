<template>
<section>
  <!-- <div :style="{paddingTop:'20px',paddingBottom:'20px'}"></div> -->
  <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
    <el-button size="mini" @click.stop="newlyBuild" type="primary">新建</el-button>
  </el-col>
  <el-table v-loading="listLoading" :data="list" show-header border size="mini" style="width: 100%">
    <el-table-column prop="shop" label="商城代码" width="180">
    </el-table-column>
    <el-table-column prop="giftNum" label="金额(单位：美分)" width="180">
    </el-table-column>
    <el-table-column prop="type" label="充值条件">
    </el-table-column>
    <el-table-column prop="gid" label="返币额度">
    </el-table-column>
    <el-table-column prop="zhaung" label="状态">
    </el-table-column>
    <el-table-column prop="time" label="创建时间">
    </el-table-column>
    <el-table-column prop="" label="操作">
      <template scope="scope">
           <el-button size="mini" @click.stop="editTable(scope.row)" type="primary">修改</el-button>
            <el-button size="mini" type="danger" @click.stop="deleteTable(scope.row)">删除</el-button>
       </template>
    </el-table-column>
  </el-table>
  <el-dialog title="ios充值新建" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
    <!-- <el-row>
      <el-col>
        <p class="spanLine"></p>
      </el-col>
    </el-row> -->
    <el-form :rules="addFormRules" size="small" :model="data" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商城代码" prop="gname">
        <el-input type="text" v-model="data.gname"></el-input>
      </el-form-item>
      <el-form-item label="金额(美分)" prop="giftNum">
        <el-input type="number" v-model="data.giftNum"></el-input>
      </el-form-item>
      <el-form-item label="触发条件" prop="sort">
        <el-select v-model="data.sort" placeholder="请选择">
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
    <span slot="footer">
    <el-button @click="dialogVisibl(false)">取 消</el-button>
    <el-button type="primary" @click="dialogVisibl(true)">确 定</el-button>
    </span>
  </el-dialog>

</section>
</template>
<script>
import {
  gitfList
} from '@/api/api'
import {
  dateTime
} from '@/common/js/public'
export default {
  name: "",
  data() {
    var checkAge = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error('礼物价格必须大于0'));
      }
    }
    return {
      list: [],
      options: ["启用", '禁用'],
      sortoptions: ['首冲', '正常充值'],
      total: "",
      listLoading: false,
      dialogVisible: false,
      data: {
        gname: "",
        giftNum: "",
        zhaung: "启用",
        sort: "首冲",
        reValue: ""
      },
      addFormRules: {
        gname: [{
          required: true,
          message: '请输商城代码',
          trigger: 'blur'
        }],
        giftNum: [{
            required: true,
            message: '金额不能为空！'
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "输入金额必须大于0！"
          }
        ],
        reValue: [{
            required: true,
            message: '金额不能为空！'
          },

          {
            pattern: /^([1-9]\d*(\.\d+)?|0)$/,
            message: "输入金额必须>=0！"
          }
        ]
      }
    }
  },
  created() {
    //do something after creating vue instance
    this.lists();
  },
  methods: {
    async lists() {
      this.listLoading = true;
      await gitfList().then((msg) => {
        this.list = msg.data.data;
        this.listLoading = false;
        console.log(msg)
      })
    },
    editTable(val) { //编辑
      //  this.list = []
      //
      //alert()
      //  let h = escape(data)
      this.$router.push('/recharge/iosEdit?msg=' + val.shop)
    },
    newlyBuild() { //新建
      this.dialogVisible = true;
    },
    dialogVisibl(val) {
      this.$refs.ruleForm2.validate((valid) => {
        if (val) {
          if (valid) {
            this.$message({
              type: 'success',
              message: '新建成功!',
              duration: 1000
            });
            this.lists();
            this.dialogVisible = false;
            this.$refs.ruleForm2.resetFields();
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
    deleteTable(val) { //删除
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { //ajax
        //  this.listLoading = true;
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        });
        this.lists()
        //this.listLoading = true;

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 1000
        });
      });
      console.log(val)
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
