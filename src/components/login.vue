<template>
 
</template>

<script>


export default {
  name: 'login',
  data() {
    return {
      isSignIn: ''
    }
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
  },
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>