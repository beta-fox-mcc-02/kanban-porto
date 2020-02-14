<template>
  <div>
    <landingPage v-if="currentPage === 'landing'"></landingPage>
    <!-- <register-page v-if="currentPage === 'register'"></register-page>
    <login-page v-if="currentPage === 'login'"></login-page> -->
    <kanban-board v-if="currentPage === 'kanban'"></kanban-board> 
  </div>
</template>

<script>
import loginPage from './components/login'
import registerPage from './components/register'
import kanbanBoard from './components/KanbanBoard'
import landingPage from './components/LandingPage'

export default {
  name: 'App',
  data() {
    return {
      currentPage: ''
    }
  },
  methods: {
    checkLogin () {
      if (localStorage.token) this.currentPage = 'kanban'
      else this.currentPage = 'landing'
    }
  },
  components: {
    loginPage,
    registerPage,
    kanbanBoard,
    landingPage
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style>
 body {
   background-image: url('../assets/img/bg-1.jpg');
   background-attachment: fixed;
   background-position: center center;
   background-repeat: no-repeat;
   background-size: cover;
 }
</style>