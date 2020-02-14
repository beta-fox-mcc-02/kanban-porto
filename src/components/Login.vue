<template>
    <div class="login">
        <h1>Login Form</h1> <br>
        <form @submit.prevent="userLogin">
            <label>Email</label>
            <input v-model="email" type="text" name="" class="form_login" placeholder="Input your email...">

            <label>Password</label>
            <input v-model="password" type="password" name="password" class="form_login" placeholder="Input your password...">

            <input type="submit" id="login-button" class="btn_login" value="LOGIN"><br>
            
            <center><label>OR</label></center>

            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="btn_login">Google Sign-in</GoogleLogin>
<!--             
            <br><br><br>
            <center><label>No account?</label></center>

            <input type="submit" id="login-button" class="btn_login" value="Create one!"><br> -->
            <!-- <div id="login-gsignin">
                <section id="section-login">
                    <div class="g-signin2" data-onsuccess="onSignIn" data-width=310 data-height=41></div>
                </section>
            </div> -->
        </form>		
    </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from 'vue-google-login';
export default {
    name: "loginPage",
    data() {
        return {
            email: "",
            password: "",
            params: {
                    client_id: "521541241200-84v66624ihf4s8r74l0tsbn2156khdi5.apps.googleusercontent.com"
            },
                // only needed if you want to render the button with the google ui
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        };
    },
    methods: {
        userLogin() {
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

                    this.$emit('showContent', "Home");
                    localStorage.setItem("token", token);
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        },
        toRegister() {
            this.$emit("change-page", "register");
        },
        onSuccess(googleUser) {
            // console.log(1, googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(2, googleUser.getBasicProfile().zu);

            axios({
                method: "post",
                url: "http://localhost:3000/users/signin",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(success => {
                    console.log(1);
                    
                    const { token, email } = success.data;

                    this.$emit('showContent', "Home");
                    localStorage.setItem("token", token);
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        },
        onFailure(e) {
            console.log(e)
        }
    }, components: {
        GoogleLogin
    }
}
</script>

<style>
</style>