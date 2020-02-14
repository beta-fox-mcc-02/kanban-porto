<template>
  <div>
    <LoginPage @changePage="changePage" v-if="page === 'login'"></LoginPage>
    <KanbanPage @changePage="changePage" v-if="page === 'kanban'"></KanbanPage>
  </div>
</template>

<script>
import Vue from "vue";
import LoginPage from "./components/LoginPage";
import KanbanPage from "./components/KanbanPage";
export default {
  name: "App",
  data() {
    return {
      page: ""
    };
  },
  components: {
    LoginPage,
    KanbanPage
  },
  methods: {
    changePage(payload) {
      this.page = payload;
    }
  },
  created() {
    if (localStorage.token) {
      this.page = "kanban";
    } else {
      this.page = "login";
    }
  }
};
</script>

<style>
</style>