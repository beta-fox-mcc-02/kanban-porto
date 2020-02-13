import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Boards from './components/Boards'
import NewBoard from './components/NewBoard'
import BoardDetail from './components/BoardDetail'
import Register from './components/Register'
import Login from './components/Login'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import interceptors from './helpers/interceptors'

interceptors()

Vue.use(VueRouter)
Vue.use(Buefy)

function isAuthenticated(to, from, next) {
    if (store.getters.isAuthenticated) {
        next()
    } else {
        next({
            path: '/login'
        })
    }
}

const routes = [
    { path: '/', component: Boards, beforeEnter: isAuthenticated },
    {
        path: '/newboard',
        component: NewBoard,
        beforeEnter: isAuthenticated
    },
    {
        path: '/board/:id',
        component: BoardDetail,
        beforeEnter: isAuthenticated
    },
    { path: '/register', component: Register },
    { path: '/login', component: Login }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

Vue.config.productionTip = false

new Vue({ router, store, render: h => h(App) }).$mount('#app')
