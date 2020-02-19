<template>
    <div id="register">
        <center>
            
            <!-- <h2 style="margin: 30px auto">OR</h2>
            <div id="register-g-sign" class="g-signin2" data-onsuccess="onSignIn"></div> -->
        </center>

        <div>
            <b-card
                tag="article"
                style="min-width: 20rem; min-height:25rem"
                class="mb-2"
            >
            <b-card-text>
                <center>
                    <form style="" v-on:submit.prevent="createUser">
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
                    
                </center>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
export default {
    name : 'RegisterUser',
    data() {
        return {
            register : {
                name : "",
                email : "",
                password : ""
            },
            params: {
                // client_id: "967015570633-a405l1qnha9u0cft0dg2qdkrsb0af6br.apps.googleusercontent.com"
                client_id: "202761687018-njs4ug7uuanl4u971cj77ceok473k3qo.apps.googleusercontent.com"
            },
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    methods : {
        createUser() {
            console.log('MASUK CREATE')
            axios({
                method : "POST",
                url : "https://young-retreat-16880.herokuapp.com/register",
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
        },
        onSuccess(googleUser) {
            // console.log(googleUser);
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token)

            axios({
                method: "POST",
                url : "https://young-retreat-16880.herokuapp.com/googleSign",
                data : {
                    id_token : id_token
                }
            })
                .then(({ data }) => {
                    this.reset()
                    this.$emit('loginSuccess', data.accesToken)
                })
                .catch(err => {
                    console.log(err.response)
                })

            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile());
        }
        
    }
}
</script>

<style>

</style>