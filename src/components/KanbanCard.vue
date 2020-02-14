<template>
  <div>
    <b-card no-body>
      <div class="bg-danger text-light d-flex justify-content-between align-item-center">
        <div class="ml-1 my-auto">
          {{ task.title }}
        </div>
        <b-dropdown text="" variant="danger">
          <b-dropdown-item @click="toogleEditForm" href="#">Edit</b-dropdown-item>
          <b-dropdown-item href="#">Delete</b-dropdown-item>
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
      axios({
        method: 'put',
        url: `/task/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('Berhasil update', data)
          this.toogleEditForm()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>