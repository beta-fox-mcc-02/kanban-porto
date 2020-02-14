<template>
    <div class="p-2 m-3 form-sign-container" v-if="currentPage === 'signUp' && !isLogedIn">
        <div class="d-flex justify-content-center title">
            <p>Sign Up</p>
        </div>
        <form class="form" @submit.prevent="signUp">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" required>
            </div>
            <div class="d-flex align-items-center">
                <button id="btn-signUp" type="submit" class="mr-2 btn btn-dark">Sign up</button>
                <p id="btn-to-signIn" class="mb-0 btn-to-signIn" @click="signInForm('signIn')">already have an acount?</p>
            </div>
        </form>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'SignUp',
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
        signInForm(page) {
            this.$emit('changePage', page)
        },
        signUp() {
            axios({
                method: 'POST',
                url: '/users/signUp',
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