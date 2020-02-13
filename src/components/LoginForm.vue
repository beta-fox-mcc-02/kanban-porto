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
        <button class="button-success" v-on:click="registerForm">
          Register
        </button>
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
        url: "http://localhost:3000/login",
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
    registerForm() {
      this.$emit("changePage", "register");
    }
  }
};
</script>

<style></style>
