<template>
  <div>
    <form @submit.prevent="register">
      <div class="register">
        <label>Register</label>
        <p class="control has-icons-left has-icons-right">
          <input v-model="username" class="input" type="text" placeholder="Username" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
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
      <div class="register">
        <p class="control has-icons-left">
          <input v-model="password" class="input" type="password" placeholder="Password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success">Register</button>
        </p>
      </div>
      <h3>Already have an account? Click <a @click.prevent="showLogin">here</a> to login</h3>
    </form>
  </div>
</template>

<script>
export default {
  name: "registerPage",
  data: () => {
    return {
        username: "",
        email: "",
        password: ""
    };
  },
  methods: {
    register() {
      axios({
        method: "POST",
        url: "https://guarded-depths-33701.herokuapp.com/register",
        data: {
            username: this.username,
            email: this.email,
            password: this.password
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$emit("showContent", "contentPage");
        })
        .catch(err => {
          console.log(err);
        });
    },
    showLogin() {
      this.$emit("changePage", "login");
    },
    onSignIn(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "http://localhost:3000/googlesignin",
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