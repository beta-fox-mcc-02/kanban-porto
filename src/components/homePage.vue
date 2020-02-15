<template>
  <div class="container mt-4" v-if="page == 'home'">
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
      <h3>{{warning}}</h3>
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
      projectEdit: false,
      projectId: null,
      warning:''
    };
  },
  components:{
    addProject,
    porjectCard
  },
  props: {
    page: String,
    socket: Object,
    projects: Array
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
    // fetchProject() {
    //   axios({
    //     method: "get",
    //     url: "user/project",
    //     headers:{
    //       token: localStorage.token
    //     }
    //   })
    //     .then(({ data }) => {
    //       if(data.length > 0){
    //         console.log(data);
    //         this.projects = data;
    //         this.warning= ''

    //       }else{
    //         // console.log('blm ada data');
    //         this.projects = []
    //         this.warning= 'you dont have any project'
    //       }
          
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  computed:{
    dataEmpty(){
      //  if(data.length > 0){
      //       console.log(data);
      //       this.projects = data;
      //       this.warning= ''

      //     }else{
      //       // console.log('blm ada data');
      //       this.projects = []
      //       this.warning= 'you dont have any project'
      //     }
    }
  },
  created: function() {
    if (localStorage.token) {
      // this.fetchProject();
      // this.page = "home";
      // this.socket.on("project", data => {
      //   // console.log(data, 'ini dari io');
      //   this.warning= ''
      //   // this.projects.push(data);
      // });
      // //project hrs reactivve

      // this.socket.on("fetchProject", data => {
      //   // console.log('kepanggil');
      //   this.fetchProject();
      // });
    }
  }
};
</script>

<style>
</style>