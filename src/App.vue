<template>
  <div>
        <RegisterUser 
            v-if="currentPage === 'registerPage'" 
            @registerSuccess="moveToLogin">
            </RegisterUser>
            
        <LoginUser 
            v-else-if="currentPage === 'loginPage'" 
            @loginSuccess="moveToMainView">
            </LoginUser>

        <MainView 
            v-else-if="currentPage === 'mainHomePage'" 
            :dataUserIdTask="dataUserIdTask" 
            @actionLogout="logoutUser"
            @moveFormAdd="formAdd"
            @deleteTask="backMainPage"
            @showEditForm="showEditForm"
            @updateSucces="backMainPage"
            @refetch="backMainPage"
            >
            </MainView>
        
        <AddTask 
            v-else-if="currentPage === 'addTaskPage'"
            @refetch="backMainPage">
            </AddTask>

        <EditTask 
            v-else-if="currentPage === 'updateTaskPage'"
            :dataTaskToEdit="dataTaskToEdit">
            </EditTask>
        
    </div>
</template>

<script>
import RegisterUser from "./components/RegisterUser"
import LoginUser from "./components/LoginUser"
import MainView from "./components/MainView"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"

import axios from 'axios'

export default {
    name : 'App',
    data() {
    return {
      message: 'Hello Vue!',
      currentPage: 'registerPage',
      tasks: [],
      user : {},
      dataTaskToEdit : {}
    };
  },
  components : {
      RegisterUser,
      LoginUser,
      MainView,
      AddTask,
      EditTask
  },
    methods : {
        moveToLogin() {
            this.currentPage = 'loginPage'
        },
        moveToMainView(token) {
            localStorage.setItem('token', token)
            this.fetch()
            this.currentPage = 'mainHomePage'
        },
        formAdd() {
            this.currentPage = 'addTaskPage'
        },

        backMainPage() {
            console.log('APP')
            this.fetch()
            this.checkToken()
        },
        showEditForm(dataTaskToEdit) {
            console.log(dataTaskToEdit, '1111111111111122---------')
            this.dataTaskToEdit = dataTaskToEdit
            this.currentPage = 'updateTaskPage'
        },
        fetch() {
            axios({
                method : "GET",
                url : "http://localhost:3000/tasks",
                headers : {
                    token: localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log(response.data.data, " <<<")
                    this.tasks = response.data.data
                    this.user = response.data.user
                })
                .catch(err => {
                    console.log(err)
                })

        },
        checkToken () {
            if(localStorage.getItem('token')) {
                this.currentPage = 'mainHomePage'
                this.fetch()
            } else {
                this.currentPage = 'loginPage'
            }
        },
        logoutUser() {
            localStorage.removeItem('token')
            this.currentPage = 'loginPage'
        } 
    },
    computed: {
        dataUserIdTask () {
            return {
                tasks: this.tasks,
                user: this.user
            }
        }
    },
    created() {
        this.checkToken()
    }
}
</script>

<style>

</style>