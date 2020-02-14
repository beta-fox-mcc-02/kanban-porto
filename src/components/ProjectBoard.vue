<template>
  <div class="board">
    <div class="card shadow ">
      <div class="card-header text-center" >
        <h5>{{ board.category }}</h5>
      </div>
      <div class="card-body p-0" style="max-height: 70vh; overflow: auto;">
        <TaskCard
          v-for="task in myTasks" 
          :key="task.id"
          :task="task"
          :board="board"
          @fetchBoard="fetchBoard"
          class="my-1 mx-1">
        </TaskCard>
      </div>
      <div class="card-footer">
        <p v-b-toggle="`${collapse}`" class="m-1" style="cursor: pointer;"> + Add Task</p>
          <b-collapse :id="collapse">
            <b-form @submit.prevent="createTask">
              <b-form-input
                v-model="title"
                type="text"
                placeholder="Task Title"
                required>
              </b-form-input>
              <b-form-input
                v-model="description"
                type="text"
                placeholder="Task Description"
                required>
              </b-form-input>
              <b-button type="submit" variant="primary" v-b-toggle="`${collapse}`">Submit</b-button>
            </b-form>
          </b-collapse>
      </div>
    </div> 
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import Axios from '../config'
export default {
  name: 'ProjectBoard',
  data () {
    return {
      collapse: this.board.category,
      category: this.board.category,
      title: '',
      description: ''
    }
  },
  props: {
    board: Object,
    tasks: Array
  },
  components: {
    TaskCard
  },
  computed: {
    myTasks () {
      let arr = []
      this.tasks.forEach(task => {
        if(task.category === this.board.category) arr.push(task)
      })
      return arr
    }
  },
  methods: {
    createTask () {
      Axios({
        method: 'POST',
        url: '/tasks',
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.title,
          description: this.description,
          category: this.board.category,
          ProjectId: localStorage.projectId
        }
      })
      .then(_ => {
        this.title = '',
        this.description = ''
        this.$emit('fetchBoard')
      })
      .catch(_ => {})
    },
    fetchBoard () {
      this.$emit('fetchBoard')
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .card-body {
    background-color: #f6f6f6;
  }
</style>