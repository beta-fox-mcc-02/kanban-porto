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
        url:'https://immense-refuge-43743.herokuapp.com/tasks', 
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
          this.$emit('notification', null, data.msg)
        })
        .catch(err => {
          this.title = ''
          this.description = ''
          this.$emit('notification', err)
        })
    }
  }
}
</script>

<style>

</style>