<template>
  <a href="#" class="myButton">{{ value }}</a>
</template>

<script>
export default {
  name: 'NButton'
}
</script>

<style scoped>
  .myButton {
    background-color:#44c767;
    border-radius:42px;
    border:2px solid #18ab29;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:17px;
    padding:12px 36px;
    text-decoration:none;
    text-shadow:0px 3px 6px #2f6627;
  }
  .myButton:hover {
    background-color:#5cbf2a;
    transition: 0.9ms;
  }
  .myButton:active {
    position:relative;
    top:1px;
  }
</style>