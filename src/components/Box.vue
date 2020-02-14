<template>
  <div class="col-3 my-5">
    <div class="container rounded-top py-1 text-center" :class="box.bgColor">
      <h5 class="mt-2" style="color: white">
        <strong>{{box.name}}</strong>
      </h5>
    </div>
    <div
      class="rounded-bottom"
      style="max-height: 60vh; overflow: auto; background-color: whitesmoke"
    >
      <Content
        v-for="tasks in statusTask"
        :key="tasks.id"
        :tasks="tasks"
        :box="box"
        @getProject='getProject'
      ></Content>
    </div>
  </div>
</template>

<script>
import Content from "./Content";
export default {
  name: `Box`,
  props: ["box", "openProjectTasks"],
  components: {
    Content
  },
  data() {
    return {

    };
  },
  methods: {
     getProject (id) {
        this.$emit('getProject', id)
     }
  },
  computed: {
    statusTask() {
      const arr = [];
      this.openProjectTasks.forEach(data => {
        if (data.status === this.box.name) {
          arr.push(data);
        }
      });
      return arr;
    }
  }
};
</script>

<style>
</style>