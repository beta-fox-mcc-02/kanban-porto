<template>
  <div class="col-sm-3">
    <b-card bg-variant="primary" text-variant="white" :header="category.name" class="text-center">
      <b-card-text>
        <kanban-card v-for="task in filteredTasks" :key="task.id" :task="task" class="mt-1"></kanban-card>
        <b-form-input v-if="addTask" v-model="title" placeholder="Add..." @keyup.enter="addTitle"></b-form-input>
      </b-card-text>
    </b-card>
  </div>

</template>

<script>
import kanbanCard from './KanbanCard'
export default {
  name: 'KanbanCategory',
  data() {
    return {
      addTask: true,
      title: ''
    }
  },
  props: {
    category: Object
  },
  methods: {
    addTitle () {
      console.log(this.title, this.category.id)
      this.title = ''
    }
  },
  components: {
    kanbanCard
  },
  computed: {
    filteredTasks () {
      let filteredTasks = []
      let UserId = localStorage.id
      this.category.Tasks.forEach(task => {
        if (task.UserId == UserId) filteredTasks.push(task)
      })
      return filteredTasks
    },

  }
}
</script>

<style>

</style>