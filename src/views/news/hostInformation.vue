<template>
<section>
    <!-- 列表-->
    <el-table :data="list" border v-loading="listLoading" style="width:100%;margin-top:20px">
        <el-table-column prop="createTime" label="申请时间" min-width="150"></el-table-column>
        <el-table-column prop="hostId" label="用户ID" min-width="150"></el-table-column>
        <el-table-column prop="userName" label="姓名" min-width="250"></el-table-column>
        <el-table-column prop="age" label="年龄" min-width="150"></el-table-column>
        <el-table-column prop="country" label="国家" min-width="150"></el-table-column>
        <el-table-column prop="telNum" label="电话/whatsapp" min-width="200"></el-table-column>
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
                createTime: "",
                hostId: "",
                age: "",
                userName: "",
                telNum: "",
                country: ""
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
            http.get("/back/op/queryApply", {
                offset: this.page,
                limit: this.pageSize,
            }, this.success)
        },
        success(data) {
            this.listLoading = false;
            let result = data.dataInfo.data;
            result.forEach((item, key) => {
                result[key].createTime = dateTime.fulltime(new Date(item.createTime));
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
