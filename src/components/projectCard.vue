<template>
  <div class="card bg-info ml-3 mt-3" style="border-raidus: 5px; width: 16rem;">
    <div class="card-body text-center" @click.prevent="currentProject(project.id, project.name)">
      <h5 class="card-text" >{{project.name}}</h5>
    </div>
    <div class="card-footer text-center">
      <button class="btn btn-danger" @click="removeProject(project.id)">delete</button>
      <button
        class="btn btn-warning"
        data-toggle="modal"
        :data-target="'#modal' + project.id"
        @click="updateProject(project.id,project.name)"
      >edit</button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="'modal' + project.id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">New Project Name </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="exampleInputEmail1">Project Name</label>
            <input
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              v-model="projectName"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="submit"
              class="btn btn-warning"
              data-dismiss="modal"
               @click.prevent="projectUpdate"
            >Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axiosInstance";
name: "projectCard";
export default {
  data() {
    return {
      projectName: "",
      projectId: null
    };
  },
  props: {
    project: Object
  },
  methods: {
    updateProject(id, name) {
      console.log(name, "ini nama");
      this.projectName = name;
      this.projectId = id;
    },
    projectUpdate() {
      axios({
        method: "put",
        url: `/project/${this.projectId}`,
        data: {
          name: this.projectName
        },
        headers:{
          token: localStorage.token
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
    currentProject(id, name) {
      // console.log(id, 'dari home');
      let payload = {
        id: id,
        name: name
      } 
      this.$emit("project-Page", payload);
      this.changePage("project");
    },
    changePage(laman) {
      // console.log('dari home page',laman);
      this.$emit("change-Page", laman);
    },
    removeProject(id) {
      axios({
        method: "delete",
        url: `/project/${id}`,
        headers:{
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // this.fetchProject();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    if (localStorage.token) {
      // this.fetchProject();
      this.projectName = this.project.name;
    }
  }
};
</script>

<style>
</style>