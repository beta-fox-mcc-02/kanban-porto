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
        @notifSuccess="notifSuccess"
        @notifFailed="notifFailed"
        ></Login>
        <Home 
        @changePage="changePage" 
        @formEdit="formEdit"
        @notifFailed="notifFailed"
        v-else-if="currentPage === 'landing'"
        ></Home>
        <AddTask 
        v-else-if="currentPage === 'addtask'" 
        @changePage="changePage"
        @notifSuccess="notifSuccess"
        @notifFailed="notifFailed"
        ></AddTask>
        <EditForm
        v-else-if="currentPage === 'editForm'"
        :id="id"
        :title="title"
        :CategoryId="CategoryId"
        :UserId="UserId"
        @notifSuccess="notifSuccess"
        @notifFailed="notifFailed"
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
        },
        notifSuccess(msg) {
            Toastify({
                text: `${msg}`,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: 'left',
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true,
            }).showToast();
        }, 
        notifFailed(msg) {
            Toastify({
                text: `${msg}`,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: 'left',
                backgroundColor: "linear-gradient(to right, #f64b3c, #c81912)",
                stopOnFocus: true,
            }).showToast();    
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