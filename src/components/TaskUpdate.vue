<template>
<modal name="TaskUpdate" class="modal-content">

  <div class="row" id="TaskForm">
    <div class="col s4 offset-s4">
      <div class="card z-depth-3">
        <div class="card-content">
          <span class="card-title center">Update Task</span>
          <form id="login-form" @submit.prevent="updateTask(task.id)">
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
                <button class="btn waves-effect waves-light" type="submit" name="action">Update Task</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</modal>
</template>

<script>
export default {
  name: "TaskUpdate",
  data() {
    return {
      title: "judul",
      description: "deksripsi"
    }
  },

  methods: {
    findOneTask(taskId) {

    },

    updateTask(taskId) {

    }
  }
}
</script>

<style>

</style>