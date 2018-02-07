<template>
<section>
  <!--新建账号 -->
  <el-col :span="24" class="toolbar" style="padding:0px 10px">
    <el-form :inline="true" :model="account" :rules="rules" ref="accountForm" class="demo-form-inline">
      <el-form-item label="昵称敏感词" prop="word" style="margin-top: -5px">
        <el-input size="mini" v-model.trim="account.word" placeholder="输入敏感词"></el-input>
      </el-form-item>
      <el-form-item prop="language" label="选择语言" style="margin-top: -5px">
        <el-select size="mini" v-model="account.language" placeholder="请选择">
          <el-option v-for="item in roleSpecies" :key="item.val" :label="item.label" :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button size="mini" type="primary" @click.stop="createAccount" icon="plus">创建</el-button>
      <el-button size="mini" type="primary" @click="searchAccount" icon="search">查询</el-button>
      <el-form-item style="margin-top: -6px; margin-left:10px">
        <el-button size="mini" @click="refresh">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <!-- 列表-->
  <el-table :data="list" border v-loading="listLoading" style="width:100%">
    <el-table-column prop="wordId" label="敏感词ID" min-width="150"></el-table-column>
    <el-table-column prop="word" label="昵称敏感词" min-width="350"></el-table-column>
    <el-table-column prop="language" label="敏感词语种" min-width="180"></el-table-column>
    <el-table-column prop="createDate" label="创建时间" min-width="250"></el-table-column>
    <el-table-column label="操作" min-width="300">
      <template scope="scope">
        <el-button type="primary" size="mini" @click="handleWarn(scope.row)">修改</el-button>
        <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页-->
  <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
    </el-pagination>
  </el-col>
  <!--修改界面-->
  <el-dialog title="修改敏感词" size="mini" :visible.sync="addFormVisible" :close-on-click-modal="false">
    <el-form label-posistion="left" :inline="true" :model="addForm" label-width="200" :rules="addFormRules" ref="addForm">
      <el-form-item label="敏感词" prop="word">
        <el-input size="small" v-model="addForm.word" placeholder="请输入修改的敏感词"></el-input>
      </el-form-item>
      <el-form-item label="选择语言" prop="language">
        <el-select size="small" v-model="addForm.language" placeholder="请选择">
          <el-option v-for="item in roleOptions" :key="item.val" :label="item.label" :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="addFormVisible=false">取消</el-button>
      <el-button type="primary" @click.stop="addFormsubmit">确定</el-button>
    </div>
  </el-dialog>

</section>
</template>

<script>
import {
  dateTime
} from '@/common/js/public'
import http from '@/api/http'
export default {
  data() {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      callback();
    };
    let checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      list: [],
      listLoading: false,
      // roleMap: {
      //   1: '英语',
      //   2: '阿拉伯语',
      //   3: '德语',
      //   4: '土耳其语',
      // },
      account: {
        word: '',
        language: '英语'
      },
      roleSpecies: [{
          label: '英语',
          val: 1
        },
        {
          label: '阿拉伯语',
          val: 2
        },
        {
          label: '德语',
          val: 3
        },
        {
          label: '土耳其语',
          val: 4
        }
      ],
      roleOptions: [{
          label: '英语',
          val: 1
        },
        {
          label: '阿拉伯语',
          val: 2
        },
        {
          label: '德语',
          val: 3
        },
        {
          label: '土耳其语',
          val: 4
        }
      ],

      rules: {
        user: [{
          validator: checkName,
          trigger: 'blur'
        }],
        pwd: [{
          validator: checkPass,
          trigger: 'blur'
        }]
      },
      data: {
        word: "",
        wordId: "",
        language: ""
      },
      currentPage: 1,
      total: 0,
      pageSize: 30,
      page: 0,
      editFormVisible: false, //默认隐藏编辑弹窗
      editLoading: false,
      addFormVisible: false, //修改界面是否显示
      addLoading: false,
      addFormRules: {
        change: [{
          required: true,
          message: '请输入修改的敏感词',
          trigger: 'blur'
        }],
      },
      //修改界面数据
      addForm: {
        word: "",
        language: ""
      },
    }
  },
  mounted() {
    this.http()
  },
  methods: {
    http() {
      this.listLoading = true;
      http.get("/back/word/pageQuerySensitiveWord", {
        offset: this.page,
        limit: this.pageSize,
        word: this.account.word,
      }, this.success)
    },

    success(data) {

      this.listLoading = false;
      let result = data.dataInfo.data;
      result.forEach((item, key) => {
        result[key]['createDate'] = dateTime.showtime(new Date(item['createDate']))
        result[key]['language'] = item['language'] === 1 ? "英语" : item['language'] === 2 ? "阿拉伯语" : item['language'] === 3 ? "德语" : "土耳其语"
      })
      this.list = result;
      this.total = data.dataInfo.count;
      this.listLoading = false;
      // console.log(data)
    },
    //新增敏感词
    createAccount() {

      if (this.account.word) {

        let _this = this;
        let data = this.account;
        //    ? 1 :  === "阿拉伯语" ? 2 : this.account.language === "德语" ? 3 : 4
        if (this.account.language === "英语") {
          data.language = 1;
        }
        http.post("/back/word/addSensitiveWord", data, function() {
          _this.$message({
            type: 'success',
            message: '新建成功!',
            duration: 1000
          });
          _this.account.word = ""
          _this.dialogVisible = false;
          _this.http();
          _this.$refs.accountForm.resetFields();
        })


      } else {
        this.$message({
          type: 'warning',
          message: '请填写敏感词!',
          duration: 1000
        });
      }

    },
    // 查询敏感词
    searchAccount(val) {
      this.http()
    },
    //刷新敏感词
    refresh() {
      let _this = this;
      http.get("/back/word/refreshCache", {}, function() {
        _this.$message({
          type: 'success',
          message: '刷新成功！',
          duration: 1000
        });

      })
    },
    //分页
    handleCurrentChange(val) {
      this.page = (val - 1) * this.pageSize;
      this.http()
    },
    //删除
    handleDel(val) {
      this.$confirm('确认提交此次操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => { //ajax
          http.get("/back/word/deleteSensitiveWord/" + val.wordId, {}, this.handleDelsuccess)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除',
            duration: 1000
          });
        });
    },
    handleDelsuccess(data) {
      this.$message({
        type: 'success',
        message: '删除成功!',
        duration: 1000
      });
      this.http();
    },
    //编辑
    handleWarn(val) {
      this.addFormVisible = true;
      let that = this
      http.get("/back/word/queryWord/" + val.wordId, {}, function(data) {
        that.addForm.language = data.dataInfo.language === 1 ? "英语" : data.dataInfo.language === 2 ? "阿拉伯语" : data.dataInfo.language === 3 ? "德语" : "土耳其语"
        that.addForm = data.dataInfo;
        // console.log(data);
      })
    },

    addFormsubmit(form) {
      this.$confirm('确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          if (this.addForm.word) {

            let _this = this;
            let data = this.addForm;
            http.post("/back/word/editSensitiveWord", data, function() {
              _this.$message({
                type: 'success',
                message: '修改成功!',
                duration: 1000
              });
              _this.addFormVisible = false;
              _this.http();
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交！',
            duration: 1000
          });
        });
    },

  },
}
</script>

<style scoped>
.demo-form-inline {
  margin-top: 20px;
}

.el-select {
  width: 150px;
}

.el-input {
  width: 250px;
}

.el-select .el-input {
  width: 110px;
}
</style>
