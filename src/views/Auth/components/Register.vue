<template>
  <div class="container">
    <div class="inner-container">
      <h1 class="text-center">Register</h1>
      <form @submit.prevent="registering">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="name" v-focus required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" required> 
        </div>
        <div style="text-align:center; margin-top: 30px">
          <input class="btn btn-primary mb-3" type="submit">
        </div>
      </form>
      <div style="display:flex; justify-content: space-between; margin: 10px 0px">
        <span>Already have an account ?</span>
        <a href="#" @click.prevent="changePage('login', false)"><span>Login</span></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../../config/axios'

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
        data: {
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
    },
    changePage (page, status) {
      this.$emit('changePage', page, status)
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
  .container {
    box-shadow: 0px 1px 5px 5px rgba(0,0,0,0.14);
    margin-top: 30px;
    height: 480px;
    width: 400px;
    padding: 5px 10px;
  } 
  .inner-container {
    padding: 10px 30px;
  }
</style>