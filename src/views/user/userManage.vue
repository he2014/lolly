<template>
<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <div>
                    查询方式
                </div>
            </el-form-item>
            <el-form-item>
                <el-select size="mini" v-model="value" placeholder="请选择查询方式" @change="valueChange">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item>
                <!-- 二级选项 -->
                <el-input size="mini" v-model="filters.userId" v-if="userlanguage.isUserId" placeholder="请输入用户ID"></el-input>
                <el-select size="mini" v-model="filters.language" placeholder="请选择语言" v-if="userlanguage.isLanguage" @change="languageChange">
                    <el-option v-for="item in languageoptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="mini" v-if="userlanguage.isUser" v-model="filters.identity" placeholder="请选择用户身份" @change="identityChange">
                    <el-option v-for="item in identityoptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="queryList" size="mini">查询</el-button>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" @click="handleAdd" size="mini">新增</el-button> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.stop="refreshUserALL" size="mini">刷新</el-button>
            </el-form-item>
        </el-form>
    </el-col>

    <!--列表-->
    <el-col :style="{color:'red',padding:'0 0 10px 100px'}">*语言：1表示英语;2表示阿语;3表示德语;4表示土耳其语</el-col>
    <el-table size="mini" :data="users" border v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
        <!--<el-table-column type="selection" width="55">
        </el-table-column>-->
        <el-table-column prop="userId" label="用户ID" width="80">
        </el-table-column>
        <!--<el-table-column class="labelImg" column-key="pic" label="照片" width="80">
            <template scope="scope">
				 <el-button :key="scope.row.pic" type="text" @click.stop="uploadVisibliehand">{{scope.row.pic}}</el-button>
					<img @click.stop="userImage(scope.row)" :src="scope.row.pic[0]" alt="" :style="{width:'30px',height:'30px'}" />
				</template>
        </el-table-column>-->
        <el-table-column prop="nickName" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="language" label="语言" width="50">
        </el-table-column>
        <el-table-column prop="identity" label="身份" width="50">
        </el-table-column>
        <el-table-column prop="userStatus" label="状态" width="50">
        </el-table-column>
        <!--<el-table-column prop="derection" label="身份" width="60">
        </el-table-column>
        <el-table-column prop="value" label="状态" width="60">
            <template scope="scope">
					<el-select size="mini" @change="tableChange" v-model="scope.row.value" placeholder="请选择" value-key="scope.row.name">
					    <el-option
					      v-for="item in visible"
					      :key="scope.row.name"
								:label="item"
					      :value="item"
					      >
					    </el-option>
  				</el-select>
				</template>
        </el-table-column>-->
        <!--<el-table-column prop="giftNum" label="收礼数" min-width="70">
            <template scope="scope">
              <el-button type="text" @click.stop="thenumberofgifts(scope.row)" size="mini">{{scope.row.giftNum}}</el-button>
      </template>
        </el-table-column>
        <el-table-column prop="yue" label="账户余额" min-width="60">
        </el-table-column>
        <el-table-column prop="guan" label="被关注数" min-width="60">
        </el-table-column>
        <el-table-column prop="unbind" label="向其发消息的用户数" min-width="60">
        </el-table-column>
        <el-table-column prop="sex" label="结算方式" width="50">
        </el-table-column>
        <el-table-column prop="birth" label="结算比例" width="50">
        </el-table-column>-->
        <el-table-column label="操作" min-width="150" align="left">
            <template scope="scope">
					<!-- <el-button class="button" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button> -->
          	<!--<el-button type="primary" size="mini">刷新</el-button>-->
            <el-button type="primary" v-if="scope.row.identity!=='用户'&&scope.row.userStatus==='启用'"   @click.stop="homePage(scope.row)" size="mini">更改首页推荐</el-button>
            <el-button type="primary" v-show="scope.row.identity!=='用户'"  @click.stop="userOnlineChange(scope.row)" size="mini">更改在线状态</el-button>
            <el-button type="primary"  @click.stop="userStatusChange(scope.row)" size="mini">更改用户状态</el-button>
            <el-button type="primary" @click.stop="thenumberofgifts(scope.row)" size="mini">礼物收入查询</el-button>
            <el-button type="primary" @click.stop="userMesages(scope.row)" size="mini">用户详情</el-button>
            <el-button type="primary" @click.stop="userImage(scope.row)" size="mini">照片详情</el-button>
			<el-button type="primary" size="mini" @click.stop="userdetails(scope.row)">修改</el-button>
            <el-button type="primary" size="mini" @click.stop="returnBalance(scope.row)">充值</el-button>
            <!-- <el-button type="primary" size="mini" @click.stop="returnBalance2(scope.row)">充值500</el-button> -->
				</template>
        </el-table-column>
    </el-table>



    <!--工具条-->
    <el-col :span="24" class="toolbar">
        <!--    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
    <!--新增界面-->
    <el-dialog custom-class="addForm" title="用户详情" size="mini" :visible.sync="userMessagevisible" :close-on-click-modal="false">
        <div>结算方式：{{userMSGS.exchangeType==1?"周结":userMSGS.exchangeType==2?"月结":""}}</div>
        <div>结算比例(%)：{{userMSGS.exchangeRate?userMSGS.exchangeRate*100:userMSGS.exchangeRate}}</div>
        <div>账户余额：{{userMSGS.balance}}</div>
        <div>礼物总数：{{userMSGS.receiveMoney}}</div>
        <div>发送消息总数：{{userMSGS.converseCount}}</div>
        <div>注册方式：{{userMSGS.registerType}}</div>
        <div>粉丝数：{{userMSGS.fansCount}}</div>
        <div>在线状态(<span :style="{color:'red'}">0空闲;1在聊;2勿扰</span>)：{{userMSGS.ot}}</div>
    </el-dialog>
    <el-dialog custom-class="addForm" title="用户状态" size="mini" :visible.sync="userStatusType" :close-on-click-modal="false">
        <el-form :model="statusData" size="mini" ref="statusUser" :rules="statusDataRuls">
            <el-form-item label="状态" prop="type">
                <el-select @change="statusDataChange" v-model="statusData.type" placeholder="请选择">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="operator" label="操作理由" prop="reason">
                <el-input v-model="statusData.reason" type="textarea" placeholder="请输入操作理由"></el-input>
            </el-form-item>
            <el-form-item v-if="operator" label="" prop="backUserId">
            </el-form-item>
        </el-form>
        <el-button @click.stop="submitUserStatus" type="primary" size="mini" :style="{float:'right',position: 'relative',bottom:'10px'}">确定</el-button>
    </el-dialog>
    <el-dialog custom-class="addForm" title="在线状态" size="mini" :visible.sync="userOnlinevisible" :close-on-click-modal="false">
        <el-form :model="userOnline" size="mini">
            <el-form-item label="状态" prop="ot">
                <el-select @change="onlineChange" v-model="userOnline.ot" placeholder="请选择">
                    <el-option v-for="item in userOnlineOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item v-if="operator" label="操作理由" prop="reason">
                <el-input v-model="statusData.reason" type="textarea" placeholder="请输入操作理由"></el-input>
            </el-form-item>
            <el-form-item v-if="operator" label="" prop="backUserId">
            </el-form-item>-->
        </el-form>

        <el-col>
            <el-button @click.stop="submitUserOnline" type="primary" size="mini" :style="{float:'right',position: 'relative',bottom:'10px'}">确定</el-button>
        </el-col>
    </el-dialog>
    <el-dialog title="充值" size="mini" :visible.sync="isBalance">
        <span>充值金额：</span>
        <el-input-number v-model="exchangeNum" size="smal" :min="1"></el-input-number>
        <span slot="footer" class="dialog-footer">

            <el-button type="primary" size="mini" @click.stop="returnBalance1">确定</el-button>
  </span>

        <!-- <el-button type="primary" size="mini" @click.stop="returnBalance2">充值500</el-button> -->
    </el-dialog>
    <el-dialog title="推荐" size="mini" :visible.sync="ishomePage">
        <el-select v-model="homePageData" :disabled="hompageBoll" placeholder="请选择">
            <el-option size="mini" v-for="item in homePageoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">

    <el-button type="primary" size="mini" @click.stop="submitHomePage">确定</el-button>
  </span>

    </el-dialog>
