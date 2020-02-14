<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="transparent" class="pt-0">
    <b-navbar-brand class="text-white">Kanban</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="changePage('home')" class="home">Home</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{ currentUser }}</em>
          </template>
          <b-dropdown-item @click="logout('landing')">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'BaseNavbar',
  data () {
    return {
      currentUser: ''
    }
  },
  props: {
    currentPage: String
  },
  methods: {
    logout (page) {
      localStorage.clear()
      this.$emit('changePage', page)
    },
    changePage(page) {
      localStorage.removeItem('projectId')
      localStorage.removeItem('projectName')
      this.$emit('changePage', page)
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
    color: white !important;
  }
</style>