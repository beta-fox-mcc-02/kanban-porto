<template>
<div>
    <Navbar
        v-if="currentPage === 'Home'"
        @logout = 'changePage'
        @createTask= 'createTask'
    ></Navbar>
    <kanban-page v-if="currentPage === 'Home'"
        @editTask="editTask"
    ></kanban-page>
    <Login
        v-if="currentPage === 'Login'"
        @showContent = 'changePage'
    ></Login>
    <KanbanCreate
        v-if="currentPage === 'Create'"
        @showContent = 'changePage'
    ></KanbanCreate>
    <KanbanEdit
        v-if="currentPage === 'Edit'"
        @showContent = 'changePage'
        v-bind:editId = 'editId'
    ></KanbanEdit>
    <Register
        v-if="currentPage === 'Register'"
        @showContent = 'changePage'
    ></Register>
</div>
</template>

<script>
import Login from './components/Login.vue';
import Kanban from './components/Kanban.vue';
import Navbar from './components/Navbar.vue';
import KanbanCreate from './components/KanbanCreate.vue';
import KanbanEdit from './components/KanbanEdit.vue';
import Register from './components/Register.vue';

export default {
    name: 'App',
    data(){
        return {
            currentPage: 'Login',
            editId: ''
        }
    }, 
    components: {
        'kanban-page': Kanban,
        Navbar,
        Login,
        KanbanCreate,
        KanbanEdit,
        Register
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },
        editTask(id) {
            this.editId = id;
            this.currentPage = 'Edit'
        },
        createTask() {
            this.currentPage = 'Create'
        },
        register(){
            this.currentPage = 'Register'
        }
    },
    created() {
        if(!localStorage.getItem("token")) this.currentPage = "Login";
        else this.currentPage = "Home";
    }
}
</script>

<style>

</style>