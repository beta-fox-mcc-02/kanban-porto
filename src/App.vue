<template>
  <div>
    <Login v-if="page===`login`" 
    @changePage="changePage"
    ></Login>
   
    <Register v-if="page === `register`"
    @changePage="changePage"
    ></Register>
  </div>
</template>

<script>
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

export default {
  name: `App`,
  components: {
    Login,
    Register
  },
  data() {
    return {
      message: "halo",
      page: "login",
      myProject: []
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    fetchProject() {
      axios({
        method: `GET`,
        url: `http://localhost:3000/users/projects`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.myProject = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {

  }
};
</script>

<style>
body {
  background-image: url("https://labourenergy.org/wp-content/uploads/2019/11/blank-chalkboard-background-high-resolution.jpg");
}
</style>