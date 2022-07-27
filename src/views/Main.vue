<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <!-- 侧边栏区域 -->
        <common-aside></common-aside>
        <!-- 侧边栏区域 -->
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部区域 -->
          <common-header></common-header>
          <!-- 头部区域 -->
        </el-header>
        <el-main>
          <!-- 主体区域 -->
          <router-view></router-view>
          <!-- 主体区域 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader
  }
};
</script>

<style lang='less' scoped>
.el-header {
  background-color: black;
}

.el-main {
  padding-top: 0;
}
</style>