<template>
  <div class="container-register">
    <h2>Welcome to Kanban APP</h2>
    <div class="register-content">
      <center>
        <b>Sign up</b>
        <hr width="20%" color="steelblue" />
        <div class="error-msg" v-if="error">{{error}}</div>
        <form id="register-form" v-on:submit.prevent="registerUser">
          <input
            type="text"
            name="name-register"
            id="name-register"
            placeholder="name..."
            class="input-text"
            v-model="name"
            required
          />
          <br />
          <input
            type="text"
            name="email-register"
            id="email-register"
            placeholder="email addres..."
            class="input-text"
            v-model="email"
            required
          />
          <br />
          <input
            type="password"
            name="password-register"
            id="password-register"
            placeholder="password...."
            class="input-text"
            v-model="password"
            required
          />
          <br />
          <input type="submit" value="Sign up" class="button-primary" />
        </form>
        <span>
          Already have an account? <a href="#" v-on:click="loginForm">Sign in here</a>
        </span>
      </center>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    registerUser() {
      const name = this.name;
      const email = this.email;
      const password = this.password;
      axios({
        method: "post",
        url: "https://frozen-sands-95268.herokuapp.com/register",
        // url: `http://localhost:3000/register`,
        data: {
          name: name,
          email: email,
          password: password
        }
      })
        .then(response => {
          console.log(response);
          console.log("User created successfully");
          this.loginForm();
        })
        .catch(err => {
          this.error = err.response.data.msg
          console.log(err);
        });
    },
    loginForm() {
      this.$emit("changePage", "login");
    }
  }
};
</script>

<style></style>
