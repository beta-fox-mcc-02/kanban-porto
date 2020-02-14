<template>
  <div :class="alertClass" role="alert">{{ message }}</div>
</template>

<script>
export default {
  name: "Alert",
  props: ["message", "alertClass"]
};
</script>