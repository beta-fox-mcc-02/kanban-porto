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
              <!-- <div class="g-signin2" data-longtitle="true" @data-onsuccess.prevent="onSignIn"></div> -->
              <g-signin-button
                class="btn-gSigIn"
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                <img class="g-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="giSignInLogo">
                Sign in with Google
              </g-signin-button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'SignIn',
    props: {
        currentPage: String,
        isLogedIn: Boolean
    },
    data() {
        return {
            email: '',
            password: '',
            googleSignInParams: {client_id: '425308161759-glmhm9ugin8corvgojjurm2u0pd101pf.apps.googleusercontent.com'}
        }
    },
    methods: {
        goToSignUp(page) {
            this.$emit('changePage', page)
        },
        signIn() {
            axios({
                method: 'POST',
                url: '/users/signIn',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    this.$emit('changeIsLogedIn', true)
                    this.$emit('changePage', 'board')
                    localStorage.setItem('token', response.data.token)
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        },
        onSignInSuccess (googleUser) {
            const id_token = googleUser.getAuthResponse().id_token

            axios({
                method: 'POST',
                url: '/users/gSignIn',
                headers: {
                    id_token: id_token
                }
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token)
                    this.$emit('changeIsLogedIn', true)
                    this.$emit('changePage', 'board')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        }
    }
}
</script>