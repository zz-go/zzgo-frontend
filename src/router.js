import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './views/Dashboard.vue'

import Login from './views/outside/Login.vue'
import Forgot_Password from './views/outside/Forgot_Password.vue'
import Set_Password from './views/outside/Set_Password.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      props: { navigation: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: { navigation: false }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: Forgot_Password,
      props: { navigation: false }
    },
    {
      path: '/set-password',
      name: 'set-password',
      component: Set_Password,
      props: { navigation: false }
    },
  ]
})
