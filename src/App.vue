<template>
    <div>
        <DropdownMenu
            @logout="logout"
            @toOrganization="toOrganization"
        ></DropdownMenu>
        <SidebarMenu
            @toRegister='toRegister'
            @logout="logout"
            @toOrganization="toOrganization"
            @toLogin="toLogin"
            :isLogin="isLogin"
            :user="user"
        ></SidebarMenu>
        <Header
            :isLogin="isLogin"
            :user="user"
            @toRegister='toRegister'
            @toLogin="toLogin"
        ></Header>
        <Register 
            v-if="currentPage == 'register'"
            @registerSuccess="toLogin"
        ></Register>
        <Login 
            v-else-if="currentPage == 'login' && !isLogin"
            @afterLogin="afterLogin"
        ></Login>
        <NewOrganizationForm
            v-else-if="currentPage == 'newOrganizationForm'"
            @toOrganization="toOrganization"
            @addOrganizationSuccess="addOrganizationSuccess"
        ></NewOrganizationForm>
        <Dashboard 
            v-else-if="currentPage == 'dashboard'"
            @toAddOrganization="toAddOrganization"
            :organizations="organizations"
            @toKanbanBoard="genKanbanData"
        ></Dashboard>
        <KanbanBoard 
            v-else-if="currentPage == 'kanbanBoard'"
            :orgId="orgId"
            :tasks="tasks"
            :members="members"
            @toNewTaskForm="toNewTaskForm"
            @deleteTaskSuccess="submitTaskSuccess"
            @toUpdateTaskForm="toUpdateTaskForm"
            @changeCategorySuccess="submitTaskSuccess"
        ></KanbanBoard>
        <NewTaskForm
            v-else-if="currentPage == 'newTaskForm'"
            :orgId="orgId"
            @addTaskSuccess="submitTaskSuccess"
        ></NewTaskForm>
        <UpdateTaskForm
            v-else-if="currentPage == 'updateTaskForm'"
            :orgId="orgId"
            :taskId="taskId"
            @toKanbanBoard="backToKanbanData"
            @updateTaskSuccess="submitTaskSuccess"
        ></UpdateTaskForm>
    </div>
</template>

<script>
import axios from 'axios'
import DropdownMenu from './components/DropdownMenu'
import SidebarMenu from './components/SidebarMenu'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import NewOrganizationForm from './components/NewOrganizationForm'
import Dashboard from './components/Dashboard'
import KanbanBoard from './components/KanbanBoard'
import NewTaskForm from './components/NewTaskForm'
import UpdateTaskForm from './components/UpdateTaskForm'

export default {
    name: 'App',
    components: {
        Header,
        DropdownMenu,
        SidebarMenu,
        Login,
        Register,
        NewOrganizationForm,
        Dashboard,
        KanbanBoard,
        NewTaskForm,
        UpdateTaskForm
    },
    data: () => {
        return {
            currentPage: 'login',
            isLogin: false,
            user: {},
            users: [],
            orgId: 0,
            organizations: [],
            tasks: [],
            members: [],
            taskId: 0,

        }
    },
    mounted: () => {
        $('.sidenav').sidenav();
        $(".dropdown-trigger").dropdown();
    },
    methods: {
        fetchKanbanUser() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/users',
            })
                .then(({data}) => {
                    this.users = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        genUserData() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/user',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.user = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchOrganizations() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/organization',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.organizations = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        afterLogin() {
            this.currentPage = 'dashboard'
            this.isLogin = true
            this.fetchOrganizations()
            this.fetchKanbanUser()
        },
        toLogin() {
            this.currentPage = 'login'
        },
        toRegister() {
            this.currentPage = 'register'
        },
        logout() {
            this.currentPage = 'login'
            this.isLogin = false
            this.users = []
            this.orgId = 0
            this.organizations = []
            this.tasks = []
            this.members = []
        },
        toOrganization() {
            this.currentPage = 'dashboard'
            this.fetchOrganizations()
        },
        toAddOrganization() {
            this.currentPage = 'newOrganizationForm'
        },
        backToKanbanData() {
            this.genKanbanData(this.orgId)
        },
        toNewTaskForm() {
            this.currentPage = 'newTaskForm'
        },
        addOrganizationSuccess() {
            this.currentPage = 'dashboard'
            this.fetchOrganizations()
        },
        submitTaskSuccess() {
            this.genKanbanData(this.orgId)
        },
        toUpdateTaskForm(id) {
            this.taskId = id
            this.currentPage = 'updateTaskForm'
        },
        genKanbanData(id) {
            axios({
                method: 'GET',
                url: `http://localhost:3000/organization/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.orgId = data.id
                    this.tasks = data.Tasks
                    this.members = data.Users
                    this.currentPage = 'kanbanBoard'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created () {
        if(localStorage.access_token) {
            this.currentPage = 'dashboard'
            this.isLogin = true
            this.fetchOrganizations()
            this.fetchKanbanUser()
            this.genUserData()
        }
    }
}
</script>