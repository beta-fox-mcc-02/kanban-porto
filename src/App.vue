<template>
    <div>
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
        <RegisterComponent v-if="currentPage === 'register'" v-on:changePage="changePage"></RegisterComponent>
        <LoginComponent v-else-if="currentPage === 'login'" v-on:changePage="changePage"></LoginComponent>
        <div v-else-if="currentPage == 'member'">
            <HeaderComponent v-on:changePage="changePage" v-bind:loginUserName="loginUserName"></HeaderComponent>
            <MainComponent v-on:changePage="changePage" v-bind:categories="categories"></MainComponent>
        </div>
        <AsideComponent v-if="currentPage == 'member' || currentPage == 'newtask'" v-on:changePage="changePage"></AsideComponent>
    </div>
</template>

<script>
import RegisterComponent from './components/Register.vue'
import LoginComponent from './components/Login.vue'
import MainComponent from './components/Main.vue'
import HeaderComponent from './components/Header.vue'
import AsideComponent from './components/Aside.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'

// const serverUrl = 'http://localhost:3000'
const serverUrl = 'https://desolate-mountain-17477.herokuapp.com'

export default {
    name: 'App',
    data() {
        return {
            currentPage: 'register',
            categories: [],
            loginUserName: '',
            isLoading: false,
            fullPage: true
        }
    },
    components: { RegisterComponent, LoginComponent, MainComponent, HeaderComponent, AsideComponent, Loading },
    methods: {
        changePage(fromChild) {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false
            },800)
            this.currentPage = fromChild.page
            if(fromChild.page === 'member') {
                if(fromChild.token) {
                    this.loginUserName = fromChild.name
                    localStorage.setItem('access_token', fromChild.token)
                    localStorage.setItem('login_name', fromChild.name)
                }
                this.fetchAll()
            }
            else if (fromChild.page === 'register') localStorage.clear()
        },
        fetchAll() {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false
            },2000)
            let token = localStorage.getItem('access_token')
            axios({
                method: "GET",
                url: `${serverUrl}/tasks`,
                headers: { token }
            })
            .then((result) => {
                console.log(result)
                this.categories = result.data})
            .catch((err) => console.log(err))
        },
        onCancel() {
            console.log(`cancel`)
        }
    },
    created() {
        let access_token = localStorage.getItem('access_token')
        let login_name = localStorage.getItem('login_name')
        if(access_token) {
            this.loginUserName = login_name
            this.currentPage = 'member'
            this.fetchAll()
        }
    }
}
</script>