<template>
   <!-- login -->
    <div class="row" id="login" style="margin: 10rem;">
        <div class="col s4 push-s4">
          <div class="card z-depth-3">
            <div class="card-content">
              <span class="card-title center">Login</span>
              <form id="login-form" @submit.prevent="login">
                <div class="row">
                  <div class="col s12 input-field">
                    <input id="user" type="text" class="validate" v-model="user" required>
                    <label for="user">Username /  Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 input-field">
                    <input id="password" type="password" class="validate" v-model="password" required>
                    <label for="password">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 center">
                    <button class="btn waves-effect waves-dark" type="submit" name="action">Login</button>
                  </div>
                </div>
              </form>

                <div class="row">
                  <div class="col s12 center">
                    <p>Or sign in with Google account</p>
                    <div class="g-signin2" data-onsuccess="onSignIn">GOOGLE</div>
                  </div>
                </div>
            </div>
          </div>
          
          <!-- register button -->
          <div class="card z-depth-3 center">
            <div class="card-content">
              <span class="card-title center">Don't have an account?</span>
              <a href="#modal1" 
                class="waves-effect waves-light btn-large" 
              >
                Register Now!</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "LoginForm",

  data() {
    return {
      user: "",
      password: ""
    }
  },

  methods: {
    login() {
      axios.post('http://localhost:3000/users', {
        user: this.user,
        password: this.password
      })
      .then(({data}) => {
        localStorage.token = data.token
        localStorage.username = data.username
        this.user = ''
        this.password = ''
        this.$emit('showContent')
        Toastify({
          text: "Login success",
          position: 'center',
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "success",
        }).showToast();
      })
      .catch(err => {
        this.user = ''
        this.password = ''
        Toastify({
          text: "Wrong username, email, or password",
          position: 'center',
          backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
          className: "error",
        }).showToast();
      })
    }
  }
}
</script>

<style>

</style>