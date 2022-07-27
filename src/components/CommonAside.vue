<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="iscollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <h3>{{ iscollapse ? '后台' :'通用后台管理系统'}}</h3>
    <el-menu-item  v-for="item in noChildren" :index="item.path" :key="item.path" @click="menuChange(item)">
      <component :is="item.icon" style="width: 16px; height: 16px;"></component>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
    <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template #title>
        <component :is="item.icon" style="width: 16px; height: 16px;"></component>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="(item, erindex) in item.children" :key="item.path">
        <el-menu-item :index="erindex" @click="menuChange(item)">{{ item.label }}</el-menu-item>
      </el-menu-item-group>
     
    </el-sub-menu>
    
  </el-menu>
</template>

<script>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

export default {
  name: "CommonAside",
  data() {
    return {
      // iscollapse: false,
      menu: [{
          path: '/',
          name: 'home',
          label: '首页',
          icon: 'HomeFilled',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'Goods',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'Stamp',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'CirclePlus',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    menuChange(item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('selectMenu', item)
    },

  },
  computed: {
    noChildren() {
      if(this.$store.state.user.token !== 'administrators') {
        return this.menu.filter(item => item.name === 'home' || item.name === 'mall')
      } else {
        return this.menu.filter(item => !item.children)
      }
    },
    hasChildren() {
      // console.log(this.$store.state.user.token,'yyyyyyyyyyyyyyyyyy')
      if(this.$store.state.user.token !== 'administrators') {
        return
      } else {
        return this.menu.filter(item => item.children)
      }
      
    },
    iscollapse() {
      return this.$store.state.iscollapse
    }

  },
  
};
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  border: none;
  h3 {
    margin: 0;
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>