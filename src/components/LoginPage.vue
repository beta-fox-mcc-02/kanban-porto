<template>
  <div>
    <div class="row justify-content-md-center login">
      <div class="col col-lg-2"></div>
      <div class="col-md-auto">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for>Email</label>
            <input v-model="user.email" type="email" class="form-control" autofocus/>
          </div>
          <div class="form-group">
            <label for>Password</label>
            <input v-model="user.password" type="password" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
        <p>
          Don't Have Any Account?
          <a href @click.prevent="toggleRegister()">Register Here</a>
        </p>
      </div>
      <div class="col col-lg-2"></div>
    </div>
    <!-- modal register -->
    <div v-if="showRegister" class="modal-dialog modal-lg abs-register">
      <div class="modal-content">
        <!-- content -->
        <form class="register">
          <div class="form-group">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <label for>First Name</label>
            <input v-model="newUser.first_name" type="text" class="form-control" name="first_name" />
          </div>
          <div class="form-group">
            <label for>Last Name</label>
            <input v-model="newUser.last_name" type="text" class="form-control" name="last_name" />
          </div>
          <div class="form-group">
            <label for>Email address</label>
            <input v-model="newUser.email" type="email" class="form-control" name="email" />
          </div>
          <div class="form-group">
            <label for>Password</label>
            <input v-model="newUser.password" type="password" class="form-control" name="password" />
          </div>
          <button @click.prevent="register()" type="submit" class="btn btn-primary">Register</button>
          <button @click="toggleRegister()" type="submit" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      },
      error: "",
      showRegister: false
    };
  },
  methods: {
    login() {
      this.error = "";
      axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(response => {
          localStorage.token = response.data.token;
          this.$emit("changePage", "kanban");
        })
        .catch(error => {
          this.error = error.response.data.error;
        });
    },
    register() {
      this.error = "";
      axios({
        method: "post",
        url: "http://localhost:3000/register",
        data: {
          first_name: this.newUser.first_name,
          last_name: this.newUser.last_name,
          email: this.newUser.email,
          password: this.newUser.password
        }
      })
        .then(response => {
          localStorage.token = response.data.token;
          this.$emit("changePage", "kanban");
        })
        .catch(error => {
          this.error = error.response.data.error[0];
        });
    },
    toggleRegister() {
      if (this.showRegister) {
        this.showRegister = false;
        this.error = "";
      } else {
        this.showRegister = true;
        this.error = "";
      }
    }
  }
};
</script>

<style>
.alert {
  text-align: center;
}
.login {
  margin: 100px 0;
}
.register {
  padding: 30px !important;
}

.abs-register {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
