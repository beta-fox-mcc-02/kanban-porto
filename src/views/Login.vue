<template>
  <div class="login-form-container">
    <form class="form-login">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Please login</h1>
      </div>
      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />
        <label for="inputEmail">Email address</label>
      </div>
      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
        />
        <label for="inputPassword">Password</label>
      </div>
      <button class="btn btn-lg btn-success btn-block" type="submit">Login</button>
      <div class="login-method-separator">OR</div>
      <GoogleSignInButton></GoogleSignInButton>
      <hr />
      <div class="register-account">
        <p>Don't have an account ?</p>
        <router-link to="/register">Register a new account</router-link>
      </div>
      <div class="img-login">
        <img class="img-fluid" src="../assets/images/laptop-2298286_1280.jpg" />
      </div>
    </form>
  </div>
</template>

<script>
import GoogleSignInButton from "../components/GoogleSignInButton";
export default {
  name: "Login",
  components: { GoogleSignInButton },
  data() {
    return {
      email: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.form-login {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin-top: 30px;
}

.login-method-separator {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10x;
}

.login-form-container {
  height: 100%;
  display: flex;
  justify-content: center;
}

.img-login {
  margin-top: 40px;
  z-index: 10000;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;
  padding: 0.75rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.register-account {
  display: flex;
  justify-content: space-between;
}
</style>