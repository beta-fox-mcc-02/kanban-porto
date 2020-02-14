<template>
  <div class="card">
    <div class="row">
      <div class="col-lg-4 text-center">
        <img src="https://picsum.photos/150" alt="random pictures">
      </div>
      <div class="col-lg-8">
        <div class="card-title">
          <h4>{{ project.name }}</h4>
        </div>
          <div class="card-text">
            <span>Project Description: {{ project.description }}</span>
            <p>Project Author: {{ project.Users[0].name }}</p>
        </div>
        <div class="button-group float-right mx-2">
          <button class="btn" v-b-toggle="`${project.id}`" @click="fecthProjectById(project.id)"><i class="fa fa-users"></i></button>
          <button class="btn" @click="deleteProject(project.id)"><i class="fa fa-trash"></i></button>
          <button class="btn" @click="changePage('project-page', project.id, project.name)"><i class="fa fa-eye"></i></button>
        </div>
      </div>
      <div class="container mx-2">
        <b-collapse :id="String(project.id)">
          <p>Project Creator: {{ project.Users[0].name}}</p>
          <p>Project Member :</p>
          <p v-for="user in projectMembers" :key="user.id">- {{user.name}}</p>
          <p v-b-toggle="`form`" @click.prevent="fetchUser" style="cursor: pointer;"><i class="fa fa-plus">  Add Member</p>
          <b-collapse id="form">
            <form>
              <b-form-input id="type-search" v-model="search"></b-form-input>
            </form>
            <button
              v-b-toggle="`form`"
              @click="inviteMember(member.id)"
              class="btn"
              v-for="member in getAuthor"
              :key="member.id">
                <i class="fa fa-plus">
                {{member.name}}
              </button>
          </b-collapse>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'ProjectCard',
  data () {
    return {
      users: '',
      search: '',
      members: [],
      projectMembers: ''
    } 
  },
  props: {
    project: Object
  },
  computed: {
    getAuthor () {
      if(this.members.includes(this.project.Users[0].name)){
        return this.members = []
      } else {
        return this.members
      }
    }
  },
  watch: {
    search (val) {
      if(val !== ''){
        let arr = []
        this.users.filter((user) => {
          let res = user.name.includes(val)
            if(res) {
              if(user.name !== this.project.Users[0].name) {
                arr.push(user)
              }
            }
          })
        this.members = arr
      } else {
        this.members = []
      }
    }
  },
  methods: {
    getImage () {
      Axios({
        method: 'GET',
        url: 'https://picsum.photos/150'
      })
      .then(_=> {})
      .catch(_ => {})
    },
    changePage (page, id, name) {
      if(page === 'project-page'){
        localStorage.projectId = id
        localStorage.projectName = name
        this.$emit('changePage', page, id)
      } else {
        this.$emit('changePage', page, id)
      }
    },
    fetchUser () {
      Axios({
        method: 'GET',
        url: `http://localhost:3000/users`
      })
      .then(({ data }) => {
        this.users = data
      })
      .catch(err => console.log(err))
    },
    inviteMember (id) {
      Axios({
        method: 'POST',
        url: `http://localhost:3000/projects/invite`,
        data: {
          UserId: id,
          ProjectId: this.project.id
        },
        headers: {
          token: localStorage.token
        }
      })
      .then (({ data }) => {
        this.fecthProjectById(this.project.id)
      })
      .catch(err => console.log(err))
    },
    fecthProjectById (id) {
      Axios({
        method: 'GET',
        url: `http://localhost:3000/projects/${id}`,
        headers: {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        this.projectMembers = data.Users
        this.search = ''
      })
      .catch(err => console.log(err))
    },
    deleteProject (id) {
      Axios({
        method: 'DELETE',
        url: `http://localhost:3000/projects/${id}`,
        headers: {
          token: localStorage.token
        }
      })
      .then(_=> {
        this.$emit('changeNav', 'show-project')
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getImage()
  }
}
</script>

<style scoped>
.btn {
  background-color: rgb(10, 185, 185); /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 0.3rem; /* Some padding */
  /* font-size: 16px; Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}

</style>