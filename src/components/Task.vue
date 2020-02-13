<template>
  <div class="task-wrapper">
    <div class="task-content">
      <div class="task-title">{{ taskInfo.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskInfo"]
};
</script>