<template>
  <div class="container-task">
    <div class="task-content">
      <center>
        <b>Task</b>
        <hr width="20%" color="steelblue" />
        <form v-on:submit.prevent="addTask" method="post">
          <input
            type="text"
            name="title-task"
            id="title-task"
            placeholder="your task title...."
            class="input-text"
            v-model="title"
          />
          <br />
          <input type="submit" value="Add new backlog" class="button-primary" />
        </form>
        <button class="button-success" v-on:click="kanban">Back to kanban</button>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  name: "KanbanForm",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    kanban() {
      this.$emit("changePage", "kanban");
    },
    addTask() {
      const title = this.title;
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "post",
        url: "https://frozen-sands-95268.herokuapp.com/create",
        data: {
          title: title,
          CategoryId: 1
        },
        headers: {
          access_token
        }
      })
        .then(response => {
          console.log(response);
          console.log("Backlog added");
          this.kanban();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
