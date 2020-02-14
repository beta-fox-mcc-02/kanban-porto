<template>
  <div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ errorMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeErrorMessage">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: String
  },
  name: 'Alert',
  data(){
    return {

    }
  },
  methods: {
    closeErrorMessage(){
      this.$emit('closeErrorMessage')
    }
  }
}
</script>

<style>

</style>