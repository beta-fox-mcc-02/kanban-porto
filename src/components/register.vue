<template>
    <div class="container">
        <div id="form-regis">
            <h1 style="font-family: 'Lemonada', cursive;">REGISTER</h1>
            <form  v-on:submit.prevent="regis">
                <label>FIRST NAME</label>
                <input id="first-name-regis" type="text" required v-model="first_name">
                <label>LAST NAME</label>
                <input id="last-name-regis" type="text" required v-model="last_name">
                <label>EMAIL</label>
                <input id="email-regis" type="email" required v-model="email">
                <label>PASSWORD</label>
                <input id="password-regis" type="password" required v-model="password">
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'register',
    data () {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }, 
    methods: {
        regis() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: {
                    first_name: this.first_name, 
                    last_name: this.last_name, 
                    email: this.email, 
                    password: this.password
                }
            }) 
                .then((response) => {
                    this.notifSuccess('register success')
                    this.changePage('login')
                })
                .catch(err => {
                    this.notifFailed(err.response.data.msg)
                })
        },
        changePage(page) {
            this.$emit('changePage', page)
        },
        notifSuccess(msg) {
            this.$emit('notifSuccess', msg)
        },
        notifFailed(msg) {
            this.$emit('notifFailed', msg)
        }
    }
}
</script>

<style>

</style>