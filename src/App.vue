<template>
  <div>
    <navbar :isLoggedIn="isLoggedIn" @logout="logout" @openRegister="openRegisterr" @openLogin="openLogins"></navbar>
    <landingPage v-if="!isLoggedIn" @login="login" :openRegister="openRegister" :openLogin="openLogin"></landingPage>
    <kanban-board v-if="isLoggedIn"></kanban-board> 
  </div>
</template>

<script>
import navbar from './components/NavbarN'
import kanbanBoard from './components/KanbanBoard'
import landingPage from './components/LandingPage'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      openRegister: 0,
      openLogin: 0
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
    },
    openRegisterr () {
      this.openRegister++
    },
    openLogins () {
      this.openLogin++
    }
  },
  components: {
    navbar,
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