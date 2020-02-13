<template>
    <div class="p-2 m-3 form-sign-container" v-if="currentPage === 'signIn' && !isLogedIn">
        <div class="d-flex justify-content-center title">
            <p>Sign In</p>
        </div>
        <form class="form" @submit.prevent="signIn">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" required>
            </div>
            <div class="d-flex align-items-center signInAction">
              <div class="d-flex align-items-center">
                <button id="btn-signIn" type="submit" class="mr-2 btn btn-dark">Sign In</button>
                <p id="btn-to-signUp" class="mb-0 btn-to-signUp" @click="goToSignUp('signUp')">sign up for kanban</p>
              </div>
              <div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn"></div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignIn',
    props: {
        currentPage: String,
        isLogedIn: Boolean
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        goToSignUp(page) {
            this.$emit('changePage', page)
        },
        signIn() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/signIn',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    this.$emit('changeIsLogedIn', true)
                    localStorage.setItem('token', response.data.token)
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }
    }
}
</script>