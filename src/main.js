import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '520456767331-ug8raloi9un7v3h4k9ecr6l7po58vd4m.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue ({
    render: h => h(App),
}).$mount('#app')