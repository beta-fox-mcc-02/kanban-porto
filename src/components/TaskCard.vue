<template>
  <div class="category-items">
    <div class="task-card">
      <div class="card-content">
        <div class="task-title">{{ task.title }}</div>
        <div class="content">{{ task.description }}</div>
      </div>
      <footer class="card-footer">
        <a href="#" v-if="task.CategoryId > 1" @click.prevent="previousTask(task.id)"> <i class="fas fa-arrow-left"></i></a>
        <a href="#" @click.prevent='editTask' ><i class="fas fa-edit"></i></a>
        <a href="#" @click.prevent='deleteTask(task.id)'> <i class="fas fa-trash-alt"></i></a>
        <a href="#" v-if="task.CategoryId < 4" @click.prevent="nextTask(task.id)"> <i class="fas fa-arrow-right"></i></a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: Object
  },
  methods: {
        editTask() {
          this.$emit('editTask', this.task)
          this.$emit('currentPage', 'editTask')
        },
        deleteTask(id) {
          const token = localStorage.token
          axios({
                method: 'DELETE',
                url: 'http://localhost:3000/tasks/' + id,
                headers: { token }
            })
            .then(response => {
                this.$emit('getTasks', this.task.CategoryId)
            })
            .catch(err => {
                console.log(err)
            })
        },
        nextTask(id) {
            const token = localStorage.token
            axios({
                method: 'PATCH',
                url: 'http://localhost:3000/tasks/next/' + id,
                headers: { token }
            })
            .then(response => {
                this.$emit('updateStatus')
            })
            .catch(err => {
                console.log(err)
            })
        },
        previousTask(id) {
            const token = localStorage.token
            axios({
                method: 'PATCH',
                url: 'http://localhost:3000/tasks/previous/' + id,
                headers: { token }
            })
            .then(response => {
                this.$emit('updateStatus')
            })
            .catch(err => {
                console.log(err)
            })
        }
  }
};
</script>

<style>
</style>