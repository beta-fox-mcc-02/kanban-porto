<template>
  <div class="col-12 p-0 header d-flex align-items-center">
      <div class="col-3 header-center d-flex justify-content-start">
      </div>
      <div class="col-6 p-0 d-flex justify-content-center header-left">
        <p class="m-0 logo">KANBAN</p>
      </div>
      <div class="col-3 d-flex justify-content-end header-right">
        <p 
          class="m-0 btn-signOut"
          v-if="isLogedIn"
          @click="signOut"
        >Sign out</p>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
      isLogedIn: Boolean
    },
    data() {
        return {
        }
    },
    methods: {
      signOut() {
        this.$emit('changeIsLogedIn', false)
        this.$emit('changePage', 'signIn')
        localStorage.removeItem('token')
      }
    },
    created() {
      if (localStorage.getItem('token')) {
        this.isLogedIn = true
      }
    },
}
</script>