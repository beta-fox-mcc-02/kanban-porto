<template>
  <div class="menu">
    <a @click.prevent="toggleInput()" class="dropdown-item" href="#">Edit</a>
    <!-- input -->
    <div v-if="showInput" class="input-category custom-margin">
      <small v-if="error" class="error">{{ error }}</small>
      <div class="input-group mb-3">
        <input v-model="inputTitleTask" type="text" class="form-control" />
        <div class="input-group-append">
          <button @click="editTask()" class="btn btn-dark" type="button">Edit</button>
        </div>
      </div>
    </div>
    <a @click.prevent="deleteTask()" class="dropdown-item" href="#">Delete</a>
    <div class="dropdown-item">
      <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
      <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MenuTask",
  data() {
    return {
      error: "",
      inputTitleTask: "",
      showInput: false,
      categoriesID: []
    };
  },
  props: {
    categoryIdProps: Number,
    taskId: Number,
    taskTitle: String
  },
  methods: {
    editTask() {
      axios({
        method: "put",
        url: `http://localhost:3000/tasks/${this.categoryIdProps}/${this.taskId}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.inputTitleTask
        }
      })
        .then(response => {
          console.log(response);
          this.$emit("fetchTasks");
          this.showInput = false;
        })
        .catch(error => {
          console.log(error.response.data.error);
          this.error = "*" + error.response.data.error[0];
        });
    },
    deleteTask() {
      axios({
        method: "delete",
        url: `http://localhost:3000/tasks/${this.categoryIdProps}/${this.taskId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          console.log(response);
          this.$emit("fetchTasks");
        })
        .catch(error => {
          console.log(error.response.data.error);
          //   this.error = "*" + error.response.data.error[0];
        });
    },
    toggleInput() {
      console.log("tes");
      if (this.showInput) {
        this.showInput = false;
      } else {
        this.showInput = true;
      }
    }
  },
  created() {
    this.inputTitleTask = this.taskTitle;
  }
};
</script>

<style>
.menu {
  position: relative;
}
.custom-margin {
  margin: 0 !important;
}
</style>