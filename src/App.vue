<template>
<div>
    <!-- <loginPage v-on:showContent="showContent" v-if="currentPage === 'login'"></loginPage>
    <kanbanPage v-if="currentPage === 'contentPage'"></kanbanPage> -->
<!--    
    <FormRegister
        v-if="currentPage === 'Register'"
    ></FormRegister>
    <FormKanban
        v-if="currentPage === 'Task'"
    ></FormKanban> -->
    <Navbar
        v-if="currentPage === 'Home'"
        @logout = 'changePage'
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
</div>
</template>

<script>
import Login from './components/Login.vue';
import Kanban from './components/Kanban.vue';
import Navbar from './components/Navbar.vue';
import KanbanCreate from './components/KanbanCreate.vue';
import KanbanEdit from './components/KanbanEdit.vue';
// import FormRegister from './components/Register.vue'
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
        KanbanEdit
        // loginPage: loginPage,
        // kanbanPage
        // , FormRegister
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },
        editTask(id) {
            this.editId = id;
            this.currentPage = 'Edit'
        }
    },
    created() {
        // if(!localStorage.getItem("token")) this.currentPage = "Login";
        // else this.currentPage = "dashboard";
    }
}
</script>

<style>

</style>