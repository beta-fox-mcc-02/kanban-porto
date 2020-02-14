<template>
    <div class="container mx-auto" style="width: 20rem; margin-top: 10rem;" v-if="page === 'login'">
        <h3>Sign In</h3>
          <form @submit.prevent="login">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
              </div>
              <button type="submit" class="btn btn-primary mb-4">Sign In</button>
            </form>            
            <p><a href="#" @click.prevent="changePage('register')">Register Here</a></p>
            <!-- <div class="g-signin2" @click.prevent="onSignIn" data-onsuccess="onSignIn"></div> -->
            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin>
            
      </div>
</template>
<script>
import GoogleLogin from 'vue-google-login';
import axios from '../api/axiosInstance'
name : 'loginPage'
export default {
    data (){
        return {
            email:'',
            password:'',
            params: {
                    client_id:"510406314847-lvokpsqv9ak9mqehnv8pquumd7e0m6dq.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    props:{
        page: String
    },
    components: {
        GoogleLogin
    },
    methods:{
          onSuccess(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile());
                axios({
                method: 'post',
                url: `/user/gSignin`,
                data: {
                    id_token
                }
            })
                .then(({ data }) => {
                  console.log('disini', data.token);
                
                    if(data.token){
                        localStorage.setItem('token', data.token);
                        console.log(data);
                        this.email = ''
                        this.password = ''
                        this.changePage('home')
                    }
                    
                })
                .catch(err => {
                    console.log(err)

                })
        },
         signIn(googleUser) {
           var id_token = googleUser.getAuthResponse().id_token;
            // var profile = googleUser.getBasicProfile();
            // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            // this.page = 'home'   


                console.log(id_token, 'dari onsign');
                

        },
        login(){
             axios({
                method: 'post',
                url: '/user/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({ data }) => {
                    if(data.token){
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('name', data.name);
                        console.log(data);
                        this.email = ''
                        this.password = ''
                        this.changePage('home')
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
            
        },
         changePage(laman){
            console.log('dari login page',laman);
            this.$emit('change-Page', laman)

            this.$emit('fetch-project', laman)

        },
    }
}
</script>

<style>

</style>