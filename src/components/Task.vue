<template>
  <div class="task-wrapper">
    <a @click="updateTask" class="task-content">
      <div class="task-title">
        <span>{{ task.title }}</span>
        <div class="task-description" v-if="task.description">
          <i class="fa fa-tasks"></i>
        </div>
      </div>
    </a>
    <a @click="openModalDelete" class="delete-task">
      <i class="fa fa-trash"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  methods: {
    updateTask() {
      this.$emit("updateTask", this.task.id);
    },
    openModalDelete() {
      this.$emit("openModalDelete", {
        isOpen: true,
        taskId: this.task.id
      });
    }
  }
};
</script>