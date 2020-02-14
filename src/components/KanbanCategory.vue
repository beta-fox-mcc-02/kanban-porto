<template>
  <div class="col-sm-3 mantap">
    <b-card bg-variant="primary" text-variant="white" :header="category.name" class="text-center">
      <b-card-text>
        <draggable>
          <transition-group>
            <kanban-card @fetchCategories="fetchCategories" v-for="task in filteredTasks" :key="task.id" :task="task" class="mt-1"></kanban-card>
          </transition-group>
        </draggable>
        
        <b-form-input v-if="addTask" v-model="title" placeholder="Add..." @keyup.enter="addTitle"></b-form-input>
      </b-card-text>
    </b-card>
  </div>

</template>

<script>
import kanbanCard from './KanbanCard'
import draggable from 'vuedraggable'
import axios from '../helpers/axios'
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
      if (this.title !== '') {
        axios({
          method: 'POST',
          url: '/task',
          headers: {
            token: localStorage.token
          },
          data: {
            title: this.title,
            CategoryId: this.category.id
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.$bvToast.toast(data.msg, {
              title: `Success`,
              variant: 'success',
              solid: true
            })
            this.$emit('fetchCategories')
          })
          .catch(({ response }) => {
            console.log(response)
            this.$bvToast.toast(err.response.data.msg, {
              title: `Error`,
              variant: 'danger',
              solid: true
            })
          })
      }
      this.title = ''

    },
    fetchCategories () {
      this.$emit('fetchCategories')
    }
  },
  components: {
    kanbanCard,
    draggable
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