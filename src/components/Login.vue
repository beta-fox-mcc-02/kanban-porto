<template>
    <div id="login-form">
        <div class="row">
            <form class="col s12" @submit.prevent="loginSubmit">
                <div class="row">
                    <div class="form-title card-title center-align activator">
                        Login
                    </div>
                    <div class="alert card-text center-align activator">
                        {{message}}
                    </div>
                    <div class="input-field col s12">
                        <input id="email" type="email" class="validate" v-model="email">
                        <label for="email">Email</label>
                        <span class="helper-text" data-error="email format not detected" data-success="email checked">Helper text</span>
                    </div>
                    <div class="input-field col s12">
                        <input id="password" type="password" class="validate" v-model="password">
                        <label for="password">Password</label>
                        <span class="helper-text" data-error="password required" data-success="we never share your password">Helper text</span>
                    </div>
                    <div class="submit-container">
                        <button class="btn waves-effect waves-light form-submit" type="submit" name="action">Sign In
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div class="card-text center-align activator">
                        Or sign in with:
                    </div>
                    <div class="oauth-container">
                        <g-signin-button
                            :params="googleSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError">
                            <i class="fab fa-google"></i>
                        </g-signin-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LoginForm',
    data: () => {
        return {
            email: '',
            password: '',
            message: '',
            googleSignInParams: {
                client_id: '568776868704-1vkhfsu4dciv95476mn18epub94dlns1.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        loginSubmit () {
            axios({
                method: 'POST',
                url: 'https://kanban-day.herokuapp.com/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({data}) => {
                    this.message = ''
                    localStorage.access_token = data.access_token
                    this.$emit('afterLogin')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        },
        onSignInSuccess (googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: 'POST',
                url: 'https://kanban-day.herokuapp.com/gLogin',
                headers: {
                    access_token: id_token
                }
            })
                .then(({data}) => {
                    this.message = ''
                    localStorage.access_token = data.access_token
                    this.$emit('afterLogin')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        }
    }
}
</script>

<style scoped>
    .g-signin-button {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
    .g-signin-button:hover {
        cursor: pointer;
    }
</style>