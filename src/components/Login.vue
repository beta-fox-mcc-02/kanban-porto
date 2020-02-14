<template>
   <div class="card m-5 p-5">
      <div>
         <h1 class="text-center">Login</h1>
         <form @submit.prevent='login'>
            <div class="form-group">
               <label for="email">Email</label>
               <input type="email" class="form-control" v-model="email" v-focus required>
            </div>
            <div class="form-group">
               <label>Password</label>
               <input type="password" class="form-control" v-model="password" required> 
            </div>
            <input class="btn btn-primary mb-3" type="submit">
         </form>
         <Google class="justify-content-center" @changePage="changePage"></Google>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import Google from '../components/GoogleSignIn'

export default {
   name: 'Login',
   data: function() {
      return {
         name:'',
         password:'',
         email:''
      }
   }, 
   methods : {
      login () {
         let email = this.email
         let password = this.password
         axios({
            method: "POST",
            url: "http://localhost:3000/users/login",
            data : {
               email,
               password
            }
         })
            .then(({data}) => {
               // console.log(data, 'berhasil login')
               localStorage.token = data.token
               this.$emit('changePage', 'board', true)
            })
            .catch(err => {
               console.log(err, 'gagal login')
            })
      },
      changePage () {
         this.$emit('changePage', 'board', true)
      }
   },
   components : {
      Google
   },
   directives: {
      focus: {
         inserted: function (el) {
            el.focus()
         }
      }
   }
}
</script>

<style>

</style>