<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError" class="g-signin-button">
    <i class="fa fa-google-plus" aria-hidden="true"></i> Sign in Google
  </g-signin-button>
</template>

<script>
import axios from '../../../config/axios'

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
         client_id: process.env.VUE_APP_CLIENT_ID
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
            url : '/users/gSignIn',
            headers : {
               idtoken: token
            }
         })
            .then(({data}) => {
               console.log(data, 'sign in success')
               localStorage.token = data.token
               localStorage.gToken = true
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
    background-color: #dd4b39;
    color: #fff;
    box-shadow: 0px 3px 5px 1px rgba(0,0,0,0.09);
  }
</style> 