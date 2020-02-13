<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#projectModal"
    >Add Project</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="projectModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Project</h5>
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
            <button type="submit" class="btn btn-primary" @click.prevent="addProject" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axiosInstance";
name: 'addProject'
export default {
  data() {
    return {
      projectName: ""
    };
  },
  methods: {
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
    }
  }
};
</script>

<style>
</style>