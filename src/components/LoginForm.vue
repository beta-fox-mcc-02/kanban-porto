<template> 
        <!-- login  -->
        <div class="container has-text-centered" v-if="currentPage === 'login'">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <h3 class="title has-text-black">Login</h3><hr>
                    <form id="login-form" @submit.prevent="loginUser">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left has-icons-right">
                              <input class="input is-danger" type="email" placeholder="type your email here" id="emailLogin" v-model="login.email" required>
                              <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left">
                              <input class="input is-link" type="password" placeholder="type your password here" id="passwordLogin" v-model="login.password" required>
                              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                            </div>
                        </div>
                        <button type="submit" class="button is-block is-primary is-fullwidth has-text-black">Login</button>
                    </form>
                </div>
                <p class="has-text-grey">
                    Not registered yet? Create a new account <a href="#" @click.prevent="showRegister">here</a>
                </p>
            </div>
        </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            login: {
                email: '',
                password: ''
            }           
        }
    },
    props: ['currentPage'],
    methods: {
        loginUser() {
            axios({
                method: 'POST',
                url: `http://localhost:3000/login`,
                data: {
                    email: this.login.email,
                    password: this.login.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('access_token', data.access_token)
                this.$emit('fetchAll')
                // this.currentPage = 'dashboard'
                this.$emit('changePage','dashboard')
            })
            .catch(response => {
                console.log(response)
            })
        },
        showRegister() {
            this.$emit('showRegister')
        }
    }
}
</script>