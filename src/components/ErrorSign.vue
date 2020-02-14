<template>
  <div id="alert" class="container alert alert-warning alert-dismissible">
      {{ error }}
  </div>
</template>

<script>
export default {
  name : 'ErrorSign',
  props : {
    error : String
  } ,
  data (){
    return {
    }
  }
}
</script>

<style>

</style>