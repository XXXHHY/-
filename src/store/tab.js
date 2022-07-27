import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    tabsList: [{
      path: '/',
      name: 'home',
      label: '首页',
      icon: 'HomeFilled'
    }],
    currentMenu: null,
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
      // console.log('state',state)
    },
    selectMenu(state, val) {
      console.log('state',state)

      if(val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if(result === -1) {
          state.tabsList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // addMenu(state, val) {
    //   if(!Cookie.get('menu')) {
    //     return
    //   }
    //   const menu = JSON.parse(Cookie.get('menu'))
    //   state.menu = menu
    //   const menuArray = []
    //   menu.forEach(item => {
    //     if(item.children) {
    //       item.children = item.children.map(item => {
    //         item.component
    //       })
    //     }
    //   });
    // }
  }
}