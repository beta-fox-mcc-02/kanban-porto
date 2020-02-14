<template>
<div class="content">
  <LandingPage
    class="landing-page"
    v-if="currentPage === 'landing'"
    @changePage="changePage">
  </LandingPage>

  <SigninPage
    @changePage="changePage"
    v-if="currentPage === 'sign-in'">
  </SigninPage>

  <SignupPage
    @changePage="changePage"
    v-if="currentPage === 'sign-up'"
  ></SignupPage>

  <BaseNavbar
    v-if="currentPage !== 'sign-in' && currentPage !== 'landing' && currentPage !== 'sign-up'"
    @changePage="changePage"
    :currentPage="currentPage">
  </BaseNavbar>

  <HomePage
    v-if="currentPage === 'home'"
    @toBoard="toBoard">
  </HomePage>

  <ProjectPage
    class="project-page"
    v-if="currentPage === 'project-page'"
    :projectId="projectId">
  </ProjectPage>

</div>
</template>

<script>
import ProjectPage from './components/ProjectPage'
import BaseNavbar from './components/BaseNavbar'
import LandingPage from './components/LandingPage'
import SigninPage from './components/SigninPage'
import HomePage from './components/HomePage'
import SignupPage from './components/SignUpPage'
export default {
  name: 'App',
  data () {
    return {
      currentPage: 'landing',
      projectId: ''
    }
  },
  components: {
    BaseNavbar,
    LandingPage,
    SigninPage,
    HomePage,
    ProjectPage,
    SignupPage
  },
  methods: {
    changePage (page) {
      this.currentPage = page
    },
    toBoard (page, id) {
      this.currentPage = page
      this.projectId = id
    }
  },
  created () {
    if(localStorage.token){
      if(localStorage.projectId){
        this.projectId = Number(localStorage.projectId)
        this.currentPage = 'project-page'
      }else{
        this.currentPage = 'home'
      }
    } else {
      this.currentPage = 'landing'
    }
  }
}
</script>

<style scoped>
.landing-page {
  background: linear-gradient(135deg, #0079bf, #5067c5);
  padding-top: 5rem;
}

.content {
  background-repeat: no-repeat;
  /* background-size: 100%; */
  background-attachment: fixed;
  background: linear-gradient(135deg, #0079bf, #5067c5);
  min-height: 100vh;
  width: 100%;
  height: auto;
  /* max-width: 300vh; */
}
</style>