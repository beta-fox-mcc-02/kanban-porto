<template>
  <div class="login-form-container container">
    <div class="img-login">
      <img class="img-fluid" src="../assets/images/laptop-2298286_1280.jpg" />
    </div>
    <form class="form-login" @submit.prevent="login">
      <Alert
        :alert-class="errorMessages ? 'alert alert-danger' : ''"
        :message="errorMessages"
        v-if="!isLoading && errorMessages"
      ></Alert>
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Please login</h1>
      </div>
      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="email"
          required
          autofocus
        />
        <label for="inputEmail">Email address</label>
      </div>
      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="inputPassword">Password</label>
      </div>
      <ButtonLoading v-if="isLoading" class="btn-block"></ButtonLoading>
      <div v-if="!isLoading">
        <button class="btn btn-lg btn-success btn-block" type="submit">Login</button>
        <div class="form-separator">OR</div>
        <GoogleSigninButton></GoogleSigninButton>
        <hr />
        <div class="register-account">
          <p>Don't have an account ?</p>
          <router-link to="/register">Register a new account</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import GoogleSigninButton from "../components/GoogleSigninButton";
import ButtonLoading from "../components/ButtonLoading";
import Alert from "../components/Alert";
import isAuthenticated from "../helpers/isAuthenticated";
import axios from "../config";
export default {
  name: "Login",
  components: {
    GoogleSigninButton,
    ButtonLoading,
    Alert
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      errorMessages: ""
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: "/users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.token = response.data.token;
          this.isLoading = false;
          this.errorMessages = "";
          this.$router.push({ path: "board" });
        })
        .catch(err => {
          const errors = err.response.data.errors;
          const message = [];
          for (const e of errors) {
            message.push(e);
          }
          this.errorMessages = message.join("\n");
          this.isLoading = false;
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (localStorage.token) {
        isAuthenticated()
          .then(response => {
            next("/board");
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            next();
          });
      } else {
        next();
      }
    });
  }
};
</script>