<template>
  <!-- register -->
  <div id="RegisterModal">
    <transition name="modal">
    <div class="row modal-mask">
    <div class="col s4 offset-s4 modal-wrapper">
    <div class="card z-depth-3 modal-container">
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
  <div class="row" id="exit">
      <div class="col s12 center">
        <a id="exit" class="btn-flat" @click.prevent="$emit('registerModalToggle')">exit</a>
      </div>
    </div>
  </div>
  </div>
  </div>
  </transition>
  </div>
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
      axios.post('https://immense-refuge-43743.herokuapp.com/users/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.username = ''
          this.email = ''
          this.password = ''
          this.$emit('showContent')
          this.$emit('notification', null, 'Register successful')
          this.$emit('registerModalToggle')
        })
        .catch(err => {
          this.username = ''
          this.email = ''
          this.password = ''
          this.$emit('notification', err)
          this.$emit('registerModalToggle')
        })
    }
  }
}
</script>

<style scoped>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 10rem auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#exit {
  padding: 1rem
}
</style>