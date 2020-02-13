<template>
  <div class="container" v-if="page == 'home'">
    <div class="row">
    </div>
    <div class="float-right">
      <!-- <button class="btn btn-primary" @click.prevent="formProject">Add Project</button> -->
      <addProject/>
    </div>

    <form v-if="projectEdit == true" @submit.prevent="projectUpdate">
      <div class="form-group mt-5">
        <label for="exampleInputEmail1">New Project Name</label>
        <input
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter name"
          v-model="projectName"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <h1>projects</h1>
    <div class="container row">
      <porjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @change-Page="changePage"
        @project-Page="currentProject"
      />
    </div>
  </div>
</template>

<script>
import porjectCard from './projectCard'
import addProject from './addProject'
import axios from "../api/axiosInstance";
name: "homePage";
export default {
  data() {
    return {
      projectName: "",
      projectForm: false,
      projects: [],
      projectEdit: false,
      projectId: null
    };
  },
  components:{
    addProject,
    porjectCard
  },
  props: {
    page: String,
    socket: Object
  },
  methods: {
    projectUpdate() {
      axios({
        method: "put",
        url: `/project/${this.projectId}`,
        data: {
          name: this.projectName
        }
      })
        .then(({ data }) => {
          this.projectName = "";
          this.projectId = "";
          this.projectEdit = false;
          this.fetchProject();
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProject(id, name) {
      // console.log(id,'ini nama');
      this.projectName = name;
      this.projectId = id;
      if (this.projectEdit == false) {
        this.projectEdit = true;
      } else {
        this.projectEdit = false;
      }
    },
    removeProject(id) {
      axios({
        method: "delete",
        url: `/project/${id}`
      })
        .then(({ data }) => {
          this.fetchProject();
        })
        .catch(err => {
          console.log(err);
        });
    },
    formProject() {
      console.log(this.projectForm);

      if (this.projectForm == false) {
        this.projectForm = true;
      } else {
        this.projectForm = false;
      }
    },
    currentProject(payload) {
      // console.log(id, 'dari home');

      this.$emit("project-Page", payload);
      this.changePage("project");
    },
    changePage(laman) {
      // console.log('dari home page',laman);
      this.$emit("change-Page", laman);
    },
    addProject() {
      axios({
        method: "post",
        url: "/project",
        data: {
          name: this.projectName
        }
      })
        .then(({ data }) => {
          this.projectName = "";
          this.projectForm = false;
          this.fetchProject();
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchProject() {
      axios({
        method: "get",
        url: "/project"
      })
        .then(({ data }) => {
          this.projects = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    if (localStorage.token) {
      this.fetchProject();
      this.page = "home";
      this.socket.on("project", data => {
        // console.log(data, 'ini dari io');
        this.projects.push(data);
      });

      this.socket.on("fetchProject", data => {
        this.fetchProject();
      });
    }
  }
};
</script>

<style>
</style>