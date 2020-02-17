<template>
  <div id="login">
      <div>
            <b-card
                tag="article"
                style="min-width: 20rem; min-height:25rem"
                class="mb-2"
            >
            <b-card-text>
                <center>
                    <form style="" v-on:submit.prevent="loginUser">
                        <h2>Login</h2>
                        <div class="form-group">
                            <label for="exampleInputEmail">Email address</label>
                            <input type="email" id="emailLogin" class="form-control" v-model="login.email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword">Password</label>
                            <input type="password" id="passwordLogin" class="form-control" v-model="login.password">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <h4>OR</h4>
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                    <br><a v-on:click="registerCommand" style="cursor:pointer;">Register</a>
                </center>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'

export default {
    name : 'LoginUser',
    components : {
        GoogleLogin
    },
    data () {
        return {
            login : {
                email : "",
                password : ""
            },
            params: {
                client_id: "967015570633-a405l1qnha9u0cft0dg2qdkrsb0af6br.apps.googleusercontent.com"
                },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    methods : {
        loginUser() {
            axios({
                method : "POST",
                url : "https://young-retreat-16880.herokuapp.com/login",
                data : {
                    email : this.login.email,
                    password : this.login.password
                }
            })
                .then(({data}) => {
                    this.reset()
                    this.$emit('loginSuccess', data.access_token)
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        reset() {
            this.login = {
                email : "",
                password : ""
            }
        },
        onSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;

            axios({
                method: "POST",
                url : "https://young-retreat-16880.herokuapp.com/googleSign",
                data : {
                    id_token : id_token
                }
            })
                .then(({ data }) => {
                    this.reset()
                    this.$emit('loginSuccess', data.accesToken)
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        
        onFailure() {
            console.log('ERROR ON FAILURE ON GOOGLE SIGN')

        },
        registerCommand() {
            this.$emit('registerCommand')
        }
    }
}
</script>

<style scoped>
  
</style>