<template>
    <div>
        <Navbar @changePage="changePage" :currentPage="currentPage"></Navbar>
        <Home v-if="currentPage === 'home'" @changePage="changePage" @edit="edit" :currentPage="currentPage"></Home>
        <Login v-if="currentPage === 'login'" @changePage="changePage" :currentPage="currentPage"></Login>
        <Register v-if="currentPage == 'register'" @changePage="changePage" :currentPage="currentPage"></Register>
        <Create  v-if="currentPage == 'create'" @changePage="changePage" :currentPage="currentPage"></Create>
        <Edit v-if="currentPage == 'edit'" @changePage="changePage" :editData="editData" :currentPage="currentPage"></Edit>
    </div>
</template>

<script>
import Navbar from './navbar.vue'
import Home from './home.vue'
import Login from './login.vue'
import Register from './register.vue'
import Create from './create.vue'
import Edit from './edit.vue'

export default {
    data () {
        return {
            currentPage: "home",
            editData:{}
        }
    },
    components:{
        Navbar,
        Home,
        Login,
        Register,
        Create,
        Edit
    },
    methods:{
        changePage(page){
            this.currentPage = page
        },
        edit(data){
            this.editData = data
        }
    },
    created(){
        if(localStorage.token){
            this.currentPage('home')
        }
    }
}
</script>

<style>

</style>