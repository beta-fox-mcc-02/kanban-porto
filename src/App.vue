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
        @changePage="changePage" 
        @formEdit="formEdit"
        v-else-if="currentPage === 'landing'"
        ref="home"
        ></Home>
        <AddTask 
        v-else-if="currentPage === 'addtask'" 
        @changePage="changePage"
        ></AddTask>
        <EditForm
        v-else-if="currentPage === 'editForm'"
        :id="id"
        :title="title"
        :CategoryId="CategoryId"
        :UserId="UserId"
        @changePage="changePage"
        ></EditForm>
    </div>
</template>

<script>
import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import AddTask from './components/addTask'
import EditForm from './components/editForm'


export default {
    data () {
        return {
            currentPage: 'login',
            id: "",
            title: "",
            CategoryId: "",
            UserId: ""
        }
    },
    components: {
        Navbar,
        Register,
        Login,
        Home,
        AddTask,
        EditForm
    },
    methods: {
        changePage(page) {
            console.log("SUDAAAAAHH MASUUKK SINI YYAASSSS")
            this.currentPage = page
        },
        formEdit (id, title, CategoryId, UserId) {
            console.log(id, title, CategoryId, UserId, "PUYEEENNGGSSSSS")
            this.id = id
            this.title = title
            this.CategoryId = CategoryId
            this.UserId = UserId
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