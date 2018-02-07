<template>
<section>
  <div :style="{paddingTop:'20px',paddingBottom:'20px'}">
    <el-button type="primary" @click="returnUser">返回</el-button>
  </div>
  <el-table :data="msg" style="width: 100%" border size="small">
    <el-table-column prop="id" label="图片ID" width="60">
    </el-table-column>
    <el-table-column prop="pic" label="图片" width="180">
      <template scope="scope"><img :src="scope.row.pic"></template>
    </el-table-column>
    <el-table-column prop="bool" label="是否付费" width="80">
      <template scope="scope">
					<el-select size="mini" v-model="scope.row.bool" placeholder="请选择" value-key="scope.row.bool">
					    <el-option
					      v-for="item in ismoney"
					      :key="item"
								:label="item"
					      :value="item"
					      >
					    </el-option>
  				</el-select>
				</template>
    </el-table-column>
    <el-table-column prop="money" label="付费金额" width="200">
      <template scope="scope">
         <el-input-number v-model="scope.row.money"  :min="0" :max="100000" label=""></el-input-number>
              <!-- <el-input v-model="" placeholder="请输入金额"></el-input> -->
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作" width="180">
      <template scope="scope">
      <el-button type="primary" @click.stop="tableChange(scope.row)">提交</el-button>
      <el-button type="danger"  @click.stop="deletes(scope.row)">删除</el-button>
    </template>
    </el-table-column>
  </el-table>
</section>
</template>
<script>
import {
  userMessage
} from '@/api/api'
export default {
  name: "",
  data() {
    return {
      msg: [],
      ismoney: ['是', '否'],
      userID: "",

    }
  },
  created() {
    //do something after creating vue instance
    this.userID = this.$route.query.ids;

  },
  methods: {
    tableChange(val) {
      this.$confirm('确认提交此次操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (val.bool === "是" && val.money > 0) {
          this.$message({
            type: 'success',
            message: '提交成功!',
            duration: 1000
          });
        } else {
          this.$message({
            type: 'warning',
            message: '必须将此照片设置为付费照片且金额大于0!',
            duration: 2000
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消提交',
          duration: 1000
        });
      });
      //获取用户当前属性提交
      console.log(val)
    },
    deletes(val) {
      let userId = this.userID;
      let imgId = val.id;
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!',
          duration: 1000
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消提交',
          duration: 1000
        });
      });
    },
    returnUser() {
      this.$router.push('/news/IMnews')
    }
  },
  mounted() {
    //  console.log(this.$route)
    let userID = this.$route.query.ids;
    userMessage(userID).then((res) => {
      let data = res.data.data;
      if (data.length > 0) {
        for (let val of data) {
          val.bool === 1 ? val.bool = "是" : val.bool = "否"
          console.log(val)
        }
        this.msg = res.data.data;
        //console.log(this.msg)
      } else {

      }

    })
    //console.log(userMessage(userID))
  }
}
</script>
<style lang="scss" scoped>
img {
    height: 60px;
    width: 60px;
}
</style>
