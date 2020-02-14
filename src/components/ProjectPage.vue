<template>
  <div class="container-fluid">
    <h4 class="text-center"> Project : {{ projectName }}</h4>
    <div class="row mt-0">
      <ProjectBoard 
        v-for="(board, i) in boards"
        :key="i"
        :board="board"
        :tasks="tasks"
        class="col-md-3 my-3"
        style="min-width: 14rem"
        @fetchBoard="fetchBoard">
      </ProjectBoard>
    </div>
  </div>
</template>

<script>
import ProjectBoard from './ProjectBoard'
import Axios from 'axios'
export default {
  name: 'ProjectPage',
  data () {
    return {
      tasks: [],
      boards: [
        {
          category: 'BackLog',
          color: 'bg-danger'
        },
        {
          category: 'Todo',
          color: 'bg-warning'
        },
        {
          category: 'Doing',
          color: 'bg-primary'
        },
        {
          category: 'Done',
          color: 'bg-success'
        }
      ],
      projectName: localStorage.projectName
    }
  },
  props: {
    projectId: Number
  },
  components: {
    ProjectBoard
  },
  methods: {
    fetchBoard () {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks/'+this.projectId,
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        this.tasks = data
        console.log(this.tasks)
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.fetchBoard()
  }
}
</script>

<style scoped>
.container {
  min-height: 90vh;
  max-height: 95vh;
  min-width: 95%;
}
.container > .row {
  overflow-x: auto;
  white-space: nowrap;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>