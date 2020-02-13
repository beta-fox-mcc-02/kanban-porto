<template>
  <div class="category-list-wrapper">
    <div class="category-content">
      <div class="category-heading">{{ category.name }}</div>
      <label>{{ tasks.length }} {{ tasks.length && tasks.length > 1 ? 'Tasks' : 'Task' }}</label>
    </div>
    <draggable group="people" v-model="tasks" @start="drag=true" @end="drag=false">
      <Task v-for="task in tasks" :key="task.id" :task-info="task"></Task>
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
    checkMove(event) {
      console.log(event);
    },
    toggleForm() {
      this.isAddTask = !this.isAddTask;
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
        url: BASE_URL + "/tasks/" + this.category.id,
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
    }
  },
  data() {
    return {
      isAddTask: false,
      newTask: "",
      tasks: []
    };
  },
  created() {
    this.fetchTasks();
  }
};
</script>