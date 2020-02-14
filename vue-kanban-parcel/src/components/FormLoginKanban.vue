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
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </form>
    </div>
</template>

<script>

import axios from 'axios'

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
                url: 'http://localhost:3000/login',
                method: 'post',
                data : loginUser
            })
                .then(user => {
                    localStorage.setItem("access_token", user.data.access_token)
                    this.$emit('home', 'login')
                })
                .catch( err => {
                    console.log(`error`)
                })  
        }
    }
}
</script>

<style>

</style>