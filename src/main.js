import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
import gauthOption from './plugins/gAuth'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../assets/css/all.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app')