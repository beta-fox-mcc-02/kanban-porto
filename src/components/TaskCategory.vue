<template>
  <div :id="category.id" class="category-list-wrapper">
    <div :id="category.id" class="category-content">
      <div class="category-heading">
        <div class="category-heading-wrapper">
          <form @submit.prevent="editCategory" v-if="isEditCategory">
            <input
              @blur="cancelEditCategory"
              class="inline-edit-input"
              type="text"
              autofocus
              v-model="categoryName"
            />
          </form>
          <a @click="toggleFormEditCategory" v-if="!isEditCategory">{{ category.name }}</a>
          <i @click="deleteCategory" class="fa fa-minus-square-o" aria-hidden="true"></i>
        </div>
      </div>
      <label>{{ tasks.length }} {{ tasks.length && tasks.length > 1 ? 'Tasks' : 'Task' }}</label>
    </div>
    <draggable
      :move="checkMove"
      group="people"
      v-model="tasks"
      @start="drag=true"
      @end="drag=false"
    >
      <Task
        @openModalDelete="openModalDelete"
        @updateTask="updateTask"
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      ></Task>
    </draggable>
    <div class="add-task-container">
      <form>
        <a v-if="!isAddTask" @click="toggleForm" class="add-task">
          <div class="input-group flex-nowrap">
            <div class="input-group-prepend">
              <span class="input-group-text" id="addon-wrapping">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </span>
            </div>
            <span>Add Task</span>
          </div>
        </a>
        <div v-if="isAddTask" class="form-add-task">
          <form @submit.prevent="saveNewTask">
            <input type="text" v-model="newTask" required class="form-control new-task" />
            <input type="submit" class="btn btn-success" value="Add" />
            <a @click="toggleForm" class="cancel-add">
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>
          </form>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const BASE_URL = "http://localhost:3000";
import draggable from "vuedraggable";
import axios from "axios";
import Task from "./Task";
export default {
  name: "TaskCategory",
  components: {
    draggable,
    Task
  },
  props: ["category"],
  methods: {
    toggleForm() {
      this.isAddTask = !this.isAddTask;
    },
    toggleFormEditCategory() {
      this.isEditCategory = !this.isEditCategory;
    },
    cancelEditCategory() {
      this.isEditCategory = !this.editCategory;
      this.categoryName = this.category.name;
    },
    addNewTask() {
      axios({
        method: "POST",
        url: BASE_URL + "/tasks",
        headers: {
          Authorization: "Bearer " + localStorage.token
        },
        data: {
          title: this.newTask,
          category_id: this.category.id
        }
      })
        .then(response => {
          this.isAddTask = !this.isAddTask;
          this.newTask = "";
          this.fetchTasks();
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchTasks() {
      axios({
        method: "GET",
        url: BASE_URL + "/tasks/category/" + this.category.id,
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then(response => {
          this.tasks = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveNewTask() {
      this.addNewTask();
    },
    updateTask(payload) {
      this.$emit("updateTask", payload);
    },
    openModalDelete(payload) {
      this.$emit("openModalDelete", payload);
    },
    checkMove(evt) {
      const categoryId = evt.to.previousElementSibling.id;
      const task = evt.draggedContext.element;
      axios({
        method: "PUT",
        url: BASE_URL + "/tasks/" + task.id,
        headers: {
          Authorization: "Bearer " + localStorage.token
        },
        data: {
          title: task.title,
          description: task.description,
          category_id: +categoryId
        }
      })
        .then(response => {})
        .catch(err => {
          console.log(err);
        });
    },
    editCategory() {
      this.isEditCategory = !this.isEditCategory;
      this.$emit("editCategory", {
        id: this.category.id,
        name: this.categoryName
      });
    },
    deleteCategory() {
      console.log("here");
    },
    openDeleteCategory() {
      this.isDeleteCategory = !this.isDeleteCategory;
    },
    cancelDeleteCategory() {
      this.isDeleteCategory = !this.isDeleteCategory;
    }
  },
  data() {
    return {
      isAddTask: false,
      newTask: "",
      tasks: [],
      categoryName: "",
      isEditCategory: false,
      isDeleteCategory: false
    };
  },
  created() {
    this.tasks = this.category.Tasks;
    this.categoryName = this.category.name;
  },
  watch: {
    category(val) {
      this.tasks = val.Tasks;
      this.categoryName = val.name;
    }
  }
};
</script>