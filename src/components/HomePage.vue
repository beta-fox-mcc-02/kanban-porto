<template>
  <div class="container py-3">
    <div class="row d-flex justify-content-around">
      <div class="col-sm-8 text-center" v-if="currentNav === 'show-project' && projects.length == 0" style="max-height: 90vh; overflow: auto;">
        <h2 class="text-white">Oops..!! No Project To Display <br> <span style="cursor: pointer;" @click="changeNav('create-project')">Create Project Now</span></h2>
        <img src="https://image.freepik.com/free-vector/man-sitting-bar_107173-4533.jpg" alt="image">
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
import axios from '../config'
export default {
  name: 'HomePage',
  data () {
    return {
      projects: []
    }
  },
  components: {
    CreateProject,
    ProjectCard
  },
  props: {
    currentNav: String
  },
  methods: {
    fetchProjects () {
      axios({
        method: 'GET',
        url: '/projects',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        this.projects = data
      })
      .catch(_ => {})
    },
    changeNav (nav) {
      this.fetchProjects()
      this.$emit('changeNav', nav)
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
  img {
    width: 50%
  }
</style>