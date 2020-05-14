<template>
  <div>
    <NavbarMenu @changePage="changePage" :page="page"></NavbarMenu>
    <KanbanBoard 
      @changePage="changePage" 
      @fetchAll="fetchAll" 
      :page="page"
      :board="board"
      :loading="loading"
      :error="error"
      >
    </KanbanBoard>
    <LoginForm v-if="page === 'login'" @changePage="changePage" @fetchAll="fetchAll"></LoginForm>
    <RegisterForm v-else-if="page === 'register'" @changePage="changePage"></RegisterForm>
  </div>
</template>

<script>
import NavbarMenu from "./components/NavbarMenu.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import axios from 'axios'

const baseURL = 'https://frozen-sands-95268.herokuapp.com'
// const baseURL = 'http://localhost:3000'

export default {
  data() {
    return {
      page: "login",
      board: {
        backlog: [],
        product: [],
        development: [],
        done: []
      },
      loading: false,
      error: ''
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
    },
    fetchAll() {
      console.log("masuk ke fetch");
      this.loading = true
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "get",
        url: `${baseURL}/task`,
        // url: "http://localhost:3000/task",
        headers: {
          access_token: access_token
        }
      })
        .then(response => {
          response.data.data.forEach(data => {
            if (data.CategoryId === 1) {
              //   console.log(data);
              this.board.backlog.push(data);
            } else if (data.CategoryId === 2) {
              this.board.product.push(data);
            } else if (data.CategoryId === 3) {
              this.board.development.push(data);
            } else if (data.CategoryId === 4) {
              this.board.done.push(data);
            }
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false
        })
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
