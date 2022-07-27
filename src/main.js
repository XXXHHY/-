import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
// 全局引入字体图标
import * as Ellcon from '@element-plus/icons-vue'

import store from './store'

// 引入axios
import axios from 'axios'

// 引入Mock
import './mock/mock.js'


const app = createApp(App)
// 全局挂载element
app.use(ElementPlus)

// 全部引入element的icon图标
for(let iconName in Ellcon) {
  app.component(iconName,Ellcon[iconName])
}

app.config.globalProperties.$http = axios
app.use(router).mount('#app')

app.use(store)

app.config.devtools = true