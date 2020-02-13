<template>
  <div class="task-wrapper">
    <a @click="updateTask" class="task-content">
      <div class="task-title">{{ taskInfo.title }}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskInfo"],
  methods: {
    updateTask() {
      this.$emit("updateTask", this.taskInfo.id);
    }
  }
};
</script>