<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#" @click="toHome"><i class="fas fa-home"></i></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" 
            @click="logout"
            v-if="currentPage !== 'register' && currentPage !== 'login'">
          <a class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    currentPage: String
  },
  data(){
    return {
    }
  },
  methods: {
    logout(){
      this.$emit('logout')
    },
    toHome(){
      this.$emit('toHome')
    }
  }
}
</script>

<style>

</style>