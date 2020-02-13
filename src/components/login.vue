<template>
    <div class="login">
        <section id="login-header">
            <H1>WELCOME</H1>
            <small>Login form</small>
        </section>
        <form id="login-form" v-on:submit.prevent="login">
            <div class="err-message">{{ errorMessage }}</div>
            <div id="login-main">
                <div>
                    <small>Email:</small>
                    <input id="login-email" type="email" v-model="email">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <div>
                    <small>Password:</small>
                    <input id="login-password" type="password" v-model="password">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <button id="login-btn" type="submit">Submit</button>
            </div>
        </form>
        <section id="login-footer">Not a member yet? <a id="redirect-to-register" v-on:click="redirect">Register</a></section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            unfilledInput: false,
            errorMessage: ''
        }
    },
    methods: {
        login(){
            if(this.email && this.password) {
                axios({
                    method: "POST",
                    url: "http://localhost:3000/user/login",
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then((result) => {
                    console.log(result.data.token)
                    this.clearInputs()
                    this.$emit('changePage', { page: 'member', token: result.data.token })
                })
                .catch((err) => this.errorMessage = `You have not registered yet, please register first`)
            }
            else {
                this.unfilledInput = true
                this.errorMessage = `Please fill in required inputs`
            }
        },
        clearInputs() {
            this.email = '',
            this.password = '',
            this.unfilledInput = false
        },
        redirect(){
            this.clearInputs()
            this.$emit('changePage', { page: 'register' })
        }
    }
}
</script>

<style>

</style>