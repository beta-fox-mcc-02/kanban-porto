<template>
<div class="form-signup">
  <div class="container">
    <div class="row">
      <div class="col-lg-7">
        <div class="card shadow" style="width: 18rem">
          <div class="card-title text-center">
            <h3>Sign Up</h3>
          </div>
          <form @submit.prevent="signUp">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" aria-describedby="name" v-model="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="email" v-model="email" required>
              <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="email">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <div class="button text-center">
              <button type="submit" class="btn btn-primary">Sign Up</button>
              <button type="button" class="btn btn-primary" @click="changePage('sign-in')">Sign In</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-lg-5 text-white">
        <h3>Kanban make you easier to manage your project and teamwork !</h3>
        <p>What do you waiting for ? Come and join us now !</p>
        <p>Sign up -> Sign In -> make project -> add members -> add task to project</p>
        <p>Easy way to control your Team !</p>
        <img src="https://blog.trello.com/hubfs/sloth_procrastination.png" alt="img">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SignUpPage',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/signup',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(({ data }) => {
        this.name = ''
        this.password = ''
        this.email = ''
        localStorage.token = data.token
        localStorage.currentUser = data.name
        this.$emit('changePage', 'sign-in')
      })
      .catch(err => console.log(err))
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style scoped>
  .form-signup {
    max-height: 100vh;
    background: linear-gradient(135deg, #0079bf, #5067c5);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .container {
    padding: 10%;
    max-height: 100vh;
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
    width: 100%;
  }
</style>