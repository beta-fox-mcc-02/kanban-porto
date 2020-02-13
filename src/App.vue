<template>
  <div>
    <landingPage></landingPage>
    <!-- <register-page v-if="currentPage === 'register'"></register-page>
    <login-page v-if="currentPage === 'login'"></login-page>
    <kanban-board v-if="currentPage === 'kanban'"></kanban-board> -->
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
      currentPage: 'register'
    }
  },
  components: {
    loginPage,
    registerPage,
    kanbanBoard,
    landingPage
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