<template>
  <div v-if="task" id="modal-edit-task" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="closeModal" class="close">&times;</span>
        <h5 @click="editTitle" v-if="!isEditTitle" class="task-title">
          <a>{{ task.title }}</a>
        </h5>
        <form class="form-edit-title" v-if="isEditTitle" @submit.prevent="editTask">
          <input
            @blur="cancelEditTitle"
            type="text"
            v-model="title"
            required
            autofocus
            class="form-control input-title-task"
          />
        </form>
        <h6 class="in-list">
          in list
          <b>{{ task.Category.name }}</b>
        </h6>
      </div>
      <div class="modal-body">
        <div class="description-task">
          <div class="description-form">
            <div class="left">
              <i class="fa fa-tasks" aria-hidden="true"></i>
            </div>
            <div class="right">
              <div class="description-edit">
                <h5>Description</h5>
                <a @click="toggleForm" v-if="task.description" class="btn btn-light">Edit</a>
              </div>
              <a
                @click="toggleForm"
                v-if="!isShowForm && !task.description"
                class="add-more-description"
              >Add more detailed description</a>
              <p
                class="description-task-value"
                v-if="task.description && !isShowForm"
              >{{ task.description }}</p>
              <div v-if="isShowForm" class="description-task-input">
                <form @submit.prevent="editTask">
                  <textarea rows="2" v-model="description" class="form-control input-description"></textarea>
                  <input type="submit" :value="btnName" class="btn btn-success" />
                  <a @click="toggleForm" class="cancel-add">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="closeModal"
          id="btn-close-modal"
          class="btn btn-secondary"
        >Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const BASE_URL = "http://localhost:3000";
export default {
  name: "TaskModal",
  props: ["taskId"],
  data() {
    return {
      task: null,
      isShowForm: false,
      btnName: "Add",
      isEditTitle: false,
      title: "",
      description: ""
    };
  },
  methods: {
    getTask() {
      axios({
        method: "GET",
        url: BASE_URL + "/tasks/" + this.taskId,
        headers: {
          Authorization: "Bearer " + localStorage.token
        }
      })
        .then(response => {
          this.task = response.data;
          this.title = response.data.title;
          this.description = response.data.description;
          if (this.description) {
            this.btnName = "Edit";
          } else {
            this.btnName = "Add";
          }
          this.isEditTitle = false;
          this.isShowForm = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeModal() {
      this.$emit("closeModal", false);
    },
    toggleForm() {
      this.isShowForm = !this.isShowForm;
    },
    editTitle() {
      this.isEditTitle = true;
    },
    cancelEditTitle() {
      this.isEditTitle = false;
      this.title = this.task.title;
    },
    editTask() {
      axios({
        method: "PUT",
        url: BASE_URL + "/tasks/" + this.taskId,
        headers: {
          Authorization: "Bearer " + localStorage.token
        },
        data: {
          title: this.title,
          description: this.description,
          category_id: this.task.category_id
        }
      })
        .then(response => {
          this.getTask();
          this.$emit("refreshCategories");
        })
        .catch(err => {
          this.isEditTitle = false;
        });
    }
  },
  created() {
    this.getTask();
  }
};
</script>