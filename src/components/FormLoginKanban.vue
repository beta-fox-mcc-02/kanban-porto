<template>
    <div >
        <form 
            id="formLogin" 
            class="form" 
            @submit.prevent="login"
        >
            <h3>LOGIN</h3>
            <div class="form-group">
                <label for="emailLogin">Email address</label><br>
                <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" v-model="dataLogin.emailLogin">
            </div>
            <div class="form-group">
                <label for="passwordLogin">Password</label><br>
                <input type="password" class="form-control" id="passwordLogin" v-model="dataLogin.passwordLogin">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-link" @click="showRegistrationForm">Sign Up</button>
            <button type="button" class="btn btn-link" @click="googleLogin">Google Login</button>
        </form>
    </div>
</template>

<script>

import axios from '../config/index'


export default {
    name: "FormLoginKanban",
    data() {
        return {
            dataLogin : {
                emailLogin: "",
                passwordLogin: ""
            }
        }
    },
    methods: {
        showRegistrationForm(){
            this.$emit('showFormRegistration')
        },
        login(){
            let loginUser = {
                email: this.dataLogin.emailLogin,
                password: this.dataLogin.passwordLogin
            }
            console.log()
            axios({
                url: '/login',
                method: 'post',
                data : loginUser
            })
                .then(user => {
                    localStorage.setItem("access_token", user.data.access_token)
                    this.$emit('home', 'login')
                })
                .catch( err => {
                    this.$emit('error', `user / password wrong`)
                })  
        },
        googleLogin(){
            this.$gAuth.signIn()
                .then(googleUser => {
                    let access_token = googleUser.getAuthResponse().id_token
                    return axios({
                        url: `/googleLogin`,
                        method: `post`,
                        headers: {
                            access_token : access_token
                        }
                    })
                })
                .then(({ data }) => {
                    localStorage.setItem('access_token', data.access_token)
                    this.$emit('home')
                })
                .catch(error => {
                    this.$emit('error', `Failed to login with this user :(`)
                })
        }
    }
}
</script>

<style>

</style>