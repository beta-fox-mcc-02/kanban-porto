<template>
  <nav class="navbar navbar-dark bg-dark">
    <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%">
      <div>
        <div><a class="nav-link" href="#" @click.prevent="changePage('home')">Home</a></div>
      </div>
      <div v-if="!isLogin" style="display: flex; flex-direction: row">
        <div><a class="nav-link" href="#" @click.prevent="changePage('login')">Log In</a></div>
        <div><a class="nav-link" href="#" @click.prevent="changePage('register')">Register</a></div>
      </div>
      <div v-else style="display: flex; jujstify-content: flex-end">
        <div><a class="nav-link" href="#" @click.prevent="changePage('board')">Board</a></div>
        <div><a class="nav-link" href="#" @click.prevent="changePage('logout')">Log Out</a></div>                  
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props : {
    isLogin : Boolean
  },
  methods : {
    changePage(page) {
      if(page === 'logout') {
        localStorage.clear()
        if (localStorage.gToken) {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
          // console.log('User signed out.');
          })
        }
        this.$emit('changePage', 'home', false)
      } else {
        this.$emit('changePage', page, this.isLogin)
      }
    }
  }
}
</script>

<style scoped>
  a {
    color: white;
  }
  a:hover {
    color: #007bff;
    font-weight: bold;
  }
</style>