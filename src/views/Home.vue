<template>
  <Fragment>
    <Navbar :is-login="isLogin"></Navbar>
    <main role="main">
      <div class="jumbotron">
        <img src="../assets/images/computer-2982270_1280.jpg" />
        <div class="container">
          <h1 class="display-3 heading">Make you work more efficiently and get more done.</h1>
          <p
            class="heading-description"
          >Lists and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
          <div class="form-inline mt-20">
            <div class="form-group">
              <input
                type="email"
                class="form-control email-register"
                id="input-register-email"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <router-link
              class="btn btn-primary"
              :to="{ path: 'register', query: { email }}"
            >Register</router-link>
          </div>
        </div>
      </div>
    </main>
  </Fragment>
</template>

<script>
import Navbar from "../components/Navbar";
import { Fragment } from "vue-fragment";
import isAuthenticated from "../helpers/isAuthenticated";
export default {
  name: "Home",
  components: {
    Navbar,
    Fragment
  },
  data() {
    return {
      email: "",
      isLogin: false
    };
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
        next("/login");
      }
    });
  }
};
</script>