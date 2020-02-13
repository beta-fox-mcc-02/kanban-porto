<template>
    <div>
        <Navbar 
        @changePage="changePage" 
        :currentPage="currentPage"
        ></Navbar>
        <Register 
        @changePage="changePage" 
        v-if="currentPage === 'register'"
        ></Register>
        <Login 
        @changePage="changePage" 
        v-else-if="currentPage === 'login'"
        ></Login>
        <Home 
        @changePaqe="changePage" 
        v-else-if="currentPage === 'landing'"
        ></Home>
        <AddTask 
        v-else-if="currentPage === 'addtask'" 
        @changePage="changePage"
        ></AddTask>
    </div>
</template>

<script>
import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import AddTask from './components/addTask'


export default {
    data () {
        return {
            currentPage: 'register'
        }
    },
    components: {
        Navbar,
        Register,
        Login,
        Home,
        AddTask
    },
    methods: {
        changePage(page) {
            this.currentPage = page
        }
    },
    created() {
        if (localStorage.token) {
            this.currentPage = 'landing'
        }
    }
}
</script>

<style>

</style>