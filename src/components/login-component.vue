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
                                        <input type="email" v-model="email" name="email" id="email" class="form-control" placeholder="input your email">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" v-model="password" name="password" id="password" class="form-control" placeholder="input your password">
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
                                        <input type="email" v-model="email" name="email" id="emailRegister" class="form-control" placeholder="input your email">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" v-model="password" name="password" id="passwordRegister" class="form-control" placeholder="input your password">
                                    </div>
                                    <button type="submit" class="btn btn-primary text-light">Register</button>
                                </form>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
        username : '',
        email : '',
        password : '',
        }
    },
    methods : {
        login(){
            axios.post('http://localhost:3000/login',{
                username : this.username,
                email : this.email,
                password : this.password
            })
            .then(result => {
                console.log(result.data.data.token)
                localStorage.token = result.data.data.token
                this.$emit('currentPage', 'mainPage')
            })
            .catch(err => {
                console.log(err)
            })
        },
        register(){
            axios.post('http://localhost:3000/register',{
                username : this.username,
                email : this.email,
                password : this.password
            })
            .then(result => {
                console.log(result.data.data)
                localStorage.token = result.data.data.token
                this.$emit('currentPage', 'mainPage')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        justify-content : 'center';
        align-items : center;
    }
</style>