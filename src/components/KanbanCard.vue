<template>
  <div>
    <b-card no-body>
      <div class="bg-danger text-light d-flex justify-content-between align-item-center">
        <div class="ml-1 my-auto">
          {{ task.title }}
        </div>
        <b-dropdown text="" variant="danger">
          <b-dropdown-item @click="toogleEditForm" href="#">Edit</b-dropdown-item>
          <b-dropdown-item @click="deleteTask(task.id)" href="#">Delete</b-dropdown-item>
        </b-dropdown>
      </div>
      <b-form-input v-if="edit" v-model="title" placeholder="Edit..." @keyup.enter="updateTitle(task.id)"></b-form-input>
    </b-card>
</div>
</template>

<script>
import axios from '../helpers/axios'
export default {
  name: 'KanbanCard',
  data() {
    return {
      title: '',
      edit: false
    }
  },
  props: {
    task: Object
  },
  methods: {
    toogleEditForm () {
      if (this.edit) this.edit = false
      else this.edit = true
    },
    updateTitle (id) {
      if (this.title !== '') {
        axios({
          method: 'put',
          url: `/task/${id}`,
          headers: {
            token: localStorage.token
          },
          data: {
            title: this.title
          }
        })
          .then(({ data }) => {
            console.log('Berhasil update', data)
            this.$emit('fetchCategories')
          })
          .catch(err => {
            console.log(err.response)
          })
      }
      this.toogleEditForm()
    },
    deleteTask (id) {
      axios({
        method: 'delete',
        url: `/task/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
            console.log(data)
            this.$emit('fetchCategories')
          })
          .catch(({ response }) => {
            console.log(response)
          })
    }
  }
}
</script>

<style>

</style>