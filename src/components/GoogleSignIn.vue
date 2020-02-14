<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError" class="btn btn-primary">
    Sign in with Google
  </g-signin-button>
</template>

<script>
import axios from 'axios'

export default {
   data () {
      return {
         /**
          * The Auth2 parameters, as seen on
          * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
          * As the very least, a valid client_id must present.
          * @type {Object} 
          */
         googleSignInParams: {
         client_id: '918198967344-kqn9rpdemrj0hib572g6jvkiptt43dhe.apps.googleusercontent.com'
         }
      }
   },
   methods: {
      onSignInSuccess (googleUser) {
         // `googleUser` is the GoogleUser object that represents the just-signed-in user.
         // See https://developers.google.com/identity/sign-in/web/reference#users
         const profile = googleUser.getBasicProfile() // etc etc
         let token = googleUser.getAuthResponse().id_token
         // console.log(token)
         axios({
            method: 'POST',
            url : 'http://localhost:3000/users/gSignIn',
            headers : {
               idtoken: token
            }
         })
            .then(({data}) => {
               console.log(data, 'sign in success')
               localStorage.token = data.token
               this.$emit('changePage', 'board', true)
            })
            .catch(err => {
               console.log(err, 'fail sign in')
            })
      },
      onSignInError (error) {
         // `error` contains any error occurred.
         console.log('OH NOES', error)
      }
   }
}
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style> 