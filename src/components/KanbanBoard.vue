<template>
  <div>
    <div class="main-kanban-container">
      <div class="loader" v-if="loading"></div> 
      <div class="container-kanban" v-if="page === 'kanban'">
        <!-- backlog container -->
        <div class="board">
          <div class="board-content"> 
            <b>Backlog</b>
            <div class="board-col">
              <div class="board-list" v-for="data in board.backlog" :key="data.id">
                <div class="board-desc">{{ data.title }}</div>
                <div class="board-action">
                  <a href="#" v-on:click="editForm(data.id)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" v-on:click="deleteTask(data.id)">
                    <i class="fa fa-trash"></i>
                  </a>
                  <a href="#" v-on:click="moveTask(data.id, data.title, 2)">
                    <i class="fa fa-chevron-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="add-board">
              <a href="#">
                <i class="fa fa-plus-circle" v-on:click="kanbanForm">Add new</i>
              </a>
              <span>
                Set to product <i class="fa fa-chevron-circle-right"></i>
              </span>
            </div>
          </div>
        </div>
        <!-- product Container -->
        <div class="board">
          <div class="board-content">
            <b>Product</b>
            <div class="board-col">
              <div class="board-list" v-for="data in board.product" :key="data.id">
                <div class="board-desc">{{ data.title }}</div>
                <div class="board-action">
                  <a href="#" v-on:click="moveTask(data.id, data.title, 1)">
                    <i class="fa fa-chevron-circle-left"></i>
                  </a>
                  <a href="#" v-on:click="editForm(data.id)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" v-on:click="deleteTask(data.id)">
                    <i class="fa fa-trash"></i>
                  </a>
                  <a href="#" v-on:click="moveTask(data.id, data.title, 3)">
                    <i class="fa fa-chevron-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="add-board">
              <i class="fa fa-chevron-circle-left">Set to backlog</i>
              Set to product
              <i class="fa fa-chevron-circle-right"></i>
            </div>
          </div>
        </div>
        <!-- development Container -->
        <div class="board">
          <div class="board-content">
            <b>Development</b>
            <div class="board-col">
              <div
                class="board-list"
                v-for="data in board.development"
                :key="data.id"
              >
                <div class="board-desc">{{ data.title }}</div>
                <div class="board-action">
                  <a href="#" v-on:click="moveTask(data.id, data.title, 2)">
                    <i class="fa fa-chevron-circle-left"></i>
                  </a>
                  <a href="#" v-on:click="editForm(data.id)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" v-on:click="deleteTask(data.id)">
                    <i class="fa fa-trash"></i>
                  </a>
                  <a href="#" v-on:click="moveTask(data.id, data.title, 4)">
                    <i class="fa fa-chevron-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="add-board">
              <i class="fa fa-chevron-circle-left" v-on:click="kanbanForm"
                >Set to product</i
              >
              Set to done
              <i class="fa fa-chevron-circle-right"></i>
            </div>
          </div>
        </div>
        <!-- Done Container -->
        <div class="board">
          <div class="board-content">
            <b>Done</b>
            <div class="board-col">
              <div class="board-list" v-for="data in board.done" :key="data.id">
                <div class="board-desc">{{ data.title }}</div>
                <div class="board-action">
                  <a href="#" v-on:click="moveTask(data.id, data.title, 3)">
                    <i class="fa fa-chevron-circle-left"></i>
                  </a>
                  <a href="#" v-on:click="editForm(data.id)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" v-on:click="deleteTask(data.id)">
                    <i class="fa fa-trash"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="add-board">
              <i class="fa fa-chevron-circle-left" v-on:click="kanbanForm"
                >Set to development</i
              >
            </div>
          </div>
        </div>
      </div>

      <div class="container-edit" v-if="page === 'edit'">
        <div class="edit-content">
          <center>
            <b>Edit</b>
            <hr width="20%" color="steelblue" />
            <form v-on:submit.prevent="editTask" method="post">
              <input
                type="text"
                name="title-edit"
                id="title-edit"
                placeholder="your title update...."
                class="input-text"
                v-model="title"
              />
              <br />
              <input
                type="submit"
                value="Edit Data"
                class="button-primary"
              />
            </form>
            <button class="button-success" v-on:click="kanban">
              Back to kanban
            </button>
          </center>
        </div>
      </div>

      <KanbanForm
        v-if="page === 'kanbanForm'"
        @afterAddTask="afterAddTask"
        @kanbanFromAdd="kanbanFromAdd"
      ></KanbanForm>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import KanbanForm from "./KanbanForm.vue";

