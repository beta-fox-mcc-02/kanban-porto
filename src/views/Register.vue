<template>
  <div class="register-form-container container">
    <div class="img-login">
      <img class="img-fluid" src="../assets/images/laptop-2298286_1280.jpg" />
    </div>
    <form class="form-register" @submit.prevent="registerUser">
      <Alert
        :alert-class="errorMessages ? 'alert alert-danger' : ''"
        :message="errorMessages"
        v-if="!isLoading && errorMessages"
      ></Alert>
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Register here</h1>
      </div>
      <div class="form-label-group">
        <input
          type="text"
          id="input-firstname"
          v-model="firstname"
          class="form-control"
          placeholder="Firstname"
          required
          autofocus
        />
        <label for="input-firstname">Firstname</label>
      </div>
      <div class="form-label-group">
        <input
          type="text"
          id="input-lastname"
          v-model="lastname"
          class="form-control"
          placeholder="Lastname"
          autofocus
        />
        <label for="input-lastname">Lastname</label>
      </div>
      <div class="form-label-group">
        <input
          type="text"
          id="input-username"
          v-model="username"
          class="form-control"
          placeholder="Username"
          required
          autofocus
        />
        <label for="input-username">Username</label>
      </div>
      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          v-model="email"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />
        <label for="inputEmail">Email address</label>
      </div>
      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          v-model="password"
          class="form-control"
          placeholder="Password"
          required
        />
        <label for="inputPassword">Password</label>
      </div>
      <ButtonLoading v-if="isLoading" class="btn-block"></ButtonLoading>
      <div v-if="!isLoading">
        <button class="btn btn-lg btn-success btn-block" type="submit">Register</button>
        <div class="form-separator">OR</div>
        <GoogleSigninButton></GoogleSigninButton>
        <hr />
        <div class="register-account">
          <p>Already have an account ?</p>
          <router-link to="/login">Please login here</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const BASE_URL = "http://localhost:3000";
import GoogleSigninButton from "../components/GoogleSigninButton";
import ButtonLoading from "../components/ButtonLoading";
import Alert from "../components/Alert";
import isAuthenticated from "../helpers/isAuthenticated";
import axios from "axios";
export default {
  name: "Register",
  components: {
    GoogleSigninButton,
    ButtonLoading,
    Alert
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      isLoading: false,
      errorMessages: ""
    };
  },
  methods: {
    registerUser() {
      this.isLoading = true;
      axios
        .post(BASE_URL + "/users/register", {
          email: this.email,
          username: this.username,
          password: this.password,
          first_name: this.firstname,
          last_name: this.lastname
        })
        .then(response => {
          localStorage.token = response.data.token;
          this.isLoading = false;
          this.errorMessages = "";
          this.$router.push({ path: "board" });
        })
        .catch(error => {
          if (error.response) {
            const errors = error.response.data.errors;
            const message = [];
            for (const e of errors) {
              message.push(e);
            }
            this.errorMessages = message.join("\n");
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.email = this.$route.query.email;
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