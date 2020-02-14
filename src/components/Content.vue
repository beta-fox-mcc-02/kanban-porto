<template>
  <div class="card text-center m-3 shadow">
    <h6 class="card-header text-center col" data-toggle="modal" :data-target="'#editTasks'+tasks.id">
      <i class="fas fa-pencil-alt"></i>
    </h6>
    <div class="card-body">
      <h4>{{tasks.title}}</h4>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col">
          <button
            href="#"
            class="btn btn-primary my-3"
            :class="backwardButton"
            v-if="tasks.status =='Todo' || tasks.status =='Doing' || tasks.status =='Done'"
            @click="updateBackward(tasks.id)"
          >
            <i class="fas fa-angle-double-left"></i>
          </button>
        </div>

        <div class="col">
          <button href="#" class="btn btn-dark my-3" @click="deleteTask(tasks.id)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="col">
          <button
            href="#"
            class="btn my-3"
            :class="forwardButton"
            v-if="tasks.status =='Backlog' || tasks.status =='Todo' || tasks.status =='Doing'"
            @click="updateForward(tasks.id)"
          >
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- modal edit -->
    <div
      class="modal fade"
      :id="'editTasks'+tasks.id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Project Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="editTitleTask"
                />
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >Enter short description for your project.</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="editTask(tasks.id, tasks.status)"
            >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  nama: `Content`,
  props: ["box", "tasks"],
  data() {
    return {
      forwardButton: "",
      backwardButton: "",
      editTitleTask: ""
    };
  },
  methods: {
    editTask(id, status) {
      axios({
        method: `PUT`,
        url: `http://localhost:3000/tasks/${id}`,
        data: {
          title: this.editTitleTask,
          status: status
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data, `updated`);
          this.$emit("getProject", this.tasks.ProjectId);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateForward(id) {
      let updateStatus;
      if (this.tasks.status == "Backlog") {
        updateStatus = "Todo";
      }
      if (this.tasks.status == "Todo") {
        updateStatus = "Doing";
      }
      if (this.tasks.status == "Doing") {
        updateStatus = "Done";
      }
      // disini axios
      axios({
        method: `PATCH`,
        url: `http://localhost:3000/tasks/${this.tasks.id}`,
        data: {
          status: updateStatus
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("getProject", this.tasks.ProjectId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateBackward(id) {
      let updateStatus;
      if (this.tasks.status === `Done`) {
        updateStatus = `Doing`;
      }
      if (this.tasks.status === `Doing`) {
        updateStatus = `Todo`;
      }
      if (this.tasks.status === `Todo`) {
        updateStatus = `Backlog`;
      }
      // disini axios
      axios({
        method: `PATCH`,
        url: `http://localhost:3000/tasks/${this.tasks.id}`,
        data: {
          status: updateStatus
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("getProject", this.tasks.ProjectId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(id) {
      axios({
        method: `DELETE`,
        url: `http://localhost:3000/tasks/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("getProject", this.tasks.ProjectId);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.box.name === `Backlog`) {
      this.forwardButton = "btn-info";
    }
    if (this.box.name === `Todo`) {
      this.forwardButton = "btn-danger";
      this.backwardButton = "btn-secondary";
    }
    if (this.box.name === `Doing`) {
      this.forwardButton = "btn-success";
      this.backwardButton = "btn-info";
    }
    if (this.box.name === `Done`) {
      this.backwardButton = "btn-danger";
    }
  }
};
</script>

<style>
</style>s