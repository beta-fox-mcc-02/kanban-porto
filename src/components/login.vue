<template>
    <div class="container">
        <div id="form-login">
            <h1 style="font-family: 'Lemonada', cursive;">LOG IN</h1>
            <form v-on:submit.prevent="login">
                <label>EMAIL</label>
                <input type="email" required v-model="email">
                <label>PASSWORD</label>
                <input type="password" required v-model="password">
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
            <br> 
            <button type="button" class="g-signin2" @click="googleLogin">GOOGLE LOGIN</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login () {
            axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({data}) => {
                    localStorage.setItem('token', data.token)
                    this.changePage('landing')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        googleLogin () {
            this.$gAuth.signIn()
                .then(authCode => {
                    const id_token = authCode.getAuthResponse().id_token
                    return axios ({
                        method: 'POST', 
                        url: "http://localhost:3000/googlelogin",
                        headers: {
                            token: id_token
                        }
                    })
                })
                .then(data =>  {
                    localStorage.setItem('token', data.data.token)
                    this.changePage('landing')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    } 

}
</script>

<style>

</style>