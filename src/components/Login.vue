<template>
  <div>
    <form @submit.prevent="userlogin">
      <div class="login">
        <label>Login</label>
        <p class="control has-icons-left has-icons-right">
          <input v-model="email" class="input" type="email" placeholder="Email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="login">
        <p class="control has-icons-left">
          <input v-model="password" class="input" type="password" placeholder="Password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success">Login</button>
        </p>
      </div>
      <h3>
        Don't have an account? Click
        <a @click.prevent="showRegister">here</a> to register
      </h3>
      <h5>OR</h5>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import GoogleLogin from "vue-google-login";
export default {
  name: "loginPage",
  data: () => {
    return {
      email: "",
      password: "",
      params: {
        client_id: "842930767637-kt3fe74b9som8sm73l936b092siea84a.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    onFailure() {
      console.log('Failed to Sign In with Google')
    },
    onSuccess(googleUser) {

                  console.log(googleUser.uc.id_token);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());

      const id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token)
      axios({
        method: "POST",
        url: "https://guarded-depths-33701.herokuapp.com/googlesignin",
        data: {
          id_token: id_token
        }
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.$emit("showContent", "contentPage");
        })
        .catch(err => {
          console.log(err)
        })
    },
    userlogin() {
      axios({
        method: "POST",
        url: "https://guarded-depths-33701.herokuapp.com/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$emit("showContent", "contentPage");
        })
        .catch(err => {
          this.$swal({
            icon: "error",
            title: err.message,
            text: "Something went wrong!"
          });
        });
    },
    showRegister() {
      this.$emit("changePage", "register");
    },
    onSignIn(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "https://guarded-depths-33701.herokuapp.com/googlesignin",
        data: { id_token }
      })
        .then(user => {
          localStorage.setItem("token", user.token);
          this.$emit("showContent", "contentPage");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
#gOAuth {
  display: flex;
  justify-content: center;
}
</style>