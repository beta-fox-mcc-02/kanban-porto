<template>
 <div>
     <form class="register-login-form center mx-auto" @submit.prevent="register">
      <h2 class="text-center mb-4">Register</h2>
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" placeholder="Enter username" v-model="registerInput.username">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" placeholder="Enter email" v-model="registerInput.email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="registerInput.password">
      </div>
      <button type="submit" class="btn btn-primary btn-block">Submit</button>
      <p class="text-center mt-3">
        <a href="#" @click="changePageTo('login')">I Already Have an Account</a>
      </p>
    </form>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data(){
    return {
      registerInput: {username: '', email: '', password: ''}
    }
  },
  methods: {
    changePageTo(page){
      this.$emit('changePageTo', page)
    },
    register(){
      const data = {
        username: this.registerInput.username,
        email: this.registerInput.email,
        password: this.registerInput.password
      }
      const self = this;

      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data
      })
        .then(res => {
          localStorage.access_token = res.data.access_token;
          // this.registerInput.username = '';
          // this.registerInput.email = '';
          // this.registerInput.password = '';
          console.log(self);
          self.changePageTo('home');
        })
        .catch(err => {
          this.$emit('renderErrorMessage', err.response.data);
        })
    }
  }

}
</script>

<style>

</style>