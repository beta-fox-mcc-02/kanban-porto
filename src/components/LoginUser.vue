<template>
  <div id="login">
      <div>
            <b-card
                tag="article"
                style="min-width: 20rem; min-height:25rem"
                class="mb-2"
            >
            <b-card-text>
                <center>
                    <form style="" v-on:submit.prevent="loginUser">
                        <h2>Login</h2>
                        <div class="form-group">
                            <label for="exampleInputEmail">Email address</label>
                            <input type="email" id="emailLogin" class="form-control" v-model="login.email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword">Password</label>
                            <input type="password" id="passwordLogin" class="form-control" v-model="login.password">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </center>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'LoginUser',
    data () {
        return {
            login : {
                email : "",
                password : ""
            }
        }
    },
    methods : {
        loginUser() {
            axios({
                method : "POST",
                url : "http://localhost:3000/login",
                data : {
                    email : this.login.email,
                    password : this.login.password
                }
            })
                .then(({data}) => {
                    this.reset()
                    this.$emit('loginSuccess', data.access_token)
                    
                })
                .catch(response => {
                    console.log(response.data)
                })
        },
        reset() {
            this.login = {
                email : "",
                password : ""
            }
        }
    }
}
</script>

<style scoped>
  
</style>