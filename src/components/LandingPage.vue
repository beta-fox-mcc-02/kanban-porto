<template>
  <div>
    <navbar></navbar>
    <div class="container margin-atas">
      <h1>NO KANBAN</h1>
      <h1>NO LIFE</h1>

      <div class="row my-3">
        <div class="col-10 col-sm-8 col-md-5 p">Manage your life with helpfull productivity tools like kanban. Be the best and be the winner like Kuuhaku</div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <div class="btn btn-primary pjg-10">Login</div>
          <div class="btn btn-primary pjg-10">Register</div>
          <div @click="googleSign" class="btn btn-primary pjg-10">Sign with <i class="fab fa-google"></i></div>
        </div>
      </div>
    </div>
   
    
  </div>
</template>

<script>
import navbar from './NavbarN'
export default {
  name: 'LandingPage',
  components: {
    navbar
  },
  methods: {
    googleSign () {
      this.$gAuth.signIn()
        .then(GoogleUser => {
          console.log('user', GoogleUser)
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
          this.isSignIn = this.$gAuth.isAuthorized
        })
        .catch(error  => {
          //on fail do something
          console.log(error, 'ini error')
        })
    },
    googleSignOut () {
      this.$gAuth.signOut()
        .then(() => {
          // things to do when sign-out succeeds
          console.log('user sign out')
        })
        .catch(error  => {
          // things to do when sign-out fails
          console.log('error sign out', error)
        })
    }
  }
}
</script>

<style scoped>
  .margin-atas {
    margin-top: 10rem
  }
  .p {
    text-align: justify
  }
  h1, .p {
    text-shadow: 2px 2px 8px wheat;
  }
  .pjg-10 {
    width: 8rem;
  }
</style>