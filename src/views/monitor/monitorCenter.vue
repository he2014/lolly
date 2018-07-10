<template>
     <section>
        <div style="margin:20px 0">直播监控：  
               <el-button type="primary" size="small" @click="updateDatas">更新数据</el-button> 
               <span class="spans" v-show="buttonColor"></span>
        </div>
        <div class="livelist">
         <div class="livelist-item"  v-for="item in roomList" :key="item.hi"> 
           <AgoraRTCcom :isShow="true" :roomId="item.ri" :line="item.cun" :hotId="item.hi"></AgoraRTCcom>
           </div>
        </div>
         
       </section>
</template>

<script>
import AgoraRTCcom from "./AgoraRTCcom";
import http from "@/api/http";
export default {
  //back/video/queryHostIds
  data() {
    return {
      dialogVisible: false,
      roomList: [],
      isWatch: false, //获取
      watchData: [], //监听数据
      time_r: "", //定时器
      buttonColor: false //控制颜色
    };
  },
  components: {
    AgoraRTCcom
  },

  mounted() {
    this.getLiveList();
  },
  methods: {
    updateDatas() {
      this.getLiveList();
      this.buttonColor = false;
      this.isWatch = false;
    },
    getLiveList() {
      http.post("/back/video/queryVideoHosts", {}, res => {
        // console.log(res);
        if (this.time_r) {
          clearTimeout(this.time_r);
        }
        // if (this.isWatch) {
        //   this.watchData = res.dataInfo;
        // } else {
        // this.watchData = res.dataInfo;
        this.roomList = res.dataInfo;
        // }
        this.setTime();
      });
    },
    setTime() {
      this.time_r = setTimeout(() => {
        this.isWatch = true;
        this.getLiveList();
      }, 60 * 1000);
    }
  },
  watch: {
    //   watchData: {
    //     handler(newVal, oldVal) {
    //       // console.log(oldVal);
    //       // if (oldVal.length > 0 && newVal.length > 0) {
    //       if (this.isWatch) {
    //         if (oldVal.length < newVal.length && newVal.length > 0) {
    //           this.buttonColor = true;
    //         }
    //       }
    //       // } else {
    //       //   if (newVal.length < 0) {
    //       //     this.$message({
    //       //       type: "waring",
    //       //       message: "没有主播在直播了！"
    //       //     });
    //       //   }
    //       // }
    //     }
    //   },
    //   deep: true
  }
};
</script>
<style lang="scss" scoped >
.spans {
  display: inline-block;
  background: red;
  padding: 10px;
  border-radius: 50%;
}
.dialogVisible-video {
  height: 689px;
}
section .livelist {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.livelist-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
