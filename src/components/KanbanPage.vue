<template>
  <div class="container-fluid custom-display">
    <div v-for="category in data" :key="category.id" class="card">
      <CategoryHeader
        @fetchData="fetchData"
        :categoryNameProps="category.name"
        :categoryIdProps="category.id"
      ></CategoryHeader>
      <Tasks
        @fetchData="fetchData"
        :categoryIdProps="category.id"
        :tasksProps="category.Tasks"
        :categoriesID="categoriesID"
      ></Tasks>
    </div>
    <div class="input-category">
      <small v-if="error" class="error">{{ error }}</small>
      <div class="input-group mb-3">
        <input
          v-model="categoryName"
          type="text"
          class="form-control"
          placeholder="Add Category"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button @click.prevent="createCategory()" class="btn btn-dark" type="button">Add</button>
        </div>
      </div>
      <button @click="logout()" class="logout btn btn-secondary">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryHeader from "./CategoryHeader";
import Tasks from "./TasksSection";
export default {
  name: "KanbanPage",
  data() {
    return {
      data: [],
      categoryName: "",
      error: "",
      showEditCategory: false,
      categoriesID: []
    };
  },
  components: {
    CategoryHeader,
    Tasks
  },
  methods: {
    sortTask(arr) {
      let i = 0;
      while (i < arr.length - 1) {
        if (arr[i].id > arr[i + 1].id) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          i = 0;
        } else {
          i++;
        }
      }
    },
    fetchData() {
      axios({
        method: "get",
        url: "http://localhost:3000/categories",
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          response.data.forEach(category => {
            this.sortTask(category.Tasks);
          });
          this.data = response.data;
          this.categoriesID = [];
          response.data.forEach(category => {
            this.categoriesID.push(category.id);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    createCategory() {
      this.error = "";
      axios({
        method: "post",
        url: "http://localhost:3000/categories",
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.categoryName
        }
      })
        .then(response => {
          this.fetchData();
          this.categoryName = "";
        })
        .catch(error => {
          console.log(error.response.data.error);
          this.error = error.response.data.error[0];
        });
    },
    logout() {
      localStorage.clear();
      this.$emit("changePage", "login");
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>
small {
  padding: 5px;
  color: #a74949;
  font-style: italic;
  font-size: 15px;
}
.input-category {
  margin: 15px 0;
}

.fa-pencil-square-o,
.fa-trash {
  color: white;
}

.abs {
  position: absolute;
  top: 5px;
  right: 5px;
}

i:hover {
  color: #77939f;
}

.logout {
  position: fixed;
  top: 20px;
  right: 40px;
  z-index: 999;
}
</style>