<template>
  <div class="navbar-container" id="topNav">
    <div class="brand-container">
      <h3 style="color:white;"><i class="fa fa-th-list" style="color:white"/> Kanban APP </h3>
    </div>
    <div class="container-menu">
      <ul class="kanban" id="kanbanNav">
        <li>
          <a href="javascript:void(0);" class="icon" v-on:click="navbar"><i class="fa fa-bars"></i></a>
        </li>
        <li v-if="page === 'kanban' || page === 'edit' || page === 'kanbanForm'">
          <a href="#" v-on:click="kanbanBoard">Kanban</a>
        </li>
        <li v-if="page === 'register' || page === 'login'">
          <a href="#" v-on:click="loginForm">Sign in</a>
        </li>
        <li v-if="page === 'login' || page === 'register'">
          <a href="#" v-on:click="registerForm">Sign up</a>
        </li>
        <li v-if="page === 'kanban' || page === 'edit' || page === 'kanbanForm'">
          <a href="#" v-on:click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarMenu",
  props: {
    page: String
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
    },
    logout() {
      localStorage.clear();
      this.$emit("changePage", "login");
    },
    navbar(){
      console.log('navbar')
      let nav = document.getElementById("kanbanNav");
      if (nav.className === "kanban") {
        nav.className += " responsive";
      } else {
        nav.className = "kanban";
      }
    }
  }
};
</script>

<style></style>
