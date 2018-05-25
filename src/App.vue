<template>
<div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  /*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
  // background: #1F2D3D;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
.el-upload-list .el-icon-close {
  display: none !important;
}
.el-upload-list .el-icon-close-tip {
  display: none !important;
}
.el-upload-list__item-actions {
  display: none !important;
}
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  //border:1px solid #dfe6ec;
  margin: 10px 0;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.monitorCenterVideo video {
  -o-object-fit: fill;
  object-fit: fill;
  width: 100% !important;
  height: 100% !important;
  max-width: 10000px !important;
  max-height: 10000px !important;
  top: 0 !important;
  left: 0 !important;
}
</style>
