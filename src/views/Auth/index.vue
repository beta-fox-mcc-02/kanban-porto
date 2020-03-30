<template>
  <div>
    <Login @changePage="changePage" v-if="currentPage === 'login'"></Login>
    <Register @changePage="changePage" v-if="currentPage === 'register'"></Register>
  </div>
</template>

<script>
import Login from './components/Login'
import Register from './components/Register'

export default {
  name: 'Auth',
  props: [
    'currentPage'
  ],
  components: {
    Register,
    Login
  },
  created () {
    console.log(this.currentPage, '===')
  },
  methods: {
    changePage (page, status) {
      console.log('masuk')
      this.$emit('changePage', page, status)
    }
  }
}
</script>

<style>

</style>