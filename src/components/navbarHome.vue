<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="page !== 'login'">
    <a class="navbar-brand" href="#" @click.prevent="changePage('home')">Kanbaban</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#"
          @click.prevent="changePage('home')"
          >
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto">
         <GoogleLogin :params="params" :logoutButton=true :onSuccess="logout">
         <a href="#">Sign out</a>
         </GoogleLogin>
      </ul>
    </div>
  </nav>
</template>
<script>
import GoogleLogin from 'vue-google-login';
name: "navbarHome";
export default {
  data() {
    return {
      params: {
        client_id:"510406314847-lvokpsqv9ak9mqehnv8pquumd7e0m6dq.apps.googleusercontent.com"
      },
    // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      }
    };
  },
  components: {
      GoogleLogin
  },
  props: {
    page: String
  },
  methods: {
    changePage(laman) {
      // console.log('dari login page',laman);
      this.$emit("change-Page", laman);
    },
    logout() {
      console.log("User signed out.");
      localStorage.clear();
      this.changePage("login");
      
    }
  }
};
</script>

<style>
</style>