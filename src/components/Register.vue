<template>
  <div class="card m-5 p-5 w-50 mx-auto">
      <h1 class="text-center mb-4">Register</h1>
      <form @submit.prevent="registering" class="mx-auto">
         <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="name" v-focus required>
         </div>
         <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" v-model="email" required>
         </div>
         <div class="form-group mb-5">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" required> 
         </div>
         <input class="btn btn-primary" type="submit">
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
         // console.log('masuk register')
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
               // console.log(data, 'berhasil register')
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

<style scoped>
   .form-control {
      width : 400px
   }
</style>