<template>
  <div v-if="task" id="modal-edit-task" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="closeModal" class="close">&times;</span>
        <h5 class="task-title">{{ task.title }}</h5>
        <h6 class="in-list">
          in list
          <b>{{ task.Category.name }}</b>
        </h6>
      </div>
      <div class="modal-body">
        <div class="description-task">
          <div class="description-label">
            <i class="fa fa-tasks" aria-hidden="true"></i>
            <h5>Description<h5>
          </div>
          <div class="description-input">
            <a>Add more detailed description</a>
          </div>
          <div class="description-task-input">
            <form>
              <textarea rows="2" class="form-control"></textarea>
              <input type="submit" value="Add" class="btn btn-success">
            </form>
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
      task: null
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
          console.log(response.data);
          this.task = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeModal() {
      this.$emit("closeModal", false);
    }
  },
  created() {
    this.getTask();
  }
};
</script>