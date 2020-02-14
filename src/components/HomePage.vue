<template>
  <div class="container py-3">
    <div class="row d-flex justify-content-around">
      <div class="col-sm-3">
        <b-card class="shadow">
          <a @click.prevent="changeNav('show-project')" class="mt-2 active" >My Projects</a><br>
          <a @click.prevent="changeNav('create-project')" class="mt-2" >Create Project</a>
        </b-card>
      </div>
      <div class="col-sm-8" v-if="currentNav === 'show-project'" style="max-height: 90vh; overflow: auto;">
        <ProjectCard 
          class="row px-2 py-2 mx-2 my-2 shadow"
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @changePage="changePage"
          @changeNav="changeNav">
        </ProjectCard>
      </div>
      <div class="col-sm-7" v-if="currentNav === 'create-project'">
        <b-card class="shadow">
          <CreateProject @changeNav="changeNav"></CreateProject>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import CreateProject from './CreateProject'
import ProjectCard from './ProjectCard'
import axios from 'axios'
export default {
  name: 'HomePage',
  data () {
    return {
      projects: [],
      currentNav: 'show-project',
      active: 'active'
    }
  },
  components: {
    CreateProject,
    ProjectCard
  },
  methods: {
    fetchProjects () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/projects',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        this.projects = data
      })
      .catch(err => console.log(err))
    },
    changeNav (nav) {
      if(nav === 'show-project'){
        this.fetchProjects()
        this.currentNav = nav
      }else {
        this.currentNav = nav
      }
    },
    changePage(page, id, name) {
      this.$emit('toBoard', page, id)
    }
  },
  created () {
    this.fetchProjects()
  }
}
</script>

<style scoped>
  a {
    padding-left: 1rem;
  }
  a:hover {
    background-color: grey;
    color: white;
    cursor: pointer;
  }

  a:active {
    background-color: grey;
    color: white;
    cursor: pointer;
  }
</style>