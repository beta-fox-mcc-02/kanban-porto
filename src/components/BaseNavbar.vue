<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="transparent" class="pt-0">
    <b-navbar-brand class="text-white">Kanban</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="changeNav('show-project'), changePage('home')">My Projects</b-nav-item>
        <b-nav-item @click="changeNav('create-project'), changePage('home')">Create Projects</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ currentUser }}</em>
          </template>
          <GoogleLogin 
            class="btn m-0 pl-5 text-center"
            :params="params"
            :logoutButton='true'
            :onSuccess="logout"
          >Logout</GoogleLogin>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
  name: 'BaseNavbar',
  data () {
    return {
      currentUser: '',
      params: {
        client_id: '206242195437-vvsm0ghpb6clbkrk7e7fmj5hemvdj81b.apps.googleusercontent.com'
      }
    }
  },
  components: {
    GoogleLogin
  },
  props: {
    currentPage: String,
    currentNav: String
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$emit('changePage', 'landing')
    },
    changePage(page) {
      localStorage.removeItem('projectId')
      localStorage.removeItem('projectName')
      this.$emit('changePage', page)
    },
    changeNav(nav) {
      this.$emit('changeNav', nav)
    }
  },
  created () {
    this.currentUser = localStorage.currentUser 
  }
}
</script>

<style scoped>
  .home {
    font-size: 1rem !important;
  }
</style>