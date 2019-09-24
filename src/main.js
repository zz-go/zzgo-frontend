import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// navigation
import navigation from './components/navigation.vue'
Vue.component('navigation', navigation);
import sidenavigation from './components/side-navigation.vue'
Vue.component('side-navigation', sidenavigation);





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
