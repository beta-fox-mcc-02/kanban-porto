<template>
    <div>
        <Nav :currentPage='currentPage' @currentPage='logout'></Nav>
        <Login v-if="currentPage === 'homePage'" @currentPage='isLogin'></Login>
        <Organization v-else-if="currentPage === 'mainPage'" @currentPage="showTask"></Organization>
        <Task v-else-if="currentPage === 'taskPage'" @currentPage="showOrg"></Task>
    </div>
</template>

<script>
import Nav from './components/nav-component'
import Login from './components/login-component'
import Organization from './components/org-component'
import Task from './components/task-component'
export default {
    data () {
        return {
        currentPage : '',
        myOrg : [],
        orgName : '',
        board : [],
        categoryName : '',
        }
    },
    components : {
        Login,
        Nav,
        Organization,
        Task
    },
    methods : {
        isLogin (payload){
            // console.log(payload)
            this.currentPage = payload
        },
        showTask (payload) {
            this.currentPage = payload
        },
        showOrg (payload){
            localStorage.removeItem('id')
            this.currentPage = payload
        },
        logout (payload){
            localStorage.clear()
            this.currentPage = payload
        }
    },
    created () {
        if(localStorage.token){
            if(localStorage.id){
                this.currentPage = 'taskPage'
            }
            else this.currentPage = 'mainPage'
        }
        else this.currentPage = 'homePage'
    }
}
</script>

<style scoped>

</style>