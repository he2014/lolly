<template>
<section>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input size="mini" v-model="filters.hostId"  placeholder="请输入主播Id"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUser" size="mini">查询</el-button>
            </el-form-item>
        </el-form>
    </el-col>
  <el-table
    :data="videoList"
    border
    style="width: 100%">
    <el-table-column
      prop="converseId"
      label="通话ID"  width="110">
    </el-table-column>
    <el-table-column
      prop="hostId"
      label="主播id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="用户id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时长(秒)"
      width="120">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="录制时间"
      width="160">
    </el-table-column>
     <el-table-column label="视屏">
      <template scope="scope">
           <video :style="{margin:'5px'}"  @click.stop="playVideoDialog(item.videoUrl)" height="48" v-for="item in scope.row.videos" :key="item.videoUrl" :src="baseUrl_video+item.videoUrl"></video>
      </template>
      </el-table-column>
  </el-table>
  <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
        </el-pagination>
    </el-col>
   <el-dialog  :visible.sync="playShow">
            <video height="480" controls autoplay loop :src="playVideoUrl" ref="videos"></video>
  </el-dialog>
</section>
</template>
<script>
import http from "@/api/http";
import { dateTime, baseUrl } from "@/common/js/public";
export default {
  data() {
    return {
      filters: {
        hostId: ""
      },
      baseUrl_video: baseUrl,
      videoList: [],
      playShow: false,
      page: 0,
      pageSize: 15,
      total: 0,
      playVideoUrl: ""
    };
  },
  mounted() {
    this.video_list();
  },
  methods: {
    async video_list() {
      await http.get(
        "back/recording/con/list",
        {
          offset: this.page,
          limit: this.pageSize,
          hostId: this.filters.hostId
        },
        data => {
          // console.log(new Date().getTime());
          let list = data.dataInfo.list;
          list.forEach((element, key) => {
            let times = element.endTime / 1000 - element.startTime / 1000;
            list[key]["time"] = times;
            list[key]["startTime"] = dateTime.fulltime(
              new Date(element.startTime)
            );
          });
          // console.log(list);
          this.videoList = list;
          this.total = data.dataInfo.count;
        }
      );
    },
    playVideoDialog(uri) {
      this.playVideoUrl = this.baseUrl_video + uri;
      this.playShow = true;
    },
    handleCurrentChange(val) {
      this.page = (val - 1) * this.pageSize;
      this.video_list();
    },
    searchUser() {
      this.video_list();
    }
  },
  watch: {
    playShow(newval, oldVal) {
      if (!this.playShow) {
        this.$refs.videos.pause();
      } else {
        if (this.$refs.videos) {
          this.$refs.videos.play();
        }
      }
    }
  }
};
</script>
<style>
video {
  cursor: pointer;
  max-width: 500px;
  max-height: 500px;
}
</style>
