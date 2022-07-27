import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import { storeKey } from 'vuex'
import Main from '../views/Main.vue'
import store from '../store/index.js'

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/Aside/Home.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/Aside/User.vue')
    },
    {
      path: '/mall',
      name: 'mall',
      component: () => import('../views/Aside/Goods.vue')
    },
    {
      path: '/page1',
      name: 'page1',
      component: () => import('../views/Aside/other/Page1')
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('../views/Aside/other/Page2')
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  // console.log(store)
  if(to.name !== 'login' && !token) {
    // 访问的不是登录页面或者没有token，则强制跳转到登录页面
    next({name: 'login'})
  } else {
    next()
  }
})


export default router