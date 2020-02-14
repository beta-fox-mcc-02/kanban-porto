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
    <!-- <div class="card-action"> -->
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
        href="#updateModal" 
        class="btn btn-small halfway-fab center"
        
      ><i class="material-icons">edit</i></a>

      <!-- delete button -->
      <a 
        href="#" 
        class="btn btn-small halfway-fab center"
        @click.prevent="delteTask(task.CategoryId)"
      ><i class="material-icons">delete</i></a>

    <!-- </div> -->
  <TaskUpdate
    id="updateModal"
    class="modal"
  ></TaskUpdate>
  </div>
</template>

<script>
import axios from 'axios'
import TaskUpdate from './TaskUpdate'
export default {
  name: 'TaskCard',
  data() {
    return {

    }
  },

  props: {
    task: Object
  },

  components: {
    TaskUpdate
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

    delteTask(CategoryId) {
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

    findOneTask(taskId) {

    },

    showUpdate() {
      this.$modal.show('TaskUpdate')
    }
  },

  
  
}
</script>

<style>
  a {
    margin: 0.5rem
  }
</style>