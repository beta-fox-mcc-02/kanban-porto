<template>
    <div>
        <kanBar v-on:changePage="changePage" v-if="currentPage !== 'login' && currentPage !== 'register'"></kanBar>
        <loginPage v-on:showContent="showContent" @changePage="changePage" v-if="currentPage === 'login'" id="login" class="card" style="width: 24rem;"></loginPage>
        <Home v-if="currentPage === 'contentPage'" @ubahTask="ubahTask" @thisPage="thisPage"></Home>
        <AddTask v-on:showContent="showContent" v-if="currentPage === 'addTask'" ></AddTask>
        <EditTask v-on:showContent="showContent" v-if="currentPage === 'editTask'" :editTask="editTask"></EditTask>
        <registerPage v-on:showContent="showContent" @changePage="changePage" v-if="currentPage === 'register'" id="register" class="card" style="width: 24rem;"></registerPage>
    </div>
</template>

<script>
import EditTask from './components/EditTask'
import AddTask from './components/AddTask'
import loginPage from './components/Login'
import kanBar from './components/Navbar'
import Home from './components/Home'
import registerPage from './components/Register'
export default {
    name: 'App',
    data() {
        return {
            currentPage: 'login',
            categories: [],
            editTask: {
                id: '',
                title: '',
                description: ''
            }
        
        }
    },
    components: {
        loginPage,
        kanBar,
        Home,
        AddTask,
        EditTask,
        registerPage
    },
    methods: {
        showContent(page) {
            console.log(page)
            this.currentPage = page
        },
        changePage(page) {
            console.log()
            this.currentPage = page
        },
        ubahTask(data) {
            console.log(data, 'APPP')
            this.editTask.id = Number(data.id)
            this.editTask.title = data.title
            this.editTask.description = data.description
            console.log(editTask.id, editTask.title, editTask.description)
        },
        thisPage(page) {
            this.currentPage = page
        }
    },
    created() {
        if(localStorage.getItem('token')) {
            this.currentPage = 'contentPage'
        }
        else {
            this.currentPage = 'login'
        }
    }
}
</script>

<style>

</style>