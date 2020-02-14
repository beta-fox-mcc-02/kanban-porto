<template>
      <!-- Home Page -->
      <section>
          <br>
          <div class="container">
                  <div class="card card-signup z-depth-0 text-center"  style="opacity: 0.8; width: 35%;">
                      <div class="card-header">
                          <i class="fas fa-user-alt fa-3x"></i>
                      </div>
                      <div class="card-body">
                          <a class="btn btn-success text-light" data-toggle="collapse" data-target="#dropLogin" aria-expanded="false" aria-controls="dropLogin" id="loginBtn">Login</a>
                          <a class="btn btn-success text-light" data-toggle="collapse" data-target="#dropRegister" aria-expanded="false" aria-controls="dropRegister" id="registerBtn">Register</a>
                          <br><br>
                          <div class="card card-signup z-depth-0 text-center border-primary collapse" id="dropLogin">
                            <div class="card-body">
                                <form id="loginForm" @submit.prevent="login">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input type="text" v-model="username" name="username" id="username" class="form-control" placeholder="input your username">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" v-model="email" name="email" id="email" class="form-control" placeholder="input your email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" v-model="password" name="password" id="password" class="form-control" placeholder="input your password" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary text-light">Login</button>
                                </form>
                            </div>
                          </div>
                          <div class="card card-signup z-depth-0 text-center border-primary collapse" id="dropRegister">
                            <div class="card-body">
                                <form id="registerForm" @submit.prevent="register">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input type="text" v-model="username" name="username" id="usernameRegister" class="form-control" placeholder="input your username">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" v-model="email" name="email" id="emailRegister" class="form-control" placeholder="input your email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" v-model="password" name="password" id="passwordRegister" class="form-control" placeholder="input your password" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary text-light">Register</button>
                                </form>
                            </div>
                          </div>
                          <button v-google-signin-button="clientId" class="google-signin-button"><i class="fab fa-google"></i></button>
                      </div>
                  </div>
              </div>
          </section>
</template>

<script>
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
    data () {
        return {
        username : '',
        email : '',
        password : '',
        clientId: '386401714130-08rc74g14ec5768bo9b7b18mr2i9t8ad.apps.googleusercontent.com'
        }
    },
    methods : {
        login(){
            axios.post('https://quiet-depths-10928.herokuapp.com/login',{
                username : this.username,
                email : this.email,
                password : this.password
            })
            .then(({data}) => {
                // console.log(data.data.token)
                localStorage.token = data.data.token
                this.$emit('currentPage', 'mainPage')
            })
            .catch(err => {
                console.log(err)
            })
        },
        register(){
            axios.post('https://quiet-depths-10928.herokuapp.com/register',{
                username : this.username,
                email : this.email,
                password : this.password
            })
            .then(({data}) => {
                // console.log(data.data)
                localStorage.token = data.data.token
                this.$emit('currentPage', 'mainPage')
            })
            .catch(err => {
                console.log(err)
            })
        },
        OnGoogleAuthSuccess (idToken) {
        // Receive the idToken and make your magic with the backend
            axios.post('https://quiet-depths-10928.herokuapp.com/gLogin', {
                gToken : idToken
            })
            .then(({data}) => {
                localStorage.token = data.token
                this.$emit('currentPage', 'mainPage')
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style>
    /* .container {
        display: flex;
        justify-content : 'center';
        align-items : center;
    } */
    .google-signin-button {
        color: white;
        background-color: red;
        height: 50px;
        font-size: 16px;
        border-radius: 10px;
        padding: 10px 20px 25px 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>