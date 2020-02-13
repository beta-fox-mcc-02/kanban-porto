<template>
  <div class="container-menu">
    <ul class="kanban">
      <li v-if="page === 'kanban' || page === 'task'">
        <a href="#">Dashboard</a>
      </li>
      <li v-if="page === 'kanban' || page === 'task'">
        <a href="#">Kanban</a>
      </li>
      <li v-if="page === 'register' || page === 'login'">
        <a href="#" v-on:click="loginForm">Login</a>
      </li>
      <li v-if="page === 'login' || page === 'register'">
        <a href="#" v-on:click="registerForm">Register</a>
      </li>
      <li v-if="page === 'kanban' || page === 'task'">
        <a href="#" v-on:click="logout">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavbarMenu",
  data() {
    return {
      page: "login"
    };
  },
  methods: {
    registerForm() {
      this.$emit("changePage", "register");
    },
    loginForm() {
      this.$emit("changePage", "login");
    },
    kanbanBoard() {
      this.$emit("changePage", "kanban");
    }
  }
};
</script>

<style></style>
