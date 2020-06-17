<template>
  <div class="text-center">
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <br />
    <div>
      <h2>LOADING...</h2>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style scoped>
  .text-center {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>