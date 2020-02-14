<template>
  <div>
    <NavBar 
      @showContent="showContent"
      @notification="notification"
      :currentPage="currentPage"
      :username="username"
      ></NavBar>
    <LoginForm
      @showContent="showContent"
      @notification="notification"
      @registerModalToggle="registerModalToggle"
      v-if="currentPage === 'LoginPage'"
    ></LoginForm>
    <RegisterModal 
      @showContent="showContent"
      @notification="notification"
      @registerModalToggle="registerModalToggle"
      v-if="showRegisterModal"
    ></RegisterModal>
    <TaskForm
      @showContent="showContent"
      @notification="notification"
      v-if="currentPage === 'content'"
    ></TaskForm>
    <TaskContainer 
      @showContent="showContent" 
      @notification="notification"
      @updateModalToggle="updateModalToggle"
      @getTask="getTask"
      :tasks="tasks"
      v-if="currentPage === 'content'"
    ></TaskContainer>
    <UpdateModal
      v-if="showUpdateModal"
      @updateModalToggle="updateModalToggle"
      @notification="notification"
      @showContent="showContent"
      :task="task"
    ></UpdateModal>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterModal from './components/RegisterModal'
import TaskForm from './components/TaskForm'
import TaskContainer from './components/TaskContainer'
import UpdateModal from './components/UpdateModal'

export default {
  name: "App",

  data() {
    return {
      currentPage : 'LoginPage',
      username: '',
      tasks: [],
      task: {},
      showRegisterModal: false,
      showUpdateModal: false,
    }
  },

  components: {
    NavBar,
    LoginForm,
    RegisterModal,
    TaskForm,
    TaskContainer,
    UpdateModal
  },

  methods: {
    showContent() {
      if(!localStorage.token) {
        this.currentPage = 'LoginPage'
        this.username = ''
      } else {
        this.currentPage = 'content'
        this.username = localStorage.username
        this.findAllTask()
      }
    },

  findAllTask() {
    axios.get('http://localhost:3000/tasks', {
      headers: {
        token: localStorage.token
      }
    })
      .then(({data}) => {
        this.tasks = data
        this.$emit('showContent')
      })
      .catch(err => {
        this.notification(err)
      })
    },

    notification(err, success) {
      if(err) {
        Toastify({
          text: `${err}`,
          position: 'center',
          backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
          className: "error",
        }).showToast();
      } else {
        Toastify({
            text: `${success}`,
            position: 'center',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "success",
          }).showToast();
      }
    },

    registerModalToggle() {
      console.log(this.showRegisterModal)
      this.showRegisterModal = !this.showRegisterModal
    },

    updateModalToggle() {
      this.showUpdateModal = !this.showUpdateModal
    },

    getTask(payload) {
      this.task = payload
    }
    
  },

  //hook lifecycle
  created() {
    this.showContent()
  }

  
}
</script>

<style>

</style>