<template>
  <section>
    <div :style="{paddingTop:'20px',paddingBottom:'20px'}">
      <el-button type="primary" @click="returnUser" size="mini">返回</el-button>
      <el-button type="primary" @click="uploadHpoto" size="mini" :disabled="isUpload===9">上传照片</el-button>
      <el-button type="primary" @click="uploadVideo" size="mini">上传视屏</el-button>

    </div>
    <el-table :data="videoTable" style="width: 100%;margin-bottom:20px;" border size="small">
      <el-table-column prop="photoId" label="videoID" width="120">
      </el-table-column>
      <el-table-column prop="minPic" label="封面" width="180">
        <template scope="scope">
          <img @click.stop="imgpreview(imgUrl+scope.row.minPic)" :src="imgUrl+scope.row.minPic">
        </template>
      </el-table-column>
      <el-table-column prop="minPic" label="视屏" width="100">
        <template scope="scope">
          <video ref="video_id" :src="imgUrl+scope.row.maxPic" @click.stop="videopreview(imgUrl+scope.row.maxPic)"></video>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="300">
        <template scope="scope">
          <!-- <el-button type="primary" :disabled="scope.row.head==true||identity=='用户'" @click.stop="tableChange(scope.row)">提交</el-button> -->
          <el-button type="danger" :disabled="scope.row.isHeader==1" @click.stop="deletes_video(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="msg" style="width: 100%" border size="small">
      <el-table-column prop="photoId" label="图片ID" width="60">
      </el-table-column>
      <el-table-column prop="maxPic" label="图片" width="180">
        <template scope="scope">
          <img @click.stop="imgpreview(imgUrl+scope.row.maxPic)" :src="imgUrl+scope.row.maxPic">
        </template>
      </el-table-column>

      <el-table-column prop="price" label="付费金额" width="200">
        <template scope="scope">
          <el-input-number :disabled="identity=='用户'||scope.row.head==true||isPrice==3&&scope.row.price==0" v-model="scope.row.price"
            @change="priceChange" :min="0" :max="100000" label=""></el-input-number>
          <!-- <el-input v-model="" placeholder="请输入金额"></el-input> -->
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="300">
        <template scope="scope">
          <el-button type="primary" :disabled="scope.row.head==true||identity=='用户'" @click.stop="tableChange(scope.row)">提交</el-button>

          <el-button type="danger" :disabled="scope.row.isHeader==1" @click.stop="deletes(scope.row)">删除</el-button>
          <el-button type="primary" v-if="scope.row.price==0" @click.stop="usersPhotoChange(scope.row)">设置为头像</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- video -->

    <el-dialog title="上传用户照片" :visible.sync="dialogVisible" width="40%">
      <el-form :model="statusData" size="mini" ref="statusUser">
        <!-- <el-form-item label="高清原图" prop="">
                <el-upload accept=".jpg,.png,.gif,.jpeg" ref="upload1" :on-error="errorUpload" :on-success="successUpload1" name="pic" :limit="number" :action="uploadUrls" :auto-upload="false" :file-list="fileList1" list-type="picture">
                    <el-button slot="trigger" size="small" :disabled="isUpload===9" type="primary">选取文件</el-button>
                    <div slot="tip" :style="{color:'red'}" class="el-upload__tip" v-if="isUpload===9">用户照片存在数已达到最大</div>
                    <el-button style="margin-left: 10px;" :disabled="isUpload===9" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
                </el-upload>
            </el-form-item> -->
        <el-form-item label="图片上传" prop="">
          <div id="imageuploaded">
            <vue-core-image-upload :disabled="isUpload===9" cropRatio="1:1" :maxWidth="200" :maxheight="200" :compress="80" text="上传图片"
              :class="['btn', 'btn-primary']" crop="server" @imageuploaded="successUpload2" :max-file-size="5242880" inputOfFile="pic"
              :url="uploadUrlImg">
            </vue-core-image-upload>
          </div>
          <div :style="{marginTop:'20px'}">
            <img class="cutImage" :src="imgDataUrl" v-if="isimgDataUrl" :style="{height:'80px',width:'auto'}">
          </div>
        </el-form-item>
        <el-form-item label="照片价格" prop="price">
          <el-input-number :disabled="isPrice==3||identity=='用户'" v-model="statusData.price" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop="submitHpoto">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="imgpreviewVisible" width="50%">
      <img :src="imgpreviewUrl" :style="{height:'300px',width:'auto'}" />
    </el-dialog>
    <el-dialog title="上传video" :visible.sync="isVideoShow" width="40%">
      <el-form :model="videoData" size="mini">
        <el-form-item label="图片上传" prop="dd">
          <div id="imageuploaded">
            <vue-core-image-upload cropRatio="1:1" :maxWidth="200" :maxheight="200" :compress="80" text="上传图片" :class="['btn', 'btn-primary']"
              crop="server" @imageuploaded="videocropSuccess" :max-file-size="5242880" inputOfFile="pic" :url="uploadUrlImg">
            </vue-core-image-upload>
          </div>
          <div :style="{marginTop:'20px'}">
            <img class="cutImage" :src="imgVideoURL" v-if="isimgVideoURL" :style="{height:'80px',width:'auto'}">
          </div>
        </el-form-item>
        <el-form-item label="" prop="url">
          <el-upload name="pic" class="upload-demo" :action="upload_video_url" :file-list="videoList" accept=".mp4,.mov,.avi" :on-error="errorUpload"
            :on-success="success_video" :limit="1">
            <el-button size="small" type="primary">点击上传video</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isVideoShow = false">取 消</el-button>
        <el-button type="primary" @click.stop="submitvideo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="videoPlayShow" width="50%">
      <video id="videoPlay" ref="videoPlay" controls loop :src="videopreviewurl" :style="{height:'420px',width:'auto'}"></video>
    </el-dialog>
  </section>
