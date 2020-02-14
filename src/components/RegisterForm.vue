<template>
    <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <div class="form_page">
                        <form @submit.prevent="registerUser">
                            <div class="form-group">
                                <label for="login_inputEmail">Email</label>
                                <input type="email" id="login_inputEmail" class="form-control" v-model="registerEmail" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <label for="login_inputPassword">Password</label>
                                <input type="password" id="login_inputPassword" class="form-control" v-model="registerPassword" placeholder="Password" required>
                            </div>
                            <button type="submit"   :class="[registerEmail && registerPassword ? 'btn btn-primary' : 'btn btn-primary disabled']">Register</button>
                            <!-- Google SignIn Button -->
                            <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterForm',
    data() {
        return {
            registerEmail: '',
            registerPassword: ''
        }
    },
    methods: {
        registerUser: function() {
            axios
                .post('http://localhost:3000/register', {
                    email: this.registerEmail,
                    password: this.registerPassword
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                });
                
        this.registerEmail = '';
        this.registerPassword = '';
        }
    }
}
</script>