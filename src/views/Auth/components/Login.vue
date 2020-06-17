<template>
  <div class="container">
    <div class="inner-container">
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
        <div style="text-align:center; margin-top: 25px">
          <input class="btn btn-primary mb-3" type="submit">
        </div>
      </form>
      <div style="display: flex; flex-direction: column; align-items:center; margin: 10px">
        <Google class="justify-content-center" @click.prevent="changePage('board')"></Google>
      </div>
      <div style="display:flex; justify-content: space-between; margin: 30px 0px">
        <span>Don't have an account ?</span>
        <a href="#" @click.prevent="changePage('register', false)"><span>Register</span></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../../config/axios'
import Google from './GoogleSignIn'

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
          url: "/users/login",
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
      changePage (page, status) {
        this.$emit('changePage', page, status)
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

<style scoped>
  .container {
    box-shadow: 0px 1px 5px 5px rgba(0,0,0,0.14);
    margin-top: 50px;
    height: 480px;
    width: 400px;
    padding: 30px
  }
  .inner-container {
    padding: 5px 10px;
  }
</style>