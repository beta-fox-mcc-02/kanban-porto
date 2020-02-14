<template>
    <div class="register">
        <!-- <div class="container"> -->
            <h1>Register Form</h1> <br>
            <form @submit.prevent="userRegister">
                <label>Username</label>
                <input v-model="email" type="text" name="" class="form_register" placeholder="Input your email...">

                <label>Password</label>
                <input v-model="password" type="password" name="password" class="form_register" placeholder="Input your password...">

                <label>Confirm Password</label>
                <input v-model="confirmpassword" type="password" name="confirmpassword" class="form_register" placeholder="Input your confirm password...">

                <input type="submit" id="login-button" class="btn_login" value="LOGIN"><br>
            </form>		
        <!-- </div> -->
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "registerPage",
    data() {
        return {
            email: "",
            password: "",
            confirmpassword: ""
        };
    },
    methods: {
        userLogin() {
            if(password === confirmpassword) {
                axios({
                    method: "post",
                    url: "http://localhost:3000/users/login",
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                    .then(success => {
                        const { token, email } = success.data;

                        this.$emit('showContent', "contentPage");
                        localStorage.setItem("token", token);
                    })
                    .catch(err => {
                        console.log(err);
                        
                        this.$emit("error-message",
                        "Email or password dismatch");
                    })
            } else {
                
            }
        },
        toRegister() {
            this.$emit("change-page", "register");
        }
    }
}
</script>

<style>
</style>