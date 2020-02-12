import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const gauthOption = {
  clientId: '',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(Vuetify)

new Vue({
  render: h => h(App),
}).$mount('#app');