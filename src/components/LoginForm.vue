<template>
  <div class="container-login">
    <h2>Welcome to Kanban APP</h2>
    <div class="login-content">
      <center>
        <b>Sign in</b>
        <hr width="20%" color="steelblue" />
        <div class="error-msg" v-if="error">{{error}}</div>
        <form v-on:submit.prevent="loginUser" method="post">
          <input
            type="text"
            name="email-login"
            id="email-login"
            placeholder="email addres..."
            class="input-text"
            v-model="email"
            required
          />
          <br />
          <input
            type="password"
            name="password-login"
            id="password-login"
            placeholder="password...."
            class="input-text"
            v-model="password"
            required
          />
          <br />
          <input type="submit" value="Sign in" class="button-primary" />
        </form>
        <button type="button" class="google-button" @click.prevent="onSignIn"><img src="https://cdn.iconscout.com/icon/free/png-256/google-2038770-1721659.png" width="20" height="20" alt="G"> Sign in with Google</button>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
        <br> <br>
        <div class="loader" v-if="loading"></div> 
        <span>
          Don't have an account? <a href="#" v-on:click="registerForm">Signup here</a>
        </span>
      </center>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

// let baseURL = 'https://frozen-sands-95268.herokuapp.com'
const baseURL = 'http://localhost:3000'

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  },
  methods: {
    loginUser() {
      const email = this.email;
      const password = this.password;
      console.log("masuk ke function login");
      this.loading = true
      axios({
        method: "post",
        url: `${baseURL}/login`,
        data: {
          email: email,
          password: password
        }
      })
        .then(response => {
          localStorage.setItem("access_token", response.data.token);
          //   this.fetchAll();
          console.log(this.backlog);
          this.$emit("changePage", "kanban");
        })
        .catch(err => {
          this.error = err.response.data.msg
          console.log(err, "gagal login user");
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSignIn() {
      // console.log("here");
      this.$gAuth
        .signIn()
        .then(googleUser => {
          //on successscroll
          console.log(googleUser, "dari onsignin google user");
          // this.isSignIn = this.$gAuth.isAuthorized;
          let access_token = googleUser.getAuthResponse().id_token;
          // console.log(access_token);
          return axios({
            method: "post",
            url: `${baseURL}/gsignin`,
            headers: {
              access_token: access_token
            }
          });
        })
        .then(response => {
          //after ajax
          // console.log(response, "masuk response glogin");
          localStorage.setItem("access_token", response.data.token);
          this.$emit("changePage", "kanban");
        })
        .catch(error => {
          //on fail do something
          console.log(error, "error google login");
        });
    },
    registerForm() {
      this.$emit("changePage", "register");
    }
  }
};
</script>

<style></style>
