<template>
    <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <div class="form_page">
                        <form @submit.prevent="loginUser">
                            <div class="form-group">
                                <label for="login_inputEmail">Email</label>
                                <input type="email" class="form-control" v-model="loginEmail" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <label for="login_inputPassword">Password</label>
                                <input type="password" class="form-control" v-model="loginPassword" placeholder="Password" required>
                            </div>
                            <button type="submit"   :class="[loginEmail && loginPassword ? 'btn btn-primary' : 'btn btn-primary disabled']">Login</button>
                            <!-- Google SignIn Button -->
                            <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
</template>

<script>
import axios from 'axios';

export default {
    name: "LoginForm",
    data () {
        return {
            loginEmail: '',
            loginPassword: ''
        }
    },
    methods: {
        loginUser: function() {
            axios
                .post("http://localhost:3000/login", {
                    email: this.loginEmail,
                    password: this.loginPassword
                    })
                .then(token => {
                    localStorage.access_token = token.data;
                })
                .catch(error => {
                    if (error.response) {
                        /*
                         * The request was made and the server responded with a
                         * status code that falls out of the range of 2xx
                         */
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                    }
                });
            
            this.loginEmail = '';
            this.loginPassword ='';
        }
    }
}
</script>