<template>
  <div>
    <nav class="navbar ">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">#Kanban</a>
        </div>
        <ul class="nav navbar-nav">
          <li ><a href="#">Home</a></li>
          <li ><a href="#">Task</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="currentPage=='login'"><a href="#" @click="registerPage"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li v-else-if="currentPage=='register'" ><a href="#" @click="loginPage"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
          <li v-else-if="currentPage=='home'" @click="logout"><a href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name : 'Navbar',
  props : {
    currentPage : String
  },
  methods : {
    loginPage(){
      this.$emit('loginPage', 'login')
    },
    registerPage(){
      this.$emit('registerPage', 'register')
    }, 
    logout(){
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.$emit('loginPage', 'login')
    }
  }
}
</script>

<style>

</style>