<template>
  <div class="header-container">
    <el-icon :size="30" color="#fff" @click="changeCollapse"><Grid /></el-icon>
    
      <el-breadcrumb separator="/">
      <el-breadcrumb-item  class="breadcrumb" v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
    </el-breadcrumb>
    
    

    <el-dropdown class="fr" trigger="click">
      <span class="el-dropdown-link">
        <img src="../img/avatar_1.png" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "CommonHeader",
  methods: {
    changeCollapse() {
      this.$store.commit("collapse");
      console.log(this.$store.state.iscollapse);
    },
    // 退出登录
    logout() {
      this.$store.commit('clearToken')
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  }
};
</script>

<style lang='less' scoped>
.fr {
  float: right;
}
.header-container {
  // display: flex;
  padding: 15px 10px;

  .el-breadcrumb {
    display: inline-block;
    // color: #fff;
    vertical-align: top;
    margin-left: 10px;
    margin-top:3px;
    font-size: 22px;

    .breadcrumb {
    color: #fff;
  }
  }

  // .content {
  //   vertical-align: top;
  //   margin-left: 10px;
  //   font-size: 22px;
  //   color: #fff;
  // }

  .el-dropdown-link {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    // background-color: pink;

    img {
      width: 100%;
    }
  }
}
</style>