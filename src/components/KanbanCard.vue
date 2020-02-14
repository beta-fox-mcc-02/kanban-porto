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
          <b-dropdown-item class="aqua" v-if="task.CategoryId == 1 || task.CategoryId == 3" @click="changeCategory(2)" href="#">todo</b-dropdown-item>
          <b-dropdown-item class="aqua" v-if="task.CategoryId == 2 || task.CategoryId == 4" @click="changeCategory(3)" href="#">done</b-dropdown-item>
          <b-dropdown-item class="aqua" v-if="task.CategoryId == 2" @click="changeCategory(1)" href="#">backlog</b-dropdown-item>
          <b-dropdown-item class="aqua" v-if="task.CategoryId == 3" @click="changeCategory(4)" href="#">completed</b-dropdown-item>
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
            this.$bvToast.toast(data.msg, {
              title: `Success`,
              variant: 'success',
              solid: true
            })
            this.$emit('fetchCategories')
          })
          .catch(err => {
            console.log(err.response)
            this.$bvToast.toast(err.response.data.msg, {
              title: `Error`,
              variant: 'danger',
              solid: true
            })
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
            this.$bvToast.toast(data.msg, {
              title: `Success`,
              variant: 'success',
              solid: true
            })
            this.$emit('fetchCategories')
          })
          .catch(({ response }) => {
            console.log(response)
            this.$bvToast.toast(response.data.msg, {
              title: `Error`,
              variant: 'danger',
              solid: true
            })
          })
    },
    changeCategory (CategoryId) {
      axios({
        method: 'patch',
        url: `/task/${this.task.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          CategoryId
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
  .aqua {
    background-color: aquamarine;
  }
</style>