</section>
</template>
<script>
// import util from '@/common/js/util'
import { freshScrollbar } from "@/common/js/public";
//import NProgress from 'nprogress'
import http from "@/api/http";
// import FileUpload  from "vue-upload-component";
export default {
  data() {
    return {
      exchangeNum: 1,
      isBalance: false,
      homePageData: "",
      hompageBoll: false,
      homePageoptions: [
        {
          label: "不推荐",
          value: -1
        },
        {
          label: "推荐",
          value: 0
        }
      ],
      ishomePage: false,
      userBalance: "",
      dialogImageUrl: "",
      dialogVisible: false,
      uploadVisible: false,
      userMessagevisible: false,
      userOnlinevisible: false,
      userStatusType: false,
      userMSGS: {}, //详情
      filters: {
        //查询条件
        userId: "",
        language: "",
        identity: ""
      },

      value: "",
      users: [],
      total: 0,
      page: 0,
      pageSize: 20,
      listLoading: false,
      sels: [], //列表选中列
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {},
      //新增界面数据
      addForm: {},
      bool: false,
      userlanguage: {
        //语言状态
        isUser: false,
        isLanguage: false,
        isUserId: false
      },
      operator: false,
      statusDataRuls: {
        reason: [
          {
            required: true,
            message: "请输入原因",
            trigger: "blur"
          }
        ]
      },
      statusData: {
        //用户状态
        type: "",
        userId: "",
        backUserId: "",
        reason: ""
      },
      userOnline: {
        //在线状态
        userId: "",
        ot: ""
      },
      isOnline: false,
      userOnlineOptions: [
        {
          label: "空闲",
          value: 0
        },
        {
          label: "在聊",
          value: 1
        },
        {
          label: "勿扰",
          value: 2
        },
        {
          label: "直播中",
          value: -1
        }
      ],
      statusOptions: [
        {
          label: "启用",
          value: 0
        },
        {
          label: "禁用",
          value: 1
        }
      ],
      options: [
        {
          label: "用户Id",
          value: 1
        },
        {
          label: "语言",
          value: 2
        },
        {
          label: "身份",
          value: 3
        }
      ],
      identityoptions: [
        {
          label: "PGC",
          value: 0
        },
        {
          label: "运营账号",
          value: 1
        },
        {
          label: "普通用户",
          value: 2
        }
      ],
      languageoptions: [
        {
          label: "英语",
          value: 1
        },
        {
          label: "阿拉伯语",
          value: 2
        },
        {
          label: "德语",
          value: 3
        },
        {
          label: "土耳其语",
          value: 4
        }
      ]
    };
  },
  components: {
    // FileUpload
  },

  methods: {
    returnBalance(val) {
      this.isBalance = true;
      this.userBalance = val;
    },
    returnBalance1() {
      http.post(
        "/back/recharge/addBalance/" + this.userBalance.userId,
        {
          userId: this.userBalance.userId,
          balance: this.exchangeNum
        },
        () => {
          this.isBalance = false;
          this.$message({
            message: "充值成功！",
            type: "success",
            duration: 1000
          });
        }
      );
    },
    returnBalance2() {
      http.post(
        "/back/recharge/addBalance/" + this.userBalance.userId,
        {
          userId: this.userBalance.userId,
          balance: 500
        },
        () => {
          this.$message({
            message: "充值成功！",
            type: "success",
            duration: 1000
          });
        }
      );
    },
    submitUserStatus() {
      if (!this.operator) {
        this.userStatusType = false;
      } else {
        this.$refs.statusUser.validate(valid => {
          if (valid) {
            http.post("/back/op/cs", this.statusData, () => {
              this.$message({
                message: "用户状态更改成功！",
                type: "success",
                duration: 1000
              });
              this.userStatusType = false;
              this.$refs.statusUser.resetFields();
              this.getUsers();
              this.operator = false;
            });
          }
        });
      }
    },
    submitUserOnline() {
      if (!this.isOnline) {
        this.userOnlinevisible = false;
      } else {
        http.post(
          "/back/user/changeStatus/" + this.userOnline.userId,
          {
            ot: this.userOnline.ot
          },
          () => {
            this.$message({
              message: "在线状态变更成功！",
              type: "success",
              duration: 1000
            });
            this.userOnlinevisible = false;
            this.getUsers();
            this.isOnline = false;
          }
        );
      }
    },
    statusDataChange() {
      this.operator = true;
    },
    onlineChange() {
      this.isOnline = true;
    },
    queryList() {
      if (
        this.filters.userId ||
        this.filters.language ||
        this.filters.identity ||
        this.filters.identity === 0
      ) {
        this.getUsers();
      } else {
        this.$message({
          message: "请输入或选择查询条件！",
          type: "warning",
          duration: 1000
        });
      }
    },
    handleCurrentChange(val) {
      this.page = (val - 1) * this.pageSize;
      this.getUsers();
    },
    //上传dialog显示
    uploadVisibliehand() {
      this.uploadVisible = true;
    },
    //获取用户列表
    async getUsers() {
      let para = {
        offset: this.page,
        limit: this.pageSize,
        identity: this.filters.identity,
        language: this.filters.language,
        userId: this.filters.userId
      };
      this.listLoading = true;
      await http.get("/back/user/pageQueryUser", para, data => {
        //console.log(data)
        let users = data.dataInfo.data;
        users.forEach((item, key) => {
          users[key].userStatus = item.userStatus == 0 ? "启用" : "禁用";
          users[key].identity =
            item.identity === 0
              ? "PGC"
              : item.identity === 1
                ? "运营"
                : item.identity === 2 ? "用户" : "";
        });
        this.users = users;
        this.total = data.dataInfo.count;
        this.listLoading = false;
      });
    },

    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      //this.scrollbar += 1;
      //	console.log()

      // this.addForm = {
      // 	name: '',
      // 	sex: -1,
      // 	age: 0,
      // 	birth: '',
      // 	addr: ''
      // };
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.userId).toString();
      this.$confirm("确认删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          http.post(
            "/back/user/batchDelete",
            {
              userId: ids
            },
            () => {
              this.listLoading = false;
              this.$message({
                message: "删除成功!",
                type: "success",
                duration: 1000
              });
              this.getUsers();
            }
          );
        })
        .catch(() => {
          this.$message({
            message: "取消删除！",
            type: "info",
            duration: 1000
          });
        });
    },
    valueChange(e) {
      switch (e) {
        case 4:
          this.userlanguage.isUserId = false;
          this.userlanguage.isLanguage = false;
          this.userlanguage.isUser = false;
          this.filters.language = "";
          this.filters.identity = "";
          this.filters.userId = "";
          this.getUsers();
          break;
        case 1:
          this.userlanguage.isUserId = true;
          this.userlanguage.isLanguage = false;
          this.userlanguage.isUser = false;
          this.filters.language = "";
          this.filters.identity = "";
          this.filters.userId = "";
          break;
        case 2:
          this.userlanguage.isLanguage = true;
          this.userlanguage.isUserId = false;
          this.userlanguage.isUser = false;
          this.filters.userId = "";
          this.filters.identity = "";
          this.filters.language = "";
          break;
        case 3:
          this.userlanguage.isUser = true;
          this.userlanguage.isLanguage = false;
          this.userlanguage.isUserId = false;
          this.filters.language = "";
          this.filters.identity = "";
          this.filters.userId = "";
          break;
      }
      // // console.log(this.value)
      // if (this.value.length > 0) {
      //     if (this.value.length === 1)
      //         this.$nextTick(() => {
      //             this.$el.querySelector("#input")
      //                 .setAttribute("placeholder", this.value[0]);
      //         })
      //     this.bool = true;
      //     //console.log(e)
      // } else {
      //     this.bool = false;
      // }
    },
    languageChange(val) {},
    identityChange(val) {},
    userStatusChange(row) {
      this.userStatusType = true;
      this.statusData.userId = row.userId;
      this.statusData.type = row.userStatus;
    },
    homePage(row) {
      this.ishomePage = true;
      this.homepgaeUser = row.userId;
      http.get("/back/user/qhs/" + row.userId, {}, data => {
        //alert(data)
        if (data.dataInfo == 0) {
          this.homePageData = "推荐";
        }
        if (data.dataInfo == -1) {
          this.homePageData = "不推荐";
        }
        if (data.dataInfo == 1) {
          this.hompageBoll = true;
        }
      });
    },
    submitHomePage() {
      if (!isNaN(this.homePageData)) {
        http.post(
          "/back/user/uhs/" + this.homepgaeUser,
          {
            status: this.homePageData
          },
          () => {
            this.$message({
              type: "success",
              message: "刷新成功！",
              duration: 1000
            });
            this.ishomePage = false;
          }
        );
      }
    },
    userOnlineChange(row) {
      this.userOnlinevisible = true;
      this.userOnline.userId = row.userId;
      http.get("/back/user/queryUser/" + row.userId, {}, data => {
        switch (data.dataInfo.ot) {
          case -1:
            this.userOnline.ot = "直播中";
            break;
          case 1:
            this.userOnline.ot = "在聊";
            break;
          case 2:
            this.userOnline.ot = "勿扰";
            break;
          default:
            this.userOnline.ot = "空闲";
        }
        // this.userOnline.ot = data.dataInfo
      });
    },
    userMesages(row) {
      this.userMessagevisible = true;
      http.get("/back/user/queryUser/" + row.userId, {}, ref => {
        console.log(ref);
        let data = ref.dataInfo;
        switch (data.registerType) {
          case 0:
            data.registerType = "web";
            break;
          case 1:
            data.registerType = "FACEBOOK";
            break;
          case 2:
            data.registerType = "TWITTER";
            break;
          case 3:
            data.registerType = "GOOGLE";
            break;
          case 4:
            data.registerType = "INSTAGRAM";
            break;
          case 5:
            data.registerType = "MOBILE";
            break;
          case 6:
            data.registerType = "THIRD_EMAIL";
            break;
        }
        this.userMSGS = data;
      });
      // this.$router.push("usermsg?ids=" + row.userId);
    },
    userdetails(row) {
      this.$router.push(
        "/user/Userdetails?ids=" + row.userId + "&page=" + this.page
      );
      //  console.log(this.$router)
    },
    userImage(row) {
      this.$router.push(
        "/user/userImage?ids=" + row.userId + "&identity=" + row.identity
      );
    },
    thenumberofgifts(row) {
      this.$router.push(
        "/user/thenumberofgifts?ids=" + row.userId + "&page=" + this.page
      );
    },
    refreshUserALL() {
      http.get("/back/user/cc", {}, () => {
        this.$message({
          type: "success",
          message: "刷新成功！",
          duration: 1000
        });
      });
    }
  },
  mounted() {
    // if (this.$route.query.page) {
    //     this.page = this.$route.query.page;
    //     this.currentPage = (this.page / this.pageSize) + 1;
    //     //alert(this.currentPage)
    // }
    this.getUsers();
    //alert(this.$store.state.loginKey)
    this.statusData.backUserId =
      this.$store.state.loginKey.backUserId ||
      JSON.parse(unescape(sessionStorage.getItem("user"))).backUserId;
  },
  watch: {
    userStatusType() {
      if (!this.userStatusType) {
        this.$refs.statusUser.resetFields();
      }
    },
    isBalance() {
      this.$nextTick(() => {
        this.exchangeNum = 1;
      });
    }
  }
};
</script>

<style scoped>
.el-icon-close-tip {
  display: none !important;
}

img {
  display: flex;
  margin: 5px 0;
}

.addForm,
.el-dialog--tinyii {
  width: 400px !important;
}

.el-button + .el-button,
.button {
  margin-left: 0;
  background-color: #46b0cf;
  border-color: #34a6c8;
  color: #fff;
}
</style>
