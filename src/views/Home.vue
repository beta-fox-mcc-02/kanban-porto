<template>
  <fragment>
    <Navbar></Navbar>
    <main role="main">
      <div class="jumbotron">
        <img src="../assets/images/computer-2982270_1280.jpg" />
        <div class="container">
          <h1 class="display-3 heading">Make you work more efficiently and get more done.</h1>
          <p
            class="heading-description"
          >Lists and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
          <div class="form-inline mt-20">
            <div class="form-group">
              <input
                type="email"
                class="form-control email-register"
                id="input-register-email"
                placeholder="Email"
                v-model="email"
                v-on:keyup="email = $event.target.value"
              />
            </div>
            <router-link
              class="btn btn-primary"
              :to="{ path: 'register', query: { email }}"
            >Register</router-link>
          </div>
        </div>
      </div>
    </main>
  </fragment>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Home",
  components: {
    Navbar
  },
  data: () => {
    return {
      email: ""
    };
  }
};
</script>


<style lang="scss" scoped>
.jumbotron {
  margin-top: 70px;
  height: 80vh;
  color: #fff;
  position: relative;
  background-color: transparent;
  padding: 0;

  img {
    z-index: -100;
    position: absolute;
    filter: brightness(60%);
    width: 100%;
    height: auto;
    top: 0;
    right: 0;
  }

  h1 {
    &.heading {
      padding-top: 50px;
      word-spacing: 10px;
    }
  }

  .heading-description {
    width: 50%;
    word-spacing: 4px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .form-inline {
    display: flex;
    .form-group {
      flex: 0.4 1 auto;
    }
  }

  .email-register {
    width: 100%;
    margin-right: 10px;
  }
}
</style>