<template>
   <div>
      <Navbar :isLogin="isLogin" @changePage="changePage"></Navbar>
      <div class="container">
            <Home v-if="currentPage === 'home'"></Home>
            <Register @changePage="changePage" v-else-if="currentPage === 'register'"></Register>
            <Login @changePage="changePage" v-else-if="currentPage === 'login'"></Login>
            <Board @changePage="changePage" v-else-if="currentPage === 'board'"></Board>
      </div>
   </div>
</template>

<script>
import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Board from './components/Board'

export default {
   name: 'app',
   data() {
      return {
        currentPage: '',
        isLogin : null
      };
   },
   methods : {
      changePage (page, status) {
         // console.log(page)
         this.isLogin = status
         this.currentPage = page
      }  
   },
   components : {
      Home,
      Navbar,
      Register,
      Login,
      Board
   },
   created () {
      if(localStorage.token) {
         this.currentPage = 'board'
         this.isLogin = true
      } else {
         this.currentPage = 'login'
         this.isLogin = false
      }
   }
};
</script>

<style>
   * {
      margin: 0;
      padding: 0;
   }

   
</style>