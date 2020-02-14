<template>
  <div>
    <div class="card task">
      <h3>{{ taskTitle }}</h3>
      <a @click.prevent="toggleMenu()" href class="abs">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </a>
    </div>
    <MenuTask
      v-if="showMenu"
      :categoryIdProps="categoryIdProps"
      :taskId="taskId"
      :taskTitle="taskTitle"
      @fetchTasks="fetchTasks"
    ></MenuTask>
  </div>
</template>

<script>
import MenuTask from "./MenuTask";
export default {
  name: "CardTask",
  props: {
    taskTitle: String,
    categoryIdProps: Number,
    taskId: Number
  },
  data() {
    return {
      showMenu: false
    };
  },
  components: {
    MenuTask
  },
  methods: {
    toggleMenu() {
      if (this.showMenu) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    },
    fetchTasks() {
      this.$emit("fetchTasks");
    }
  }
};
</script>

<style>
</style>