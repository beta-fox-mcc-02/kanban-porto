<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top">
    <router-link class="btn btn-link btn-title" to="/" exact>Kanban</router-link>
    <div class="login-register">
      <router-link class="btn btn-link" to="login" exact>Login</router-link>
      <router-link class="btn btn-primary btn-register" to="register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #fff;
  }

  &.btn-title {
    text-transform: uppercase;
    font-size: 1.5rem;
  }

  &.btn-register {
    background-color: #fff;
    color: #0079bf;
    &:hover {
      text-decoration: underline;
    }
  }
}
.navbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  background-color: #0079bf;
}
</style>