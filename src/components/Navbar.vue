<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top">
    <router-link class="btn btn-link btn-title" to="/" exact>Kanban</router-link>
    <div v-if="!isLogin" class="login-register">
      <router-link class="btn btn-link" to="login" exact>Login</router-link>
      <router-link class="btn btn-primary btn-register" to="register">Register</router-link>
    </div>
    <div class="profile-user" v-else>
      <ul class="navbar nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown-profile"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="user-initial">{{ user.initial }}</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdown-profile">
            <a @click="logout" class="logout dropdown-item">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ["isLogin", "user"],
  methods: {
    logout() {
      localStorage.clear();
      var auth2 = gapi.auth2.getAuthInstance();
      if (auth2) {
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }
      this.$router.push({ path: "/" });
    }
  }
};
</script>