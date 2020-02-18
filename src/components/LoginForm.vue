<template>
   <!-- login -->
    <div class="row" id="login" style="margin: 10rem;">
        <div class="col s4 push-s4">
          <div class="card z-depth-3">
            <div class="card-content">
              <span class="card-title center">Login</span>
              <form id="login-form" @submit.prevent="login">
                <div class="row">
                  <div class="col s12 input-field">
                    <input id="user" type="text" class="validate" v-model="user" required>
                    <label for="user">Username /  Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 input-field">
                    <input id="password" type="password" class="validate" v-model="password" required>
                    <label for="password">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 center">
                    <button class="btn waves-effect waves-dark" type="submit" name="action">Login</button>
                  </div>
                </div>
              </form>

                <div class="row">
                  <div class="col s12 center">
                    <p>Or sign in with Google account</p>
                    <div class="row">
                      <div class="col s3 offset-s2">
                        <GoogleLogin 
                          :params="params" 
                          :renderParams="renderParams" 
                          :onSuccess="onSuccess" 
                          :onFailure="onFailure"
                        ></GoogleLogin>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
          <!-- register button -->
          <div class="card z-depth-3 center">
            <div class="card-content">
              <span class="card-title center">Don't have an account?</span>
              <a
                @click.prevent="$emit('registerModalToggle')"
                class="waves-effect waves-light btn-large" 
              >
                Register Now!</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';
export default {
  name: "LoginForm",

  data() {
    return {
      user: "",
      password: "",
      params: {
        client_id: "686966079631-ro2oqjn1jsseu7jt31rhj1p8fhmgcue1.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },

  components: {
    GoogleLogin
  },

  methods: {
    login() {
      axios.post('https://immense-refuge-43743.herokuapp.com/users', {
        user: this.user,
        password: this.password
      })
      .then(({data}) => {
        localStorage.token = data.token
        localStorage.username = data.username
        this.user = ''
        this.password = ''
        this.$emit('showContent')
        this.$emit('notification', null, 'Login successful')
      })
      .catch(err => {
        this.user = ''
        this.password = ''
        this.$emit('notification', err)
      })
    },

    onSuccess(googleUser){
      let id_token = googleUser.getAuthResponse().id_token;
      axios({
        url:'https://immense-refuge-43743.herokuapp.com/gsignin',
        method: 'post',
        data: {
          id_token
      }
      })
        .then(({data}) => {
          localStorage.token = data.token
          localStorage.username = data.username
          this.$emit('showContent')
          this.$emit('notification', null, 'Login successful')
        })
        .catch(err => {
          this.$emit('notification', err)
        })
      
    },

    onFailure(){
      this.$emit('notification', "Error sigin with google")
      localStorage.clear()
    }
  }

}
</script>

<style>

</style>