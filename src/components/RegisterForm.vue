<template>
  <!-- register -->
    <!-- <div class="row" id="register">
      <div class="col s4 offset-s4">
        <div class="card z-depth-3">
          <div class="card-content">
            <span class="card-title center">Register</span> -->
            <div id="modal1" class="modal">
              <div class="modal-content">
              <form id="register-form" @submit.prevent="register">
              <div class="row">
                <div class="col s12 input-field">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="registerUsername" type="text" class="validate" v-model="username">
                  <label for="registerUsername">Username</label>
                </div>
              </div>
              <div class="row">
                <div class="col s12 input-field">
                  <i class="material-icons prefix">email</i>
                  <input id="registerEmail" type="email" class="validate" v-model="email">
                  <label for="registerEmail">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="col s12 input-field">
                  <i class="material-icons prefix">security</i>
                  <input id="registerPassword" type="password" class="validate" v-model="password">
                  <label for="registerPassowrd">Password</label>
                </div>
              </div>
              <div class="row">
                <div class="col s12 center">
                  <button class="btn waves-effect waves-dark" type="submit" name="action">Register</button>
                </div>
              </div>
            </form>
            </div>
            </div>
          <!-- </div>
        </div>
      </div>
    </div> -->
</template>

<script>
import axios from 'axios'
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: "",
      email: "",
      password: ""
    }
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/users/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.username = ''
          this.email = ''
          this.password = ''
          this.$emit('showContent', 'test')
          Toastify({
            text: "Register success",
            position: 'center',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "success",
          }).showToast();
        })
        .catch(err => {
          this.username = ''
          this.email = ''
          this.password = ''
          Toastify({
            text: `${err}`,
            position: 'center',
            backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
            className: "error",
          }).showToast();
        })
    }
  }
}
</script>

<style>

</style>