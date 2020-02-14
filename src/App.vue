<template>
  <div>
    <navbar :isLoggedIn="isLoggedIn" @logout="logout"></navbar>
    <landingPage v-if="!isLoggedIn" @login="login"></landingPage>
    <!-- <register-page v-if="currentPage === 'register'"></register-page> -->
    <kanban-board v-if="isLoggedIn"></kanban-board> 
  </div>
</template>

<script>
import navbar from './components/NavbarN'
import registerPage from './components/register'
import kanbanBoard from './components/KanbanBoard'
import landingPage from './components/LandingPage'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,

    }
  },
  methods: {
    checkLogin () {
      if (localStorage.token) this.isLoggedIn = true
      else this.isLoggedIn = false
    },
    login () {
      this.checkLogin()
    },
    logout () {
      localStorage.clear()
      this.checkLogin()
      this.$gAuth.signOut()
        .then(() => {
          // things to do when sign-out succeeds
          console.log('user sign out')
        })
        .catch(error  => {
          // things to do when sign-out fails
          console.log('error sign out', error)
        })
    }
  },
  components: {
    navbar,
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