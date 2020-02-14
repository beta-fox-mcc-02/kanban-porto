<template>
  <div class="spinner-border" role="status" id="loading-page">
    <span class="sr-only"></span>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',

}
</script>

<style>

#loading-page{
  position: absolute;
  height: 50px;
  width: 50px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  background-size: 100%;
  z-index: 99;
}

</style>