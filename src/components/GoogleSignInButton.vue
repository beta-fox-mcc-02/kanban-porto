<template>
  <div class="google-container">
    <div id="google-signin-btn"></div>
  </div>
</template>

<script>
export default {
  name: "GoogleSignInButton",
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile();
      this.profile = profile;
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