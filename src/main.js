import GAuth from 'vue-google-oauth2'
import Vue from 'vue';
import App from './App.vue';

import '../assets/style/style.css'

const gauthOption = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app');