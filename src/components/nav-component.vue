<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" ><img src="../image/6783528_preview.png" alt="K" style="width: 40px;"></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <section id="nav" v-if='currentPage != "homePage"'>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <!-- <li class="nav-item active">
                    <a class="nav-link btn" >Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link btn" >Task</a>
                  </li> -->
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle btn" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item btn" id="logout" @click="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
                      <!-- <a class="dropdown-item" >Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" >Something else here</a> -->
                    </div>
                  </li>
                  <!-- <li class="nav-item">
                    <a class="nav-link disabled" >Disabled</a>
                  </li> -->
                </ul>
                <!-- <form class="form-inline my-2 my-lg-0">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> -->
              </div>
          </section>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props : {
    currentPage : String
  },
  methods : {
    logout(){
      this.$emit('currentPage', 'homePage')
    }
  }
}
</script>

<style>

</style>