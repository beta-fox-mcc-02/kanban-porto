<template>
  <div class="google-container">
    <div id="google-signin-btn"></div>
  </div>
</template>

<script>
const BASE_URL = "http://localhost:3000";
import axios from "axios";
export default {
  name: "GoogleSigninButton",
  methods: {
    onSignIn(user) {
      const token = user.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: BASE_URL + "/users/gLogin",
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
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        // location.reload(true);
      });
    },
    onFailure(error) {
      console.log(error);
    },
    renderGoogleLoginButton() {
      gapi.signin2.render("google-signin-btn", {
        onsuccess: this.onSignIn,
        onfailure: this.onFailure,
        longtitle: true,
        theme: "dark",
        width: 390,
        height: 50
      });
    }
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://apis.google.com/js/platform.js?onload=triggerGoogleLoaded"
    );
    document.body.appendChild(recaptchaScript);
    window.addEventListener("google-loaded", this.renderGoogleLoginButton);
  }
};
</script>
<style lang="scss" scoped>
.google-container {
  margin-top: 10px;
}
</style>