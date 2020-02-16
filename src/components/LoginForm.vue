<template>
  <div class="container-login">
    <div class="login-content">
      <center>
        <b>Login</b>
        <hr width="20%" color="steelblue" />
        <form v-on:submit.prevent="loginUser" method="post">
          <input
            type="text"
            name="email-login"
            id="email-login"
            placeholder="email addres..."
            class="input-text"
            v-model="email"
          />
          <br />
          <input
            type="password"
            name="password-login"
            id="password-login"
            placeholder="password...."
            class="input-text"
            v-model="password"
          />
          <br />
          <input type="submit" value="Login" class="button-primary" />
        </form>
        <button type="button" @click.prevent="onSignIn">Google Sign In</button>
        <a href="#" @click="signOut">Sign out Google</a>
        <button class="button-success" v-on:click="registerForm">Register</button>
      </center>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser() {
      const email = this.email;
      const password = this.password;
      console.log("masuk ke function login");
      axios({
        method: "post",
        url: "https://frozen-sands-95268.herokuapp.com/login",
        // url: `http://localhost:3000/login`,
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
          console.log(err);
        });
    },
    onSignIn() {
      // console.log("here");
      this.$gAuth
        .signIn()
        .then(googleUser => {
          //on success
          console.log(googleUser, "dari zonsignin google user");
          // this.isSignIn = this.$gAuth.isAuthorized;
          let access_token = googleUser.getAuthResponse().id_token;
          // console.log(access_token);
          return axios({
            method: "post",
            url: "https://frozen-sands-95268.herokuapp.com/gsignin",
            // url: `http://localhost:3000/gsignin`,
            headers: {
              access_token: access_token
            }
          });
        })
        .then(response => {
          //after ajax
          console.log(response, "masuk response glogin");
          localStorage.setItem("access_token", response.data.token);
          this.$emit("changePage", "kanban");
        })
        .catch(error => {
          //on fail do something
          console.log(error, "error google login");
        });
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    registerForm() {
      this.$emit("changePage", "register");
    }
  }
};
</script>

<style></style>
