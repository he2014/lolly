<template>
<section>
  <!-- 列表-->
  <el-table :data="list" border v-loading="listLoading" style="width:100%;margin-top:20px">
    <el-table-column prop="opDate" label="操作时间" min-width="150"></el-table-column>
    <el-table-column prop="userId" label="被操作人ID" min-width="150"></el-table-column>
    <el-table-column prop="reason" label="操作原因" min-width="400"></el-table-column>
    <el-table-column prop="type" label="操作类型" min-width="180"></el-table-column>
    <el-table-column prop="opNickName" label="操作人昵称" min-width="180"></el-table-column>
  </el-table>
  <!-- 分页-->
  <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
    </el-pagination>
  </el-col>

</section>
</template>

<script>
import {
  dateTime
} from '@/common/js/public'
import http from '@/api/http'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      data: {
        word: "",
        wordId: "",
        language: ""
      },
      currentPage: 1,
      total: 0,
      pageSize: 30,
      page: 0,
    }
  },
  mounted() {
    this.http()
  },
  methods: {
    http() {
      this.listLoading = true;
      http.get("/back/op/pageQueryOp", {
        offset: this.page,
        limit: this.pageSize,
      }, this.success)
    },
    success(data) {
      this.listLoading = false;
      let result = data.dataInfo.data;
      result.forEach((item, key) => {
        //giftStatus
        result[key]['opDate'] = dateTime.showtime(new Date(item['opDate']))
        result[key]['type'] = item['type'] === 0 ? "启用" : "禁用"
      })
      this.list = result;
      this.total = data.dataInfo.count;
      this.listLoading = false;
      // console.log(data)
    },
    //分页
    handleCurrentChange(val) {
      this.page = (val - 1) * this.pageSize;
      this.http()
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
