<template>
  <div class="row" id="TaskForm">
    <div class="col s4 offset-s4">
      <div class="card z-depth-3">
        <div class="card-content">
          <span class="card-title center">Create New Task</span>
          <form id="login-form" @submit.prevent="addTask">
            <div class="row">
              <div class="col s12 input-field">
                <input id="title" type="text" class="validate" v-model="title">
                <label for="title">Task Title</label>
              </div>
            </div>
            <div class="row">
              <div class="col s12 input-field">
                <input id="description" type="text" class="validate" v-model="description" required>
                <label for="description">Task Description</label>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center">
                <button class="btn waves-effect waves-light" type="submit" name="action">Add Task</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "TaskForm",

  data() {
    return {
      title: '',
      description: ''
    }
  },

  methods: {
    addTask() {
      axios({
        method: 'post',
        url:'http://localhost:3000/tasks', 
        data: {
          title: this.title, 
          description : this.description
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          this.title = ''
          this.description = ''
          this.$emit('showContent')
          Toastify({
            text: `${data.msg}`,
            position: 'center',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "success",
          }).showToast();
        })
        .catch(err => {
          this.title = ''
          this.description = ''
          Toastify({
            text: `${err}`,
            position: 'center',
            backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
            className: "error",
          }).showToast();
        })
    }
  }
}
</script>

<style>

</style>