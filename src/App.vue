<template>
  <div>
    <Navbar
      :currentPage='currentPage'
      @loginPage='loginPage'
      @registerPage='registerPage'
    ></Navbar>
    <ErrorSign 
      :error='error' 
      v-if="error">
    </ErrorSign>
    <LoginRegister
      v-if="currentPage==='login'||currentPage==='register'"
      :currentPage='currentPage'
      @loginPage='loginPage'
      @registerPage='registerPage'
      @errorAuth='errorAuth'
      @afterLogin='fetchData'
    >
    </LoginRegister>
    <div  class="container-fluid"
    v-else-if="currentPage==='home'"
    >
      <div class="row flex-row flex-sm-nowrap">
        <BoardKanban 
        v-for="category in categories" 
        :key="category.id"
        :category='category'
        @fetchData='fetchData'>
        </BoardKanban>
      </div>
    </div>
  </div>
  
</template>

<script>
import Navbar from './components/Navbar'
import ErrorSign from './components/ErrorSign'
import LoginRegister from './components/LoginRegister'
import BoardKanban from './components/BoardKanban'
import axios from './config/axios'

export default {
  name:'App',
  data(){
    return {
      currentPage : 'login',
      error : '',
      email : '',
      password : '',
      categories : []
    }
  },
  components : {
    Navbar,
    ErrorSign,
    LoginRegister,
    BoardKanban
  }, 
  methods : {
    loginPage(payload){
      this.currentPage = payload
      this.error = ''
    }, 
    registerPage(payload){
      this.currentPage = payload
      this.error = ''
    },
    errorAuth(payload){
      this.error = payload 
    }, 
    fetchData(){
      axios({
        method : 'GET',
        url :'/categories',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        this.categories = data.categories
        this.error = ''
        this.currentPage = 'home'
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }, 
  created(){
    if(localStorage.token){
      this.error=''
      this.currentPage = 'home'
      this.fetchData()
    } else {
      this.error=''
      this.currentPage = 'login'
    }
  }
}
</script>

<style>
/* .board-k{
  padding: 0 5px;
} */
</style>