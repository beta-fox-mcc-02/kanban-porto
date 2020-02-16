<template>
  <div class="container-register">
    <div class="register-content">
      <center>
        <b>Register</b>
        <hr width="20%" color="steelblue" />
        <form id="register-form" v-on:submit.prevent="registerUser">
          <input
            type="text"
            name="name-register"
            id="name-register"
            placeholder="name..."
            class="input-text"
            v-model="name"
          />
          <br />
          <input
            type="text"
            name="email-register"
            id="email-register"
            placeholder="email addres..."
            class="input-text"
            v-model="email"
          />
          <br />
          <input
            type="password"
            name="password-register"
            id="password-register"
            placeholder="password...."
            class="input-text"
            v-model="password"
          />
          <br />
          <input type="submit" value="register" class="button-primary" />
        </form>
        <button class="button-success" v-on:click="loginForm">Login</button>
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
      password: ""
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
