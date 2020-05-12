<template>
  <div>
    <NavbarMenu @changePage="changePage" :page="page"></NavbarMenu>
    <KanbanBoard @changePage="changePage" :page="page"></KanbanBoard>
    <LoginForm v-if="page === 'login'" @changePage="changePage"></LoginForm>
    <RegisterForm v-else-if="page === 'register'" @changePage="changePage"></RegisterForm>
  </div>
</template>

<script>
import NavbarMenu from "./components/NavbarMenu.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import KanbanBoard from "./components/KanbanBoard.vue";

export default {
  data() {
    return {
      page: "login"
    };
  },
  components: {
    NavbarMenu,
    LoginForm,
    RegisterForm,
    KanbanBoard
  },
  methods: {
    changePage(page) {
      return (this.page = page);
    }
  },
  created() {
    if (localStorage.access_token) {
      //   this.fetchAll();
      this.page = "kanban";
      // console.log(this.editId);
    } else {
      this.page = "login";
    }
  }
};
</script>

<style scoped></style>
