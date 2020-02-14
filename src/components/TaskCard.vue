<template>
  <div class="card hoverable" >
    <div class="card-content">
      <span class="card-title" id="title">{{task.title}}</span>
      <div class="row">
        <div class="col s12">
          <p id="description">{{task.description}}</p>
        </div>
      </div>
    </div>
      <!-- next button -->
      <a 
        href="#" 
        class="btn-floating btn-small halfway-fab right"
        v-if="task.CategoryId == 1"
        @click.prevent="nextCategory(task.CategoryId)"
      ><i class="material-icons">navigate_next</i></a>
      <a 
        href="#" 
        class="btn-floating btn-small halfway-fab right"
        v-else-if="task.CategoryId == 2"
        @click.prevent="nextCategory(task.CategoryId)"
      ><i class="material-icons">navigate_next</i></a>
      <a 
        href="#" 
        class="btn-floating btn-small halfway-fab right"
        v-else-if="task.CategoryId == 3"
        @click.prevent="nextCategory(task.CategoryId)"
      ><i class="material-icons">navigate_next</i></a>

      <!-- Previous button -->
      <a 
        href="#" 
        class="btn-floating btn-small halfway-fab left"
        v-if="task.CategoryId == 2"
        @click.prevent="previousCategory(task.CategoryId)"
      ><i class="material-icons">navigate_before</i></a>
      <a 
        href="#" 
        class="btn-floating btn-small halfway-fab left"
        v-else-if="task.CategoryId == 3"
        @click.prevent="previousCategory(task.CategoryId)"
      ><i class="material-icons">navigate_before</i></a>
      <a 
        href="#" 
        class="btn-floating btn-small halfway-fab left"
        v-else-if="task.CategoryId == 4"
        @click.prevent="previousCategory(task.CategoryId)"
      ><i class="material-icons">navigate_before</i></a>

      <!-- update button -->
      <a 
        class="btn btn-small halfway-fab center"
        @click.prevent="showUpdate"
      ><i class="material-icons">edit</i></a>

      <!-- delete button -->
      <a 
        href="#" 
        class="btn btn-small halfway-fab center"
        @click.prevent="deleteTask(task.CategoryId)"
      ><i class="material-icons">delete</i></a>

  </div>
</template>

<script>
import axios from 'axios'
import App from '../App'
export default {
  name: 'TaskCard',
  data() {
    return {
      currentTask: this.task
    }
  },

  props: {
    task: Object
  },

  components: {

  },

  methods: {
    nextCategory(CategoryId) {
      CategoryId += 1
      axios({
        url: `http://localhost:3000/tasks/${this.task.id}/update`,
        method: 'PUT',
        data: {CategoryId},
        headers: {token: localStorage.token}
      })
        .then(({data}) => {
          this.$emit('showContent')
        })
        .catch(err => {
          this.$emit('notification', err)
        })
    },

    previousCategory(CategoryId) {
      CategoryId -= 1
      axios({
        url: `http://localhost:3000/tasks/${this.task.id}/update`,
        method: 'PUT',
        data: {CategoryId},
        headers: {token: localStorage.token}
      })
        .then(({data}) => {
          this.$emit('showContent')
        })
        .catch(err => {
          this.$emit('notification', err)
        })
    },

    deleteTask(CategoryId) {
      axios({
        url: `http://localhost:3000/tasks/${this.task.id}/delete`,
        method: 'DELETE',
        headers: {token: localStorage.token}
      })
        .then(({data}) => {
          this.$emit('showContent')
          this.$emit('notification', null, data.msg)
        })
        .catch(err => {
          this.$emit('notification', err)
        })
    },

    showUpdate() {
      this.$emit('updateModalToggle')
      this.$emit('getTask', this.task)
    }

  },

  
  
}
</script>

<style scoped>
  a {
    margin: 0.5rem
  }
</style>