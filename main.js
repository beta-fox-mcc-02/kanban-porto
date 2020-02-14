import Vue from 'vue'
import App from './src/App.vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '633879662431-bd1872bc0vhu676rbi8isrv730s8iccl.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
new Vue({
    render: h => h(App)
}).$mount('#app')