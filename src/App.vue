<template>
  <div>
    <Navbar :isLogin="isLogin" @changePage="changePage"></Navbar>
    <!-- <Alert v-if="alertStatus"/> -->
    <div v-if="isLoading">
      <Loading ></Loading>
    </div>
    <div class="container" v-else>
      <Home 
        @changePage="changePage"
        v-if="currentPage === 'home'">
      </Home>
      <Auth
        @changePage="changePage"
        v-if="currentPage === 'login' || currentPage === 'register'"
        :currentPage="currentPage">
      </Auth>
      <Boards
        @changePage="changePage"
        :currentPage="currentPage"
        v-if="currentPage === 'board'">
      </Boards>
    </div>
  </div>
</template>

<script>
import Home from './views/Home/Home'
import Navbar from './components/Navbar'
import Boards from './views/Kanban'
import Auth from './views/Auth/index'
import Loading from './components/Loading'

export default {
  name: 'app',
  data() {
    return {
      currentPage: '',
      isLogin : null,
      alertStatus: '',
      isLoading: false
    };
  },
  methods : {
    changePage (page, status) {
      console.log(page)
      this.isLogin = status
      this.currentPage = page
    },
    changeLoading (status) {
      this.isLoading = status
    }
  },
  components : {
    Home,
    Navbar,
    Boards,
    Loading,
    Auth
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