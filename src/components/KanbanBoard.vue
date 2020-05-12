<template>
  <div>
    <div class="container-kanban" v-if="page === 'kanban'">
      <!-- backlog container -->
      <div class="backlog">
        <div class="backlog-content">
          <b>Backlog</b>
          <div class="backlog-col">
            <div class="backlog-list" v-for="data in backlog" :key="data.id">
              <div class="backlog-desc">{{ data.title }}</div>
              <div class="backlog-action">
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
          <div class="add-backlog">
            <a href="#">
              <i class="fa fa-plus-circle" v-on:click="kanbanForm">Add new</i>
            </a>
            Set to product
            <i class="fa fa-chevron-circle-right"></i>
          </div>
        </div>
      </div>
      <!-- product Container -->
      <div class="product">
        <div class="product-content">
          <b>Product</b>
          <div class="product-col">
            <div class="product-list" v-for="data in product" :key="data.id">
              <div class="product-desc">{{ data.title }}</div>
              <div class="product-action">
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
          <div class="add-product">
            <i class="fa fa-chevron-circle-left">Set to backlog</i>
            Set to product
            <i class="fa fa-chevron-circle-right"></i>
          </div>
        </div>
      </div>
      <!-- development Container -->
      <div class="development">
        <div class="development-content">
          <b>Development</b>
          <div class="development-col">
            <div
              class="development-list"
              v-for="data in development"
              :key="data.id"
            >
              <div class="development-desc">{{ data.title }}</div>
              <div class="development-action">
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
          <div class="add-development">
            <i class="fa fa-chevron-circle-left" v-on:click="kanbanForm"
              >Set to product</i
            >
            Set to done
            <i class="fa fa-chevron-circle-right"></i>
          </div>
        </div>
      </div>
      <!-- Done Container -->
      <div class="done">
        <div class="done-content">
          <b>Done</b>
          <div class="done-col">
            <div class="done-list" v-for="data in done" :key="data.id">
              <div class="done-desc">{{ data.title }}</div>
              <div class="done-action">
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
          <div class="add-done">
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
              value="Add new backlog"
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
</template>

<script>
import axios from "axios";
import KanbanForm from "./KanbanForm.vue";

export default {
  name: "KanbanBoard",
  data() {
    return {
      id: "",
      title: "",
      CategoryId: "",
      backlog: [],
      product: [],
      development: [],
      done: [],
    };
  },
  props: {
    page: String
  },
  components: { KanbanForm },
  methods: {
    fetchAll() {
      console.log("masuk ke fetch");
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "get",
        url: "https://frozen-sands-95268.herokuapp.com/task",
        // url: "http://localhost:3000/task",
        headers: {
          access_token: access_token
        }
      })
        .then(response => {
          response.data.data.forEach(data => {
            if (data.CategoryId === 1) {
              //   console.log(data);
              this.backlog.push(data);
            } else if (data.CategoryId === 2) {
              this.product.push(data);
            } else if (data.CategoryId === 3) {
              this.development.push(data);
            } else if (data.CategoryId === 4) {
              this.done.push(data);
            }
          });
          //   this.backlog = response.data.data;
          //   console.log(response.data.data[0].CategoryId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(id) {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "delete",
        url: `https://frozen-sands-95268.herokuapp.com/delete/${id}`,
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
        });
    },
    moveTask(id, title, CategoryId) {
      console.log("masuk moveTask");
      const access_token = localStorage.getItem("access_token");
      //   console.log(access_token);
      axios({
        method: "put",
        url: `https://frozen-sands-95268.herokuapp.com/update/${id}`,
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
        });
    },
    findOne(editId) {
      console.log(editId, "masuk ke findOne");
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "get",
        url: `https://frozen-sands-95268.herokuapp.com/update/${editId}`,
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
        });
    },
    editTask(id) {
      //   console.log(this.id, "dari editTask");
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "put",
        url: `https://frozen-sands-95268.herokuapp.com/update/${this.id}`,
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
        });
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
