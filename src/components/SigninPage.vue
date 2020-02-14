<template>
<div class="form-signin">
  <div class="container">
    <div class="row">
      <div class="col-lg-7">
        <div class="card shadow" style="width: 18rem">
          <div class="card-title text-center">
            <h3>Sign In</h3>
          </div>
          <form @submit.prevent="signIn">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="email" v-model="email" required>
              <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="email">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <div class="button-group p-0 text-center">
              <button type="submit" class="btn btn-primary">Sign In</button>
            </div>
          </form>
          <div class="google-sigin text-center">
              <p>Or</p>
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                :onFailure="onFailure">
              </GoogleLogin>
          </div>
            <span class="text-center">Already have an account ?<br> Sign Up <em @click="changePage('sign-up')" style="cursor: pointer;">Here !<em></span>
        </div>
      </div>
      <div class="col-lg-5 text-white">
        <h3>Kanban make you easier to manage your project and teamwork !</h3>
        <p>What do you waiting for ? Come and join us now !</p>
        <p>Sign up -> Sign In -> make project -> add members -> add task to project</p>
        <p>Easy way to control your Team !</p>
        <img src="https://blog.trello.com/hubfs/2017-08-04_7-Ways-To_Make-Sure-Important-Tasks-Dont-Slip-Through-The-Cracks_r01%20%281%29.png" alt="">
      </div>
    </div>
    
  </div>
</div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from '../config'
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      params: {
        client_id: '206242195437-vvsm0ghpb6clbkrk7e7fmj5hemvdj81b.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    signIn () {
      axios({
        method: 'POST',
        url: '/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({ data }) => {
        this.password = ''
        this.email = ''
        localStorage.token = data.token
        localStorage.currentUser = data.name
        this.$emit('changePage', 'home')
      })
      .catch(_ => {})
    },
    changePage (page) {
      this.$emit('changePage', 'sign-up')
    },
    onSuccess(googleUser) {
    let token = googleUser.getAuthResponse().id_token;
      axios({
        method: 'POST',
        url: '/gsignin',
        data: {
          token
        }
      })
      .then(({ data }) => {
        localStorage.token = data.token
        localStorage.currentUser = data.name
        this.$emit('changePage', 'home')
      })
      .catch()
    },
    onFailure (googleUser) {
    }
  }
}
</script>

<style scoped>
  .form-signin {
    max-height: 100vh;
    background: linear-gradient(135deg, #0079bf, #5067c5);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .container {
    padding: 10%;
    max-height: 100vh;
    min-height: 100vh;
  }

  p {
    margin : 0;
    font-size: 1rem;
  }

  form {
    padding: 1rem;
  }
  .card {
    border: 0.5px solid grey;
    padding: 1rem;
  }

  img {
    width: 100%
  }
</style>