import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app');