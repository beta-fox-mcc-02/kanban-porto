<template>
  <div id="mainPage">
    <login-page/>
  </div>
</template>

<script>
import loginPage from './components/login'

export default {
  name: 'App',
  data() {
    return {
      message: 'Hello world',
    };
  },
  components: {
    loginPage
  }
};
</script>

<style scoped>
 
</style>