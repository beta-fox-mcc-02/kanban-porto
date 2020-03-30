<template>
  <div class="alert" :class="getAlert">
    {{ alertMessage }}
  </div>  
</template>

<script>
export default {
  name: Alert,
  computed: {
    getAlert () {
      return ''
    },
    alertMessage () {
      return ''
    }
  }
}
</script>

<style>

</style>
