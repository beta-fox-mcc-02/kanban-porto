<template>
    <div id="register-form">
        <div class="row">
            <form class="col s12" @submit.prevent="registerSubmit">
                <div class="row">
                    <div class="form-title card-title center-align activator">
                        Register
                    </div>
                    <div class="alert card-text center-align activator">
                        {{message}}
                    </div>
                    <div class="input-field col s12">
                        <input id="new-name" type="text" class="validate" v-model="name">
                        <label for="name">Name</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="new-email" type="email" class="validate" v-model="email">
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="new-password" type="password" class="validate" minlength="6" v-model="password">
                        <label for="password">Password</label>
                    </div>
                    <div class="submit-container">
                        <button class="btn waves-effect waves-light form-submit" type="submit" name="action">
                            Register
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegisterForm',
    data: () => {
        return {
            name: '',
            email: '',
            password: '',
            message: ''
        }
    },
    methods: {
        registerSubmit () {
            axios({
                method: 'POST',
                url: 'https://kanban-day.herokuapp.com/register',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
                .then(({data}) => {
                    this.$emit('registerSuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        }
    },
    created () {
        this.name = ''
        this.email = ''
        this.password = ''
        this.message = ''
    }
}
</script>