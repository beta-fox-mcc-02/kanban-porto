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
      <i @click="moveLeft()" class="fa fa-chevron-circle-left" aria-hidden="true"></i>
      <i @click="moveRight()" class="fa fa-chevron-circle-right" aria-hidden="true"></i>
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
      showInput: false
    };
  },
  props: {
    categoryIdProps: Number,
    taskId: Number,
    taskTitle: String,
    categoriesID: Array
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
          this.$emit("fetchDataCardTask");
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
          this.$emit("fetchDataCardTask");
        })
        .catch(error => {
          console.log(error.response.data.error);
        });
    },
    toggleInput() {
      if (this.showInput) {
        this.showInput = false;
      } else {
        this.showInput = true;
      }
    },
    moveRight() {
      let index = this.categoriesID.findIndex(
        el => el === this.categoryIdProps
      );
      if (index != this.categoriesID.length - 1) {
        axios({
          method: "put",
          url: `http://localhost:3000/tasks/${this.categoryIdProps}/${this.taskId}/updateCategory`,
          headers: {
            token: localStorage.token
          },
          data: {
            category_id: this.categoriesID[index + 1]
          }
        })
          .then(response => {
            this.$emit("fetchDataCardTask");
          })
          .catch(error => {
            console.log(error.response.data.error);
          });
      }
    },
    moveLeft() {
      let index = this.categoriesID.findIndex(
        el => el === this.categoryIdProps
      );
      if (index != 0) {
        axios({
          method: "put",
          url: `http://localhost:3000/tasks/${this.categoryIdProps}/${this.taskId}/updateCategory`,
          headers: {
            token: localStorage.token
          },
          data: {
            category_id: this.categoriesID[index - 1]
          }
        })
          .then(response => {
            this.$emit("fetchDataCardTask");
          })
          .catch(error => {
            console.log(error.response.data.error);
          });
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