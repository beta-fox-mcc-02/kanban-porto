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
            <p class="nav-link" style="cursor: pointer" @click="backToHome">My Project</p>
          </li>
        </ul>
        <GoogleLogin
          type="button"
          class="btn btn-danger mr-4"
          :onSuccess="logout"
          :params="params"
          :logoutButton="true"
        >
          <i class="fas fa-sign-out-alt"></i>
        </GoogleLogin>
      </div>
    </nav>

    <div class="mt-4 text-center">
      <button class="btn btn-secondary mx-1 shadow" data-toggle="modal" data-target="#addTask">
        Task
        <i class="fas fa-plus ml-1"></i>
      </button>
      <button class="btn btn-info mx-1 shadow" data-toggle="modal" data-target="#addCollaborators">
        Add
        <i class="fas fa-users ml-1"></i>
      </button>
      <button
        class="btn btn-danger mx-1 shadow"
        data-toggle="modal"
        data-target="#removeCollaborators"
      >
        Remove
        <i class="fas fa-user-lock ml-1"></i>
      </button>
    </div>

    <div class="mx-3 mt-0 pt-0">
      <div class="row">
        <Box
          v-for="(box, i) in boxes"
          :key="i"
          :box="box"
          :openProjectTasks="openProjectTasks"
          @getProject="getProject"
        ></Box>
      </div>
    </div>

    <!-- modal create task -->
    <div
      class="modal fade"
      id="addTask"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action>
              <div class="form-group">
                <label for="Project title">Project title</label>
                <input
                  class="form-control"
                  type="text"
                  :placeholder="currentProject.title"
                  readonly
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Task title</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Task title"
                  v-model="addTask.taskTitle"
                />
                <small>please remind that another person on a same project can edit this task</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="createTask(openProjectId)"
            >Add</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal add collaborators -->
    <div
      class="modal fade"
      id="addCollaborators"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Collaborators</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 40vh; overflow: auto">
            <div class="row" v-for="user in addUsers" :key="user.id">
              <div class="col text-left mt-1 ml-5">
                <p>{{user.email}}</p>
              </div>
              <div class="col text-right mr-5 mt-1">
                <button
                  class="btn btn-success btn-sm"
                  data-dismiss="modal"
                  @click="addToProject(user.id)"
                >
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal remove collaborators -->
    <div
      class="modal fade"
      id="removeCollaborators"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Remove Collaborators</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="max-height: 40vh; overflow: auto">
            <div class="row" v-for="user in kickUsers" :key="user.id">
              <div class="col text-left mt-1 ml-5">
                <p>{{user.email}}</p>
              </div>
              <div class="col text-right mr-5 mt-1">
                <button
                  class="btn btn-danger btn-sm"
                  data-dismiss="modal"
                  @click="kickFromProject(user.id)"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Box from "./Box";
import GoogleLogin from "vue-google-login";
export default {
  name: `Kanban`,
  components: {
    Box,
    GoogleLogin
  },
  props: ["openProjectTasks", "openProjectId"],
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
      ],
      currentProject: {},
      addTask: {
        taskTitle: ""
      },
      userList: [],
      params: {
        client_id:
          "1015788743329-4uql0o2rtksdcogqg07fim9g858m099n.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  methods: {
    backToHome() {
      this.$emit("changePage", "home");
    },
    logout() {
      localStorage.removeItem(`token`);
      localStorage.removeItem(`id`);
      this.$emit("changePage", "login");
    },
    getProject(id) {
      this.$emit("getProject", id);
    },
    createTask(ProjectId) {
      axios({
        method: `POST`,
        url: `http://localhost:3000/tasks`,
        data: {
          title: this.addTask.taskTitle,
          status: "Backlog",
          ProjectId: ProjectId
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("getProject", this.openProjectId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchProject(id) {
      axios({
        method: `GET`,
        url: `http://localhost:3000/projects/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data, `ke fetch lagi nih`);
          this.currentProject = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchUsers() {
      axios({
        method: `GET`,
        url: `http://localhost:3000/users`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.userList = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToProject(id) {
      axios({
        method: `POST`,
        url: `http://localhost:3000/projects/addCollaborator`,
        data: {
          UserId: id,
          ProjectId: this.openProjectId
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {

          Toastify({
            text: "Add Collaborator successfully",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info"
          }).showToast();
          this.fetchProject(this.openProjectId);
        })
        .catch(err => {
          console.log(err, ``);
          Toastify({
            text: "user already in this project",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info"
          }).showToast();
          this.fetchProject(this.openProjectId);
        });
    },
    kickFromProject(id) {
      axios({
        method: `DELETE`,
        url: `http://localhost:3000/projects/collaborator/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          Toastify({
            text: "Remove Collaborator successfully",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info"
          }).showToast();
          this.fetchProject(this.openProjectId);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.fetchProject(this.openProjectId);
    this.fetchUsers();
  },
  computed: {
    addUsers() {
      let temp = [];
      this.userList.forEach(data => {
        if (data.id != localStorage.id) {
          temp.push(data);
        }
      });
      return temp;
    },
    kickUsers() {
      let temp = [];
      this.currentProject.Users.forEach(data => {
        if (data.id != localStorage.id) {
          temp.push(data);
        }
      });
      return temp;
    }
  }
};
</script>

<style>
</style>