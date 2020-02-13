<template>
  <header>
        <nav id="navbar">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo center"><i><img src="/icons/favicon.ico" style="margin-top: 8px;"></i>MKanban</a>
            <span 
              class="left" 
              style="margin-left: 15px;"
              v-if="currentPage != 'LoginPage'"
            >
              Welcome {{username}}!</span>
            <a 
              href="#" 
              class="right btn-flat" 
              style="margin-right: 15px;" 
              @click.prevent="logout"
              v-if="currentPage != 'LoginPage'"  
            >Logout</a>
          </div>
          <div class="nav-wrapper">
          </div>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
    }
  },

  props: {
    currentPage: String,
    username: String
  },

  methods: {
    logout() {
      localStorage.clear()
      this.$emit('showContent')
      Toastify({
        text: "Logout success",
        position: 'center',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "success",
      }).showToast();
    },
  }
}
</script>

<style>

</style>