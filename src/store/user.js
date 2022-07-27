import Cookie from 'js-cookie'

export default {
  state: {
    token: '',
    name: '',
    position: '',
    time: '',
    location: ''
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
      console.log(state.token,'settoken')
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state) {
      console.log('gettoken')
      state.token = state.token || Cookie.get('token')
    },
    setName(state,val) {
      console.log(val,'val');
      state.name = val
    },
    getName(state) {
      return state.name
    }
  }
}