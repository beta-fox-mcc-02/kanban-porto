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
        <button type="button" class="btn btn-danger mr-4" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>

    <h1 class="text-center mt-5 mb-5" style="color: white">My Project</h1>

    <div class="container">
      <div class="row" style="display: flex; justify-content: space-around">
        <div v-for="project in myProject" :key="project.id">
          <!-- ini content project -->
          <div class="card my-3 mx-0 shadow" style="width: 18rem;">
            <img
              class="card-img-top"
              src="https://cdn.dribbble.com/users/539938/screenshots/4314205/logo-gif.gif"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-text text-center mb-4">
                <strong>{{project.title}}</strong>
              </h5>

              <div class="text-center">
                <button
                  class="btn btn-info mx-2 btn-sm"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  @click="fetchUpdate(project.id)"
                >Edit</button>
                <button class="btn btn-success mx-2 btn-sm" @click="openProject(project.id)">Open</button>
                <button class="btn btn-danger mx-2 btn-sm" @click="deleteProject(project.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      class="btn btn-danger btn-lg"
      style="position:fixed;
      bottom: 50px;
      right: 50px;"
      data-toggle="modal"
      data-target="#exampleModalCenter2"
    >
      <i class="fas fa-plus"></i>
    </button>
    <!-- content modal edit -->
    <div
      class="modal fade"
      id="exampleModalCenter"
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
                  v-model="editProject.title"
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
              @click="updateProject(editProject.id)"
            >Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- content modal create -->
     <div
      class="modal fade"
      id="exampleModalCenter2"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Create Project</h5>
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
                  v-model="createProject.title"
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
              @click="createNewProject"
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
  name: `Home`,
  data() {
    return {
      myProject: [],
      editProject: {
        title: "",
        id: ""
      },
      createProject : {
         title: ''
      }
    };
  },
  methods: {
    logout() {
      localStorage.removeItem(`token`);
      this.$emit("changePage", "login");
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
          this.myProject = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePage(page) {
      this.$emit("changePage");
    },
    deleteProject(id) {
      axios({
        method: `DELETE`,
        url: `http://localhost:3000/projects/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.fetchProject();
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchUpdate(id) {
      axios({
        method: `GET`,
        url: `http://localhost:3000/projects/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.editProject.title = data.title;
          this.editProject.id = data.id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProject(id) {
      axios({
        method: `PUT`,
        url: `http://localhost:3000/projects/${id}`,
        data: {
          title: this.editProject.title
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.fetchProject();
        })
        .catch(err => {
          console.log(err);
        });
    },
    createNewProject () {
       axios({
          method: `POST`,
          url: `http://localhost:3000/projects`,
          data: {
             title: this.createProject.title
          },
          headers: {
             token: localStorage.token
          }
       })
         .then(({data}) => {
            this.fetchProject()
         })
         .catch(err => {
            console.log(err);            
         })
    },
    openProject(id) {
      this.$emit('changePage', 'kanban')
      this.$emit('getProject', id)
    }
  },
  created() {
    if (localStorage.token) {
      this.fetchProject();
    }
  }
};
</script>

<style>
</style>