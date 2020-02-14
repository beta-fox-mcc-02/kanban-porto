<template>
    <div>
        <Navbar @changePage="changePage" :currentPage="currentPage"></Navbar>
        <Home @edit="edit" :currentPage="currentPage"></Home>
        <Login @changePage="changePage" :currentPage="currentPage"></Login>
        <Register @changePage="changePage" :currentPage="currentPage"></Register>
        <Create @changePage="changePage" :currentPage="currentPage"></Create>
        <Edit :currentPage="currentPage"></Edit>
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
            currentPage: "edit"
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
        edit(id){
            console.log(id,'app vue')
        }
    }
}
</script>

<style>

</style>