<template>
  <div>
        <MainNavbar :currentPage='currentPage' @showDashboard='showDashboard' @showRegister='showRegister' @showLogin='showLogin' @logout='logout'></MainNavbar>
        <RegisterForm :currentPage='currentPage' @changePage='changePage'></RegisterForm>
        <LoginForm :currentPage='currentPage' @changePage="changePage" @fetchAll="fetchAll" @showRegister="showRegister"></LoginForm>
        <Dashboard :currentPage='currentPage' :tasks='tasks' @showAddForm='showAddForm' @renderEditTask='renderEditTask' @deleteTask='deleteTask'></Dashboard>
        <AddForm :newTask='newTask' :currentPage='currentPage' @fetchAll='fetchAll' @changePage='changePage' @showDashboard='showDashboard'></AddForm>
        <EditForm :currentPage='currentPage' :editTaskObj='editTaskObj' @editTask='editTask' @showDashboard='showDashboard'></EditForm>
  </div>
</template>

<script>
import MainNavbar from './components/MainNavbar'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'
import axios from 'axios'

export default {
  name: 'App',
  components: {
      MainNavbar,
      RegisterForm,
      LoginForm,
      Dashboard,
      AddForm,
      EditForm
  },
  data() {
    return {
     currentPage: 'frontPage',
     errorMessage: '',
     tasks: [],
     newTask: { 
         title: ''
     },
     editTaskObj: {}      
    }
  },

    methods: {
        showRegister: function() {
            this.currentPage = 'register'
        },
        showLogin: function() {
            this.currentPage = 'login'
        },
        showAddForm: function() {
            this.currentPage = 'addFormPage'
        },
        showEditForm: function() {
            this.currentPage = 'editFormPage'
        },
        showDashboard: function() {
            this.currentPage = 'dashboard'
        },
        //user section
        checkToken() {
            if(localStorage.getItem(`access_token`)) {
                console.log('masuk checkToken')
                this.currentPage = 'dashboard'
                this.fetchAll()
            } else {
                this.currentPage = 'frontPage'
            }
        },
        logout() {
            localStorage.removeItem(`access_token`)
            this.currentPage = 'frontPage'
        },
        //task section
        fetchAll() {
            axios({
                method: 'GET',
                url: `http://localhost:3000/tasks`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.tasks = response.data.data
                console.log(response.data.data)
            })
            .catch(response => 
                console.log(response))
        },
        renderEditTask(id) {
            this.currentPage = 'editFormPage'
            axios({
                method: 'GET',
                url: `http://localhost:3000/tasks/${id}`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                console.log(response.data.data)
                this.editTaskObj = response.data.data
            })
            .catch(response => {
                this.response
            })
        },
        editTask(id) {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/tasks/${id}`,
                data: {
                    title: this.editTaskObj.title,
                    category: this.editTaskObj.category
                },
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.currentPage = 'dashboard'
                this.fetchAll()
            })
            .catch(response => {
                console.log(response)
            })
        },
        deleteTask(id) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/tasks/${id}`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.currentPage = 'dashboard'
                this.fetchAll()
            })
            .catch(response => {
                console.log(response)
            })
        },
        changePage(currentPage) {
            this.currentPage = currentPage
        }

    },
    created() {
        this.checkToken()
        
    }
}
</script>