<template>
  <div>
      <h1>Register</h1>
      <form @submit.prevent="registering">
         <label>Name</label>
         <input type="text" v-model="name" v-focus required>
         <label>Email</label>
         <input type="email" v-model="email" required>
         <label>Password</label>
         <input type="password" v-model="password" required> 
         <input type="submit">
      </form>
   </div>
</template>

<script>
import axios from '../config/axios'

export default {
   name: "Register",
   data: function() {
      return {
         name:'',
         password:'',
         email:''
      }
   }, 
   methods : {
      registering : function () {
         console.log('masuk register')
         let name = this.name
         let email = this.email
         let password = this.password
         axios({
            method: "POST",
            url: "/users/register",
            responseType: 'json',
            data : {
               name,
               email,
               password
            }
         })
            .then(({data}) => {
               console.log(data, 'berhasil register')
               // console.log(token)
               localStorage.token = data.token 
               this.$emit('changePage', 'board', true)
            })
            .catch(err => {
               console.log(err, 'gagal register')
               
            })
      }
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