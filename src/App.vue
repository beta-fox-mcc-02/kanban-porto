<template>
  <div>
    <Login v-if="page===`login`" @changePage="changePage" ></Login>

    <Register v-if="page === `register`" @changePage="changePage"></Register>
    
    <Home
    v-if="page === `home`"
    @changePage="changePage"
    @getProject='getProject'
    ></Home>

    <Kanban
    v-if="page === 'kanban'"
    @changePage='changePage'
    :openProjectTasks='openProjectTasks'
    @getProject='getProject'
    >
    </Kanban>
  </div>
</template>

<script>
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Kanban from "./components/Kanban"

export default {
  name: `App`,
  components: {
    Login,
    Register,
    Home,
    Kanban
  },
  data() {
    return {
      message: "halo",
      page: "login",
      openProjectTasks: [],
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    getProject (id) {
      axios({
        method: `GET`,
        url: `http://localhost:3000/projects/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data.Tasks, `dapet nih 1 project nya`);
          this.openProjectTasks = data.Tasks
        })
        .catch(err => {
          console.log(err);
          
        })
    }
  },
  created() {
     if (localStorage.token) {
        this.page = `home`
     }
  }
};
</script>

<style>
body {
  background-image: url("https://labourenergy.org/wp-content/uploads/2019/11/blank-chalkboard-background-high-resolution.jpg");
}
</style>