<template>
    <div id="register">
        <center>
            <form style="width:25%;" v-on:submit.prevent="createUser">
                <h2>Register</h2>
                <div class="form-group">
                    <label for="exampleInputname">Name</label>
                    <input type="text" id="nameRegister" class="form-control" v-model="register.name">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" id="emailRegister" class="form-control" v-model="register.email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" id="passwordRegister" class="form-control" v-model="register.password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <!-- <h2 style="margin: 30px auto">OR</h2>
            <div id="register-g-sign" class="g-signin2" data-onsuccess="onSignIn"></div> -->
        </center>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'RegisterUser',
    data() {
        return {
            register : {
                name : "",
                email : "",
                password : ""
            }
        }
    },
    methods : {
        createUser() {
            axios({
                method : "POST",
                url : "http://localhost:3000/register",
                data : {
                    name : this.register.name,
                    email : this.register.email,
                    password : this.register.password
                }
            })
                .then(user => {
                    // this.currentPage = 'loginPage'
                    this.reset()
                    this.$emit('registerSuccess')
                })
                .catch(response => {
                    console.log(response.data)
                })  
        },
        reset() {
            this.register = {
                name : "",
                email : "",
                password : ""
            }
        }
    }
}
</script>

<style>

</style>