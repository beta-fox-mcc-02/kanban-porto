<template>
     <div class="container mx-auto" style="width: 20rem; margin-top: 10rem;" v-if="page === 'register'">
          <h3>Register</h3>
            <form @submit.prevent="register">
                <div class="form-group">
                    <label for="exampleInputEmail1">name</label>
                    <input type="text" class="form-control" id="" aria-describedby="emailHelp" placeholder="Enter name" v-model="name">
                  </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="" placeholder="Password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary mb-4">Register</button>
              </form>            
              <p><a href="#" @click="changePage('login')">Sign page</a></p>
        </div>
</template>

<script>
name : 'registerPage'
import axios from '../api/axiosInstance'
export default {
    data(){
        return {
            name:'',
            email:'',
            password:''
        }
    },
    props:{
        page: String
    },
    methods:{
        register(){
          axios({
            method: 'post',
            url: '/user/regis',
            data: {
              name: this.name,
              email: this.email,
              password: this.password
            }
          })
          .then(({ data }) => {
            console.log(data);
            
            this.name = ''
            this.email = ''
            this.password = ''
            localStorage.setItem('access_token', data.token);
            // this.changePage('home')
          })
            .catch(err => {
                console.log(err)
            })
            
        },
        changePage(laman){
             console.log('dari register page',laman);
             this.$emit('change-Page', laman)
        }
    }
}
</script>

<style>

</style>