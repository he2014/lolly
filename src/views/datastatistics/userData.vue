<template>
<section>
    <el-row :span="24" :style="{paddingTop:'20px',paddingBottom:'20px'}">
        <el-date-picker v-model="value1" @change="timeChange" type="datetime" placeholder="选择日期时间" size="mini">
        </el-date-picker>
        <el-button type="primary" :style="{marginLeft:'30px'}" @click.stop="timeChange" size="mini">刷新全部</el-button>
        <el-button type="primary" :style="{marginLeft:'30px'}" @click.stop="getUserData" size="mini">刷新</el-button>

    </el-row>
    <el-row :span="24">
        <el-col :span="4">用户注册量:{{data.rc}}</el-col>
        <el-col :span="4">充值用户数:{{data.rec}}</el-col>
        <el-col :span="5">用完赠送的15s用户量:{{data.uf}}</el-col>
        <el-col :span="6">注册后用户连接主播量:{{data.cn}}</el-col>
        <el-col :span="5">充值金额:{{data.rem}}</el-col>
    </el-row>
    <el-row :span="24" :style="{height:'1px',backgroundColor:'#409EFF',marginTop:'20px',marginBottom:'20PX'}"></el-row>
    <el-row :span="24">
        <el-col :span="12" id="callData" :style="{paddingRight:'10px'}">
            <el-row>
              
                <el-button type="primary" size="mini" @click.stop="getCallData">刷新</el-button>
            </el-row>

            <el-table :data="data1" border style="width: 100%">
                <el-table-column prop="hostId" label="主播ID" width="180">
                </el-table-column>
                <el-table-column prop="count" label="呼叫数" width="180">
                </el-table-column>
                <el-table-column prop="" label="">
                    <template scope="scope">
                            <el-button type="primary" size="mini"  @click.stop="tableChange1(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

        <el-col :span="12" id="connectData" :style="{paddingLeft:'10px'}">
            
            <el-row>
              
                <el-button type="primary" size="mini" @click.stop="getCallData1">刷新</el-button>
            </el-row>

            <el-table :data="data3" border style="width: 100%">
                <el-table-column prop="hostId" label="主播ID" width="180">
                </el-table-column>
                <el-table-column prop="count" label="接通数" width="180">
                </el-table-column>
                <el-table-column prop="" label="">
                    <template scope="scope">
                            <el-button type="primary" size="mini"  @click.stop="tableChange2(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="60%" :style="{height:'600px'}">
        <el-table :data="data2" border style="width: 100%">
            <el-table-column prop="hostId" label="主播ID" width="180">
            </el-table-column>

            <el-table-column prop="userId" label="用户id" width="180">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="180">
            </el-table-column>
         
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="60%" :style="{height:'600px'}">
        <el-table :data="data4" border style="width: 100%">
            <el-table-column prop="hostId" label="主播ID" width="180">
            </el-table-column>

            <el-table-column prop="userId" label="用户id" width="180">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="180">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="180">
            </el-table-column>
           
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
    </el-dialog>
</section>
</template>
<script>
import http from "@/api/http";
import { getTimeStap, dateTime } from "@/common/js/public";
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      value1: new Date(
        new Date(
          new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate()
        ).getTime() +
          8 * 60 * 60 * 1000
      ),
      data: {},
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      message: {
        value1: "",
        value2: "",
        value3: ""
      }
    };
  },
  methods: {
    timeChange() {
      this.getUserData();
      this.getCallData();
      this.getCallData1();
    },
    getUserData() {
      //console.log(this.value1)
      this.message.value1 = this.value1;
      let obj = Object.assign({}, this.message);
      http.get(
        "/back/sts/quds",
        {
          createTime: getTimeStap(obj.value1)
        },
        data => {
          this.data = data.dataInfo;
        }
      );
      //methods
    },
    getCallData() {
      this.message.value1 = this.value1;
      let obj = Object.assign({}, this.message);
      http.get(
        "/back/sts/list/call",
        {
          createTime: getTimeStap(obj.value1)
        },
        data => {
          this.data1 = data.dataInfo;
        }
      );
    },
    tableChange1(val) {
      this.message.value1 = this.value1;
      let obj = Object.assign({}, this.message);
      http.get(
        "/back/sts/list/call/detail",
        {
          createTime: getTimeStap(obj.value1),
          hid: val.hostId
        },
        data => {
          this.dialogVisible1 = true;
          let datas = data.dataInfo;
          datas.forEach((item, key) => {
            datas[key].startTime = dateTime.fulltime(new Date(item.startTime));
          });
          this.data2 = data.dataInfo;
        }
      );
    },
    getCallData1() {
      this.message.value1 = this.value1;
      let obj = Object.assign({}, this.message);
      http.get(
        "/back/sts/list/connect",
        {
          createTime: getTimeStap(obj.value1)
        },
        data => {
          this.data3 = data.dataInfo;
        }
      );
    },
    tableChange2(val) {
      this.message.value1 = this.value1;
      let obj = Object.assign({}, this.message);
      http.get(
        "/back/sts/list/connect/detail",
        {
          createTime: getTimeStap(obj.value1),
          hid: val.hostId
        },
        data => {
          this.dialogVisible2 = true;
          let datas = data.dataInfo;
          datas.forEach((item, key) => {
            datas[key].startTime = dateTime.fulltime(new Date(item.startTime));
            datas[key].endTime = dateTime.fulltime(new Date(item.endTime));
          });
          this.data4 = data.dataInfo;
        }
      );
    }
  },
  mounted() {
    this.getUserData();
    this.getCallData();
    this.getCallData1();
  }
};
</script>
<style lang="scss" scoped>
</style>
