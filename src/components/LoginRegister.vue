<template>

  <div class="login-form">
      <form class="form" @submit.prevent="submitForm">
        <h2 class="text-center" v-if="currentPage==='login'">Login</h2>  
        <h2 class="text-center" v-if="currentPage==='register'">Register</h2>   
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-user"></i></span>
            <input type="text" class="form-control" name="username" placeholder="Username" required="required" v-model="email">				
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
            <input type="password" class="form-control" name="password" placeholder="Password" required="required" v-model="password">				
          </div>
        </div>        
        <button type="submit" class="btn btn-primary login-btn btn-block" v-if="currentPage==='login'">Login</button>
        <button type="submit" class="btn btn-primary login-btn btn-block" v-if="currentPage==='register'">Register</button>
        <div class="or-seperator"><i>or</i></div>
          <p class="text-center">Login with your social media account</p>
            <g-signin-button
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              Sign in with Google
            </g-signin-button>
          <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      </form>
      <p class="text-center text-muted small" v-if="currentPage==='login'">Don't have an account? <a href="#" @click="registerPage">Register here!</a></p>
      <p class="text-center text-muted small" v-if="currentPage==='register'">Already have an account? <a href="#" @click="loginPage">Login here!</a></p>
  </div>

</template>

<script>
import axios from '../config/axios'
export default {
  name:'LoginRegister',
  data(){
    return {
      password:'',
      email:'',
      googleSignInParams: {
        client_id: '836151332075-o6asieenff2i77uum2g7u3auirs0nh3o.apps.googleusercontent.com'
      }
      
    }
  },
  props : {
    currentPage: String
  },
  methods : {
    loginPage(){
      this.$emit('loginPage', 'login')
    },
    registerPage(){
      this.$emit('registerPage', 'register')
    }, 
    submitForm(){
      let email = this.email
      let password = this.password
      if(this.currentPage==='login'){
        axios({
          method : "POST",
          url : "/login",
          data : {
            email, password
          }
        })
        .then(result=>{
          let token = result.data.access_token
          localStorage.setItem('token', token)
          this.$emit('afterLogin')
        })
        .catch(err=>{
          if(typeof err.response.data.msg =="string"){
            this.$emit('errorAuth', err.response.data.msg)
          } else {
            this.$emit('errorAuth', err.response.data.msg[0])
          }
        })
      } else if(this.currentPage==='register'){
        axios({
          method : "POST",
          url : "/register",
          data : {
            email, password
          }
        })
        .then(result=>{
          let token = result.data.access_token
          localStorage.setItem('token', token)
          this.$emit('afterLogin')
        })
        .catch(err=>{
          if(typeof err.response.data.msg =="string"){
            this.$emit('errorAuth', err.response.data.msg)
          } else {
            this.$emit('errorAuth', err.response.data.msg[0])
          }
        })
      }
    },
    googleSignIn(token){
        return axios({
          method: 'post',
          url: '/glogin',
          headers : {
            token
          }
        });
    },
    onSignInSuccess (googleUser) {
        const id_token = googleUser.getAuthResponse().id_token;
        this.googleSignIn(id_token)
        .then(user=>{
          console.log(user);
          const token = user.data.access_token
          localStorage.setItem('token',token)
          this.$emit('afterLogin')

        })
        .catch(err =>{
          console.log(err)
        })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
  /* .g-signin2{
    margin-left: 100px
  } */
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  margin-left: 100px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
.g-signin-button:hover{
  cursor: pointer;
}

</style>