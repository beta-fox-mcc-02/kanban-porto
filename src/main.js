import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin) 


 
Vue.use(VueToast)

new Vue({
  render: h => h(App),
}).$mount('#app');