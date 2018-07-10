<template>
     <section style="position:relative;" >
         <!-- <div>{{{videoHtml}}}</div> -->
             <div v-if="isShow" :id="'bttom_send'+roomId"><el-button type="primary" size="mini" @click="closedLive" >关播</el-button></div>
             <div v-if="isShow" :id="'online'+roomId">online:{{line}}
               <div v-if="isShow" >roomId:{{roomId}}</div>
             <div v-if="isShow" >hotId:{{hotId}}</div>
             </div>
             
       <div id="video" class="monitorCenterVideo" ref="video" style="margin:0 auto;position:relative;" v-html="videoHtml"></div>
     </section>
</template>

<script>
import AgoraRTC from "@/common/js/AgoraRTCSDK-2.2.0";
import http from "@/api/http";
export default {
  props: ["roomId", "line", "hotId", "isShow"],
  data() {
    return {
      channel_key: "69ce977e4bf249f998b68d16ebb10152",
      videoHtml: "<div></div>",
      localStream: "",
      client: "",
      stream: ""
    };
  },

  mounted() {
    this.joinRoom();
  },
  methods: {
    closedLive() {
      this.$confirm("此操作将关闭直播, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.post("/back/video/stop", { hi: this.hotId }, res => {
            this.$message({
              type: "success",
              message: "关闭成功!"
            });
            this.hideButton(true);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    },
    hideButton(bool) {
      let that = this;
      if (this.isShow) {
        if (bool) {
          document
            .getElementById("bttom_send" + that.roomId)
            .setAttribute("style", "display:none");
          document
            .getElementById("online" + that.roomId)
            .setAttribute("style", "display:none");
        } else {
          document
            .getElementById("bttom_send" + that.roomId)
            .setAttribute("style", "display:block");
          document
            .getElementById("online" + that.roomId)
            .setAttribute("style", "display:block");
        }
      }
    },
    joinRoom() {
      let that = this;
      let client = null;
      let channelKey = "";
      var channel_key = null;
      let localStream = null;
      client = AgoraRTC.createClient({ mode: "h264_interop" });
      this.client = client;
      client.init(
        that.channel_key,
        function() {
          console.log("AgoraRTC client initialized");
          client.join(
            channel_key,
            that.roomId.toString(),
            null,
            function(uid) {
              console.log("User " + uid + " join channel successfully");
              // if (document.getElementById("video").checked) {
              let camera = "";
              let microphone = "";
              localStream = that.localStream = AgoraRTC.createStream({
                streamID: uid,
                audio: false,
                cameraId: camera,
                microphoneId: microphone,
                video: true,
                screen: false
              });
              localStream.setVideoProfile("1080p_1");
              localStream.on("accessAllowed", function() {
                console.log("accessAllowed");
              });

              // The user has denied access to the camera and mic.
              localStream.on("accessDenied", function() {
                console.log("accessDenied");
              });
              // localStream.init(
              //   function() {
              //     console.log("getUserMedia successfully");
              //     // localStream.play("agora_local");

              //     // client.publish(localStream, function(err) {
              //     //   console.log("Publish local stream error: " + err);
              //     // });

              //     // client.on("stream-published", function(evt) {
              //     //   console.log("Publish local stream successfully");
              //     // });
              //   },
              //   function(err) {
              //     console.log("getUserMedia failed", err);
              //   }
              // );
              // }
            },
            function(err) {
              console.log("Join channel failed", err);
            }
          );
        },
        function(err) {
          console.log("AgoraRTC client init failed", err);
        }
      );

      client.on("error", function(err) {
        console.log("Got error msg:", err.reason);
        if (err.reason === "DYNAMIC_KEY_TIMEOUT") {
          client.renewChannelKey(
            channelKey,
            function() {
              console.log("Renew channel key successfully");
            },
            function(err) {
              console.log("Renew channel key failed: ", err);
            }
          );
        }
      });

      client.on("stream-added", function(evt) {
        var stream = evt.stream;
        that.stream = stream;
        console.log("New stream added: " + stream.getId());
        console.log("Subscribe ", stream);
        client.subscribe(stream, function(err) {
          console.log("Subscribe stream failed", err);
        });
      });

      client.on("stream-subscribed", function(evt) {
        var stream = evt.stream;
        console.log("Subscribe remote stream successfully: " + stream.getId());
        that.hideButton();
        if (!document.getElementById("agora_remote" + stream.getId())) {
          var str =
            '<div id="agora_remote' +
            stream.getId() +
            '" style=" width:90px;height:160px;display:inline-block;" ref="agora_remote' +
            stream.getId() +
            '" ></div>';
          that.videoHtml = str;
        }
        stream.play("agora_remote" + stream.getId());
        document
          .querySelector("#agora_remote" + stream.getId() + " video")
          .setAttribute("controls", true);
        document.querySelector(
          "#agora_remote" + stream.getId() + " video"
        ).volume = 0;
        document.querySelector(
          "#agora_remote" + stream.getId() + " audio"
        ).volume = 0;

        that.unpublish();
      });

      client.on("stream-removed", function(evt) {
        var stream = evt.stream;
        stream.stop();
        stream.close();
        document.getElementById("agora_remote" + stream.getId()).remove();
        that.videoHtml = "";
        that.client = "";
        that.hideButton(true);
        console.log("Remote stream is removed " + stream.getId());
      });

      client.on("peer-leave", function(evt) {
        var stream = evt.stream;
        if (stream) {
          document.getElementById("agora_remote" + stream.getId()).remove();
          stream.stop();
          stream.close();
          that.videoHtml = "";
          that.client = "";
          that.hideButton(true);
          console.log(evt.uid + " leaved from this channel");
          // that.sendLeave(false);
        }
      });
      // this.unpublish();
    },
    unpublish() {
      // document.getElementById("publish").disabled = false;
      // document.getElementById("unpublish").disabled = true;
      this.client.unpublish(this.localStream, function(err) {
        console.log("Unpublish local stream failed" + err);
      });
    },
    leave() {
      if (this.client) {
        this.client.leave(
          function() {
            console.log("Leavel channel successfully");
          },
          function(err) {
            console.log("Leave channel failed");
          }
        );
      }
    }
  },
  destroyed() {
    this.leave();
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
section {
  overflow: hidden;
  //   height: 160px;
  //   width: 90px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
