<template>
  <div>
    <NavBar 
      @showContent="showContent"
      :currentPage="currentPage"
      :username="username"
      ></NavBar>
    <LoginForm
      @showContent="showContent"
      v-if="currentPage === 'LoginPage'"
    ></LoginForm>
    <RegisterForm 
      @showContent="showContent"
      v-if="currentPage === 'LoginPage'"
    ></RegisterForm>
    <TaskForm
      @showContent="showContent"
      v-if="currentPage === 'content'"
    ></TaskForm>
    <TaskContainer 
      @showContent="showContent" 
      :tasks="tasks"
      v-if="currentPage === 'content'"
    ></TaskContainer>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import TaskForm from './components/TaskForm'
import TaskContainer from './components/TaskContainer'
import TaskCard from './components/TaskCard'
export default {
  name: "App",

  data() {
    return {
      currentPage : 'LoginPage',
      username: '',
      tasks: []
    }
  },

  components: {
    NavBar,
    LoginForm,
    RegisterForm,
    TaskForm,
    TaskContainer,
    TaskCard
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
        Toastify({
          text: "Error fetching data",
          position: 'center',
          backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
          className: "error",
        }).showToast();
      })
    }
    
  },

  computed: {
    backlog () {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 1) arr.push(task)
        });
      }
      return arr
    },

    todo () {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 1) arr.push(task)
        });
      }
      return arr
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