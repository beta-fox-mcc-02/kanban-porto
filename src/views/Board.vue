<template>
  <Fragment>
    <Profile :user="user" :is-login="isLogin"></Profile>
    <main role="main">
      <div class="board-container">
        <div class="board-wrapper">
          <draggable
            class="category-wrapper"
            v-model="categories"
            @start="drag=true"
            @end="drag=false"
          >
            <TaskCategory v-for="cat in categories" :key="cat.id" :category="cat"></TaskCategory>
          </draggable>
          <div class="board-add-category">
            <form @submit.prevent="addCategory" class="form-board-add-category">
              <a @click="showHideFormAddCategory" v-if="!isAddCategory" class="open-add">
                <div class="input-group flex-nowrap">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </span>
                  </div>
                  <span>Add Category</span>
                </div>
              </a>
              <div v-if="isAddCategory" class="input-category-container">
                <input
                  type="text"
                  class="form-control input-category"
                  name="category"
                  v-model="category"
                  placeholder="Enter your category"
                />
                <input type="submit" value="Add" class="btn btn-success" />
                <a @click="showHideFormAddCategory" class="cancel-add">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </Fragment>
</template>

<script>
import Profile from "../components/Profile";
import TaskCategory from "../components/TaskCategory";
import isAuthenticated from "../helpers/isAuthenticated";
import draggable from "vuedraggable";
import { Fragment } from "vue-fragment";
import axios from "axios";
const BASE_URL = "http://localhost:3000";
export default {
  name: "Board",
  components: {
    Profile,
    Fragment,
    TaskCategory,
    draggable
  },
  data() {
    return {
      user: null,
      isLogin: false,
      isAddCategory: false,
      category: "",
      categories: []
    };
  },
  methods: {
    showHideFormAddCategory() {
      this.isAddCategory = !this.isAddCategory;
    },
    addCategory() {
      axios({
        method: "POST",
        url: BASE_URL + "/categories",
        headers: {
          Authorization: "Bearer " + localStorage.token
        },
        data: {
          name: this.category
        }
      })
        .then(response => {
          this.isAddCategory = !this.isAddCategory;
          this.category = "";
          this.getCategories();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      axios({
        method: "GET",
        url: BASE_URL + "/categories",
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then(response => {
          this.categories = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (localStorage.token) {
        isAuthenticated()
          .then(response => {
            const user = response.data;
            vm.isLogin = true;
            vm.user = user;
            next();
          })
          .catch(err => {
            next("/login");
          });
      } else {
        next("/login");
      }
    });
  },
  created() {
    this.getCategories();
  }
};
</script>