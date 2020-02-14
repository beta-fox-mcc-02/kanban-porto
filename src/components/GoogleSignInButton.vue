<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
  >Sign in with Google</g-signin-button>
</template>

<script>
import axios from "../config";
export default {
  name: "GoogleSigninButton",
  data() {
    return {
      googleSignInParams: {
        client_id:
          "1048507427899-gsqkp04ope3jfofhb78d43hvm3g7urct.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(user) {
      const token = user.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "/users/gLogin",
        headers: {
          token
        }
      })
        .then(response => {
          localStorage.token = response.data.token;
          this.$router.push({ path: "/board" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSignInError(error) {
      console.log(error);
    }
  }
};
</script>
<style lang="scss" scoped>
.g-signin-button {
  margin-top: 10px;
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  width: 100%;
  text-align: center;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>