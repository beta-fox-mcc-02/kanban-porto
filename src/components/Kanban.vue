<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light shadow"
      style="background-color: #ECF0F1; max-height: 50px;"
    >
      <img
        src="https://cdn.dribbble.com/users/285803/screenshots/1066705/dribbble.gif"
        class="p-0"
        alt
        style="max-width: 60px"
      />
      <a class="navbar-brand pl-0 ml-0" href="#">GanBan</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto justify-content-center" style="margin-top: 15px">
          <li class="nav-item">
            <p class="nav-link" style="cursor: pointer">My Project</p>
          </li>
        </ul>
        <button type="button" class="btn btn-danger mr-4 shadow" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>
    <div class="mt-4 text-center">
   <button class="btn btn-secondary mx-1 shadow">Add Task <i class="fas fa-plus ml-1"></i></button>
   <button class="btn btn-info mx-1 shadow">Add Collaborator <i class="fas fa-users"></i></button>

    </div>
    
    <div class="mx-3 mt-0 pt-0">
      <div class="row">
        <Box 
        v-for="(box, i) in boxes"
        :key=i
        :box='box'
        :openProjectTasks='openProjectTasks'
        @getProject='getProject'
        >           
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Box from './Box'

export default {
  name: `Kanban`,
  components: {
     Box
  },
  props: ["openProjectTasks"],
  data() {
    return {
      boxes: [
        {
          name: "Backlog",
          bgColor: "bg-secondary"
        },
        {
          name: "Todo",
          bgColor: "bg-info"
        },
        {
          name: "Doing",
          bgColor: "bg-danger"
        },
        {
          name: "Done",
          bgColor: "bg-success"
        }
      ]
    };
  },
  methods : {
     logout() {
      localStorage.removeItem(`token`);
      this.$emit("changePage", "login");
    },
    getProject (id) {
        this.$emit('getProject', id)
     }
  },
  computed: {
   //   statusTask () {
   //      let temp = []
   //      this.openProjectTasks.forEach((data) => {
   //         if (data.status === this.box.name) {
   //            temp.push(data)
   //         }
   //      })
   //      return temp
   //   }
  }
};
</script>

<style>
</style>