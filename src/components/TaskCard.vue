<template>
  <div class="card">
    <div class="card-text">
      <p>Task: {{task.title}}</p>
      <p>Desc: {{task.description}}</p>
    </div>
    <div class="text-center button-group">
    <button
      class="btn float-left"
      :class="prevBoard.color"
      @click="backward(task.id)"
      v-if="board.category !== 'BackLog'">
      <i class="fa fa-backward"></i>
    </button>
    
    <button 
      v-b-popover.hover.top="'Delete this task ?'"
      class="btn-outline-danger btn-sm"
      @click="deleteTask(task.id)">
      <i class="fa fa-times-circle"></i>
    </button>

    <button
      class="btn float-right"
      :class="nextBoard.color"
      @click="forward(task.id)"
      v-if="board.category !== 'Done'">
      <i class="fa fa-forward"></i>
    </button>
    </div>
  </div>
</template>

<script>
import Axios from '../config'
export default {
  name: 'TaskCard',
  data () {
    return {
      prevBoard: {
        category: '',
        color: ''
      },
      nextBoard: {
        category: '',
        color: ''
      }
    }
  },
  props: {
    task: Object,
    board: Object
  },
  methods: {
    backward (id) {
      let category = ''
      if(this.board.category === 'Todo'){
        category = 'BackLog'
      } else if(this.board.category === 'Doing') {
        category = 'Todo'
      } else {
        category = 'Doing'
      }
      Axios({
        method: 'PATCH',
        url: '/tasks/' + id,
        data: {
          category
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(_ => {
        this.$emit('fetchBoard')
      })
      .catch(_ => {})
    },
    forward (id) {
      let category = ''
      if(this.board.category === 'BackLog'){
        category = 'Todo'
      } else if(this.board.category === 'Todo') {
        category = 'Doing'
      } else {
        category = 'Done'
      }
      Axios({
        method: 'PATCH',
        url: `/tasks/${id}`,
        data: {
          category
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(_ => {
        this.$emit('fetchBoard')
      })
      .catch(_ => {})
    },
    deleteTask (id) {
      Axios({
        method: 'DELETE',
        url: `/tasks/${id}`,
        headers: {
          token: localStorage.token
        }
      })
      .then(_ => {
        this.$emit('fetchBoard')
      })
      .catch(_ => {})
    }
  },
  created () {
    if (this.board.category === 'BackLog') {
      this.nextBoard.category = 'Todo'
      this.nextBoard.color = 'btn-outline-warning btn-sm'
    } else if (this.board.category === 'Todo') {
      this.prevBoard.category = 'Back-Log'
      this.prevBoard.color = 'btn-outline-danger btn-sm'
      this.nextBoard.category = 'Doing'
      this.nextBoard.color = 'btn-outline-primary btn-sm'
    } else if (this.board.category === 'Doing') {
      this.prevBoard.category = 'Todo'
      this.prevBoard.color = 'btn-outline-warning btn-sm'
      this.nextBoard.category = 'Done'
      this.nextBoard.color = 'btn-outline-success btn-sm'
    } else {
      this.prevBoard.category = 'Doing'
      this.prevBoard.color = 'btn-outline-primary btn-sm'
    }
  }
}
</script>

<style scoped>
.card-text {
  padding: 5px;
}
.text-center {
  padding: 5px
}
p {
  margin-bottom: 0;
}


/* Darker background on mouse-over */
</style>