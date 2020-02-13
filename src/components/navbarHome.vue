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
          <a class="nav-link" href="#">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto">
        <a href="#" @click="signOut">Sign out</a>
      </ul>
    </div>
  </nav>
</template>
<script>
name: "navbarHome";
export default {
  data() {
    return {};
  },
  props: {
    page: String
  },
  methods: {
    changePage(laman) {
      // console.log('dari login page',laman);
      this.$emit("change-Page", laman);
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log("User signed out.");
        localStorage.clear();
        this.changePage("login");
      });
    }
  }
};
</script>

<style>
</style>