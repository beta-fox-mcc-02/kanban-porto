<template>
  <div>
    <CardTask
      v-for="task in tasksProps"
      :key="task.id"
      :taskId="task.id"
      :taskTitle="task.title"
      :categoryIdProps="categoryIdProps"
      @fetchDataTasksSection="fetchDataTasksSection"
      :categoriesID="categoriesID"
    ></CardTask>
    <div class="add-task">
      <button v-if="showInput" @click="toggleInput" type="button" class="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <button v-if="!showInput" @click="toggleInput" class="new-task-button">+Add New Task</button>
      <div v-if="showInput" class="input-category">
        <small v-if="error" class="error">{{ error }}</small>
        <div class="input-group mb-3">
          <input
            v-model="inputTitleTask"
            type="text"
            class="form-control"
            placeholder="Add New Task"
          />
          <div class="input-group-append">
            <button @click="createTask()" class="btn btn-dark" type="button">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardTask from "./CardTask";
export default {
  name: "Tasks",
  props: {
    tasksProps: Array,
    categoryIdProps: Number,
    categoriesID: Array
  },
  components: {
    CardTask
  },
  data() {
    return {
      tasks: [],
      error: "",
      inputTitleTask: "",
      showInput: false
    };
  },
  methods: {
    toggleInput() {
      if (this.showInput) {
        this.showInput = false;
        this.inputTitleTask = "";
      } else {
        this.showInput = true;
        this.inputTitleTask = "";
      }
    },
    createTask() {
      this.error = "";
      axios({
        method: "post",
        url: `https://thawing-spire-40854.herokuapp.com/tasks/${this.categoryIdProps}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.inputTitleTask
        }
      })
        .then(response => {
          this.showInput = false;
          this.$emit("fetchData");
          this.inputTitleTask = "";
        })
        .catch(error => {
          console.log(error.response.data.error);
          this.error = "*" + error.response.data.error[0];
        });
    },
    fetchDataTasksSection() {
      this.$emit("fetchData");
    }
  },
  created() {}
};
</script>

<style>
.add-task {
  position: relative;
}

.new-task-button {
  margin-top: 5px;
  font-weight: bold;
  border: none;
  background: none;
  width: 100%;
}

.new-task-button:hover {
  color: steelblue;
}

.menu {
  font-size: 12px;
}
.menu a {
  font-weight: bold;
}
</style>
