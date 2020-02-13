<template>
    <div class="register">
        <section id="register-header">
            <H1>WELCOME</H1>
            <small>Registration form</small>
        </section>
        <form id="register-form" v-on:submit.prevent="register">
            <div class="err-message">{{ errorMessage }}</div>
            <div id="register-main">
                <div>
                    <small>Name:</small>
                    <input id="register-name" type="text" autocapitalize="words" v-model="name">
                </div>
                <div>
                    <small>Email:</small>
                    <input id="register-email" type="email" v-model="email">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <div>
                    <small>Password:</small>
                    <input id="register-password" type="password" v-model="password">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <button id="register-btn" type="submit">Submit</button>
            </div>
        </form>
        <section id="register-footer">Have an account? <a id="redirect-to-login" v-on:click="redirect">Login</a></section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errorMessage: '',
            unfilledInput: false
        }
    },
    methods: {
        register() {
            if(this.email && this.password) {
                axios({
                    method: "POST",
                    url: "http://localhost:3000/user/register",
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                })
                .then((result) => {
                    this.clearInputs()
                    this.$emit(`changePage`, { page: `login` })
                })
                .catch((err) => {
                    this.clearInputs()
                    this.errorMessage = `You have been registered, please login instead`
                })
            }
            else {
                this.unfilledInput = true
                this.errorMessage = `Please fill in required inputs`
            }
        },
        clearInputs() {
            this.name = '',
            this.email = '',
            this.password = ''
            this.unfilledInput = false
        },
        redirect(){
            this.clearInputs()
            this.$emit('changePage', { page: `login` })
        }
    }
}
</script>