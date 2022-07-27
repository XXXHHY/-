import {createStore} from 'vuex'
import tab from './tab.js'
import user from './user.js'

const store = createStore({
  modules: {
    tab,
    user
  },
  state() {
    return {
      iscollapse: false
    }
  },
  mutations: {
    collapse(state) {
      state.iscollapse = !state.iscollapse
    }
  }
})

export default store