const baseURL = 'https://frozen-sands-95268.herokuapp.com'
// const baseURL = 'http://localhost:3000'

export default {
  name: "KanbanBoard",
  data() {
    return {
      id: "",
      title: "",
      CategoryId: "",
    };
  },
  props: {
    page: String,
    board: Object,
    loading: Boolean,
    error: String
  },
  components: { KanbanForm },
  methods: {
    fetchAll() {
      this.$emit("fetchAll");
    },
    deleteTask(id) {
      const access_token = localStorage.getItem("access_token");
      this.loading = true
      axios({
        method: "delete",
        url: `${baseURL}/delete/${id}`,
        // url: `http://localhost:3000/delete/${id}`,
        headers: {
          access_token
        }
      })
        .then(data => {
          this.backlog = [];
          this.product = [];
          this.development = [];
          this.done = [];
          console.log(data);
          this.fetchAll();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false
        })
    },
    moveTask(id, title, CategoryId) {
      console.log("masuk moveTask");
      const access_token = localStorage.getItem("access_token");
      this.loading = true
      axios({
        method: "put",
        url: `${baseURL}/update/${id}`,
        // url: `http://localhost:3000/update/${id}`,
        data: {
          title: title,
          CategoryId: CategoryId
        },
        headers: {
          access_token
        }
      })
        .then(response => {
          this.backlog = [];
          this.product = [];
          this.development = [];
          this.done = [];
          console.log(response);
          console.log("Backlog edited");
          this.fetchAll();
        })
        .catch(err => {
          console.log(err, "error movetask");
        })
        .finally(() => {
          this.loading = false
        })
    },
    findOne(editId) {
      console.log(editId, "masuk ke findOne");
      const access_token = localStorage.getItem("access_token");
      this.loading = true
      axios({
        method: "get",
        url: `${baseURL}/update/${editId}`,
        // url: `http://localhost:3000/update/${editId}`,
        headers: {
          access_token
        }
      })
        .then(response => {
          console.log("sukses findOne");
          //   console.log(response.data.data.title);
          this.id = response.data.data.id;
          this.title = response.data.data.title;
          this.CategoryId = response.data.data.CategoryId;
          //   this.title = "kanban";
        })
        .catch(err => {
          console.log("error findOne");
          console.log(err);
        })
        .finally(() => {
          this.loading = false
        })
    },
    editTask(id) {
      //   console.log(this.id, "dari editTask");
      const access_token = localStorage.getItem("access_token");
      this.loading = true
      axios({
        method: "put",
        url: `${baseURL}/update/${this.id}`,
        // url: `http://localhost:3000/update/${this.id}`,
        data: {
          title: this.title,
          CategoryId: this.CategoryId
        },
        headers: {
          access_token
        }
      })
        .then(response => {
          //   console.log(response);
          //   console.log("Backlog edited");
          this.backlog = [];
          this.product = [];
          this.development = [];
          this.done = [];
          this.kanban();
          this.fetchAll();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false
        })
    },
    kanbanForm() {
      this.$emit("changePage", "kanbanForm");
    },
    editForm(id) {
      //   console.log(id);
      this.findOne(id);
      this.$emit("changePage", "edit");
    },
    kanban() {
      this.$emit("changePage", "kanban");
    },
    kanbanFromAdd() {
      return this.$emit("changePage", "kanban");
    },
    afterAddTask() {
      this.backlog = [];
      this.product = [];
      this.development = [];
      this.done = [];
      this.$emit("changePage", "kanban");
      return this.fetchAll();
    }
  },
  created() {
    if (localStorage) {
      this.fetchAll();
    } else {
      this.$emit("changePage", "kanban");
    }
  }
};
</script>

<style></style>
