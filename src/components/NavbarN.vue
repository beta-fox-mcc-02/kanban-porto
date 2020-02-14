<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg fixed-top py-3">
        <div class="container"><a href="#" class="navbar-brand text-uppercase font-weight-bold">Kanban by nafies1</a>
            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><i class="fa fa-bars"></i></button>
            
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
              <ul class="navbar-nav ml-auto">
                <!-- <li v-if="isLoggedIn" class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Add Task</a></li> -->
                <li v-if="isLoggedIn" @click="logout" class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Logout</a></li>
                <li v-if="!isLoggedIn" @click="openRegister" class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Register</a></li>
                <li v-if="!isLoggedIn" @click="openLogin" class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Login</a></li>
              </ul>
            </div>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavbarN',
  methods: {
    logout () {
      this.$emit('logout')
    },
    openRegister () {
      this.$refs[`my-modalRegister`].show()
    },
    openLogin () {
      this.$refs[`my-modalLogin`].show()
    },
  },
  props: {
    isLoggedIn: Boolean
  }
}
</script>

<style scoped>
  .navbar {
      transition: all 0.9s;
  }

  .navbar .nav-link {
      color: #fff;
      transition: 0.5s;
  }

  .navbar .nav-link:hover,
  .navbar .nav-link:focus {
      color: rgb(240, 64, 93);
      text-decoration: none;
  }

  .navbar .navbar-brand {
      color: #fff;
  }

  @media (max-width: 991.98px) {
    .navbar {
        background: #fff;
    }

    .navbar .navbar-brand, .navbar .nav-link {
        color: #555;
    }
}
</style>