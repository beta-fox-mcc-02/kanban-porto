<template>
    <div>
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
import RegisterComponent from './components/register.vue'
import LoginComponent from './components/login.vue'
import MainComponent from './components/main.vue'
import HeaderComponent from './components/header.vue'
import AsideComponent from './components/aside.vue'

export default {
    name: 'App',
    data() {
        return {
            currentPage: 'register',
            categories: [],
            loginUserName: ''
        }
    },
    components: { RegisterComponent, LoginComponent, MainComponent, HeaderComponent, AsideComponent },
    methods: {
        changePage(fromChild) {
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
            let token = localStorage.getItem('access_token')
            axios({
                method: "GET",
                url: "http://localhost:3000/task/findAll",
                headers: { token }
            })
            .then((result) => {
                console.log(result)
                this.categories = result.data})
            .catch((err) => console.log(err))
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