</template>
<script>
  import http from "@/api/http";
  //视屏格式:.mov,.mp4,.flv,.3gp
  // import myUpload from 'vue-image-crop-upload';
  import VueCoreImageUpload from "vue-core-image-upload";
  import {
    serverUrl,
    baseUrl,
    uploadUrl,
    uploadUrlImg,
    uploadVideoUrl
  } from "@/common/js/public";
  export default {
    name: "",
    components: {
      // myUpload,
      VueCoreImageUpload
    },
    data() {
      return {
        identity: "",
        isPrice: "",
        isHeader: "",
        imgDataUrl: "",
        show: false,
        isimgDataUrl: false,
        msg: [], // 列表数据
        userID: "",
        fileList1: [],
        fileList2: [],
        uploadUrlImg: uploadUrlImg,
        uploadUrls: uploadUrl,
        number: 1,
        isUpload: "",
        dialogVisible: false,
        photoList: "",
        index: 1,
        imgUrl: baseUrl,
        price: 0,
        statusData: {
          //新建
          userId: "",
          photoList: "",
          price: "",
          minPic: "",
          maxPic: "",
          index: ""
        },
        imgpreviewVisible: false, //显示大图
        imgpreviewUrl: "",
        //视屏
        videoURL: '',
        videoPoster: '',
        videoData: {
          url: "",
          dd: "",
        },
        isVideoShow: false,
        videoType: false,
        upload_video_url:uploadVideoUrl,
        videoList: [],
        imgVideoURL: '',
        posterUrl: '',
        videoUrl: '',
        isimgVideoURL: false,
        videoData: [],
        videoTable: [],
        videoPlayShow: false,
        videopreviewurl: ''


      };
    },
    methods: {
      //视屏
      //
      videopreview(url) {
        this.videoPlayShow = true;
        this.$nextTick(() => {
          this.videopreviewurl = url;
          // console.log(document.querySelector("#videoPlay"))

        })



      },
      deletes_video(val) {
        this.$confirm("确定删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            http.post(
              "/back/user/deleteVideo", {
                userId: this.userID,
                isDelete: 1,
                photoList: ""
              },
              () => {
                //this.isupdateMage = true;
                this.$message({
                  type: "success",
                  message: "删除成功!",
                  duration: 1000
                });
                this.getList();
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除！",
              duration: 1000
            });
          });

      },
      submitvideo() {
        var userId = this.$route.query.ids;
        if (this.posterUrl && this.videoUrl) {
          http.post('/back/user/addVideo', {
            userId: userId,
            photoList: "",
            price: 0,
            index: 1,
            minPic: this.posterUrl,
            maxPic: this.videoUrl
          }, (data) => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "提交成功!",
                duration: 1000
              });
              this.isVideoShow = false;
              this.posterUrl = "";
              this.videoUrl = "";
              this.getList();

            }
          })
        } else {
          if (!this.posterUrl) {
            this.$message({
              type: "warning",
              message: "图片未上传",
              duration: 1000
            });
          } else {
            if (!this.videoUrl) {
              this.$message({
                type: "warning",
                message: "video未上传",
                duration: 1000
              });
            }
          }


        }

      },
      videocropSuccess(imgVideoURLs, field) {
        this.posterUrl = imgVideoURLs.dataInfo.min;
        // console.log(imgVideoURLs)
        this.$message({
          type: "success",
          message: "上传成功!",
          duration: 1000
        });
      },
      uploadVideo() {
        this.isVideoShow = true;
      },
      success_video(res, field) {
        //console.log(res)
        this.videoUrl = res.dataInfo
      },

      cropSuccess(imgDataUrl, field) {
        // console.log("-------- crop success --------");
        this.imgDataUrl = imgDataUrl;
        this.isimgDataUrl = true;
      },
      toggleShow() {
        this.show = !this.show;
      },
      imgpreview(val) {
        this.imgpreviewVisible = true;
        this.imgpreviewUrl = val;
        //alert(val)
      },
      uploadHpoto() {
        this.dialogVisible = true;
      },
      submitHpoto() {
        if (this.statusData.minPic && this.statusData.maxPic) {
          http.post("/back/user/addPhoto", this.statusData, () => {
            this.$message({
              type: "success",
              message: "提交成功!",
              duration: 1000
            });
            // this.isupdateMage = true;
            this.dialogVisible = false;
            this.statusData.minPic = "";
            this.statusData.maxPic = "";
            this.$refs.statusUser.resetFields();
            this.getList();
          });
        } else {
          this.$message({
            type: "warning",
            message: "请上传照片!",
            duration: 1000
          });
        }
      },
      submitUpload1() {
        this.$refs.upload1.submit();
      },
      submitUpload2() {
        this.$refs.upload2.submit();
      },
      errorUpload() {
        this.$message({
          type: "error",
          message: "上传失败!",
          duration: 1000
        });
      },
      successUpload1(response, file, fileList) {
        if (response.code != 0) {
          this.$message({
            type: "error",
            message: "上传系统异常!",
            duration: 1000
          });
        } else {
          this.$message({
            type: "success",
            message: "上传成功!",
            duration: 1000
          });
        }
      },
      successUpload2(response, file, fileList) {
        if (response.code != 0) {
          this.$message({
            type: "error",
            message: "上传系统异常!",
            duration: 1000
          });
        } else {
          //console.log(response)
          this.statusData.minPic = response.dataInfo.min;
          this.statusData.maxPic = response.dataInfo.max;
          this.$message({
            type: "success",
            message: "上传成功!",
            duration: 1000
          });
        }
      },
      priceChange(val) {
        this.price = val;
      },
      tableChange(val) {
        this.$confirm("确认提交此次操作吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            http.post(
              "/back/user/editImgInfo", {
                photoId: val.photoId,
                price: val.price,
                userId: this.userID
              },
              () => {
                this.updateMage = true;
                this.$message({
                  type: "success",
                  message: "提交成功!",
                  duration: 1000
                });
                this.getList();
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消提交",
              duration: 1000
            });
          });
        //获取用户当前属性提交
        //console.log(val)
      },
      usersPhotoChange(val) {
        let ids = val.userID;
        let imgId = val.photoId;
        let arr = [];
        //console.log(this.photoList)
        this.photoList.split(",").forEach(item => {
          if (item == imgId) {
            arr.unshift(item);
          } else {
            arr.push(item);
          }
          //console.log(arr)
        });
        this.$confirm("确定设为头像吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            http.post(
              "/back/user/editImgInfo", {
                photoId: val.photoId,
                price: val.price,
                userId: this.userID
              },
              () => {
                this.updateMage = true;
                http.post(
                  "/back/user/deletePhoto", {
                    userId: this.userID,
                    isDelete: 2,
                    photoList: arr.join(",")
                  },
                  () => {
                    this.$message({
                      type: "success",
                      message: "设置成功!",
                      duration: 1000
                    });
                    this.getList();
                  }
                );
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除！",
              duration: 1000
            });
          });
      },
      deletes(val) {
        let userId = this.userID;
        let imgId = val.photoId;
        let listId = this.photoList.split(",").filter(item => {
          if (item == imgId) {
            return false;
          }
          return true;
        });
        this.$confirm("确定删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            http.post(
              "/back/user/deletePhoto", {
                userId: this.userID,
                isDelete: 1,
                photoList: listId.join(",")
              },
              () => {
                //this.isupdateMage = true;
                this.$message({
                  type: "success",
                  message: "删除成功!",
                  duration: 1000
                });
                this.getList();
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除！",
              duration: 1000
            });
          });
      },
      returnUser() {
        this.$router.push("/user/userManage?page=" + this.$route.query.page);
      },
      getList() {
        let _this = this;
        let userID = (this.statusData.userId = this.$route.query.ids);
        http.get("/back/user/listPhoto/" + userID, {}, data => {
          let value = data.dataInfo.pl;
          this.videoTable = data.dataInfo.vl;
          let reData = [];
          let arr = [];
          value.forEach((item, key) => {
            if (item.price == 0) {
              reData.push(item);
              // return item;
            } else {
              arr.push(item);
            }
          });
          this.isPrice = arr.length;
          let photoData = reData.concat(arr);
          if (reData.length == 1) {
            photoData[0].isHeader = 1;
          }
          if (value.length > 0) {
            photoData[0].head = true;
          }
          this.isUpload = photoData.length;
          if (photoData.length > 0) {
            this.index = photoData.length + 1;
          }
          this.statusData.index = this.index;
          this.photoList = photoData
            .map(item => {
              return item.photoId;
            })
            .join(",");
          this.statusData.photoList = this.photoList;
          // if (this.isResh == 1 || this.isupdateMage) {
          http.post(
            "/back/user/deletePhoto", {
              userId: this.userID,
              isDelete: 2,
              photoList: this.photoList
            },
            () => {
              // this.isResh = 2
              // // this.$message({
              // //     type: 'success',
              // //     message: '删除成功!',
              // //     duration: 1000
              // // });
              // // this.getList();
            }
          );
          // }
          this.msg = photoData;
        });
      }
    },
    mounted() {
      //console.log(uploadUrl)
      //  console.log(this.$route)
      this.userID = this.$route.query.ids;
      this.identity = this.$route.query.identity;
      this.getList();
    },
    watch: {
      dialogVisible() {
        // if (this.dialogVisible) {
        this.$nextTick(() => {
          this.$refs.statusUser.resetFields();
          this.fileList1 = [];
          this.fileList2 = [];
          this.imgDataUrl = "";
          this.isimgDataUrl = false;
        });


      },
      isVideoShow() {
        this.$nextTick(() => {
          this.posterUrl = '';
          this.videoUrl = '';
          this.videoList = [];

        })
      },
      videoPlayShow() {
        this.$nextTick(() => {
          if (this.videoPlayShow == false) {
            // console.log(document.getElementById("videoPlay"))
            this.$refs.videoPlay.pause();
          } else {
            this.$refs.videoPlay.play();
          }
        })
      }
    },

  };
</script>
<style lang="scss" scoped>
  .cutImage {
    border: 1px solid #ccc;
  }

  img,
  video {
    height: 60px;
    width: 60px;
    cursor: pointer;
  }

  #imageuploaded {
    color: #fff;
    width: 120px;
    height: 30px;
    background: #409eff;
    line-height: 30px;
    text-align: center;
    position: relative;
    cursor: pointer;
  }

  input[name="pic"],
  input[type="file"] {
    cursor: pointer !important;
  }

  .g-core-image-upload-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;

  }
</style>