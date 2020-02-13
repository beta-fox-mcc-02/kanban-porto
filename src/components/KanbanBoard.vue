<template>
  <div class="container-kanban">
    <!-- backlog container -->
    <div class="backlog">
      <div class="backlog-content">
        <b>Backlog</b>
        <div class="backlog-col">
          <div class="backlog-list" v-for="data in backlog" :key="data.id">
            <div class="backlog-desc">
              {{ data.title }}
            </div>
            <div class="backlog-action">
              <a href="#" v-on:click="editForm(data.id)"
                ><i class="fa fa-edit"></i
              ></a>
              <a href="#" v-on:click="deleteTask(data.id)"
                ><i class="fa fa-trash"></i
              ></a>
            </div>
          </div>
          <div class="add-backlog">
            <a href="#"
              ><i class="fa fa-plus-circle" v-on:click="taskForm">Add new</i></a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- product Container -->
    <div class="product">
      <div class="product-content">
        <b>Product</b>
        <div class="product-col">
          <div class="product-list" v-for="data in product" :key="data.id">
            <div class="product-desc">
              {{ data.title }}
            </div>
            <div class="product-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
          <div class="product-list">
            <div class="product-desc">
              List here....
            </div>
            <div class="product-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
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
            <div class="development-desc">
              {{ data.title }}
            </div>
            <div class="development-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
          <div class="development-list">
            <div class="development-desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              culpa ab repellendus sint odio, placeat quidem esse enim vero
              excepturi error omnis deleniti facilis maiores recusandae tempora
              unde quia quo?
            </div>
            <div class="development-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
          <div class="development-list">
            <div class="development-desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              culpa ab repellendus sint odio, placeat quidem esse enim vero
              excepturi error omnis deleniti facilis maiores recusandae tempora
              unde quia quo?
            </div>
            <div class="development-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
          <div class="development-list">
            <div class="development-desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              culpa ab repellendus sint odio, placeat quidem esse enim vero
              excepturi error omnis deleniti facilis maiores recusandae tempora
              unde quia quo?
            </div>
            <div class="development-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Done Container -->
    <div class="done">
      <div class="done-content">
        <b>Done</b>
        <div class="done-col">
          <div class="done-list" v-for="data in done" :key="data.id">
            <div class="done-desc">
              {{ data.title }}
            </div>
            <div class="done-action">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KanbanBoard",
  data() {
    return {
      task: {
        title: ""
      },
      edit: {
        title: ""
      },
      backlog: "",
      product: "",
      development: "",
      done: ""
    };
  },
  methods: {
    fetchAll() {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "get",
        url: "http://localhost:3000/task",
        headers: {
          access_token: access_token
        }
      })
        .then(response => {
          console.log(response.data.data[0].title);
          this.backlog = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(id) {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "delete",
        url: `http://localhost:3000/delete/${id}`,
        headers: {
          access_token
        }
      })
        .then(data => {
          this.kanban();
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
