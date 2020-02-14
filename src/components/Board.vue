<template>
  <div>
    <div class="col-12 p-0 d-flex cards-container">
        <div class="pl-2 my-2 cards-group" v-for="category in categories" :key="category.id">
          <p class="m-0 p-1 categori">{{ category.name }}</p>
          <div>
            <CatBacklog 
              :backlogs="backlogs"
              v-if="backlog === category.name"
              @editCardForm="editCardForm"
              @deleteCard="deleteCard"
            ></CatBacklog>
            <CatTodo 
              :todos="todos"
              v-else-if="todo === category.name"
              @editCardForm="editCardForm"
              @deleteCard="deleteCard"
            ></CatTodo>
            <CatDone 
              :dones="dones"
              v-else-if="done === category.name"
              @editCardForm="editCardForm"
              @deleteCard="deleteCard"
            ></CatDone>
            <CatComplete
              :completes="completes"
              v-else-if="complete === category.name"
              @editCardForm="editCardForm"
              @deleteCard="deleteCard"
            ></CatComplete>
          </div>
          <div class="mt-2 add-card">
              <p class="icon-add-card" @click="addCardForm(category.id)">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Add a card
            </p>
          </div>
        </div>

      <AddCard 
        v-if="addCardFormUp"
        @closeAddForm="addCardForm"
        @changePage="changePage"
        @fetchCategoriesAfterAdd="fetchCategories"
        :categoryId="categoryId"
      ></AddCard>

      <EditCard
        v-if="editCardFormUp"
        :dataEdit="dataEdit"
        @closeEditForm="editCardForm"
      ></EditCard>
  </div>
</template>

<script>
import AddCard from './AddCard'
import CatBacklog from './CatBacklog'
import CatTodo from './CatTodo'
import CatDone from './CatDone'
import CatComplete from './CatComplete'
import EditCard from './EditCard'

export default {
    name: 'Board',
    props: {
        isLogedIn: Boolean
    },
    data() {
        return {
          backlog: 'Backlog',
          todo: 'Todo',
          done: 'Done',
          complete: 'Complete',
          categories: [],
          backlogs: [],
          todos: [],
          dones: [],
          completes: [],
          categoryId: null,
          addCardFormUp: false,
          editCardFormUp: false,
          dataEdit: null
        }
    },
    components: {
      AddCard,
      CatBacklog,
      CatTodo,
      CatDone,
      CatComplete,
      EditCard
    },
    methods: {
      fetchCategories() {
        this.categories = []
        this.backlogs = []
        this.todos = []
        this.dones = []
        this.completes = []
        axios({
          method: 'GET',
          url: 'http://localhost:3000/categories',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            let result = data.data
            if (result.length) {
              result.forEach(data => {
                this.categories.push(data)
                if (data.name === 'Backlog') {
                  if (data.Tasks.length) {
                    data.Tasks.forEach(task => {
                      this.backlogs.push(task)
                    })
                    this.backlogs.sort((a, b) => {
                      return a.id - b.id
                    })
                  }
                } else if (data.name === 'Todo') {
                  if (data.Tasks.length) {
                    data.Tasks.forEach(task => {
                      this.todos.push(task)
                    })
                    this.todos.sort((a, b) => {
                      return a.id - b.id
                    })
                  }
                } else if (data.name === 'Done') {
                  if (data.Tasks.length) {
                    data.Tasks.forEach(task => {
                      this.dones.push(task)
                    })
                    this.dones.sort((a, b) => {
                      return a.id - b.id
                    })
                  }
                } else if (data.name === 'Complete') {
                  if (data.Tasks.length) {
                    data.Tasks.forEach(task => {
                      this.completes.push(task)
                    })
                    this.completes.sort((a, b) => {
                      return a.id - b.id
                    })
                  }
                }
              })
            } else {
              this.categories.push(
                {
                  id: 1,
                  name: 'Backlog'
                },
                {
                  id: 2,
                  name: 'Todo'
                },
                {
                  id: 3,
                  name: 'Done'
                },
                {
                  id: 4,
                  name: 'Complete'
                }
              )
            }

            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].name === 'Backlog') {
                  break
                }
                if (i === this.categories.length - 1) {
                  this.categories.push({
                    id: 1,
                    name: 'Backlog'
                  })
                }
            }

            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].name === 'Todo') {
                  break
                }
                if (i === this.categories.length - 1) {
                  this.categories.push({
                    id: 2,
                    name: 'Todo'
                  })
                }
            }

            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].name === 'Done') {
                  break
                }
                if (i === this.categories.length - 1) {
                  this.categories.push({
                    id: 3,
                    name: 'Done'
                  })
                }
            }

            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].name === 'Complete') {
                  break
                }
                if (i === this.categories.length - 1) {
                  this.categories.push({
                    id: 4,
                    name: 'Complete'
                  })
                }
            }

            this.categories.sort((a, b) => {
              return a.id - b.id
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      addCardForm(id) {
        this.categoryId = id
        if (this.addCardFormUp) {
          this.addCardFormUp = false
        } else {
          this.addCardFormUp = true
        }
      },
      editCardForm(id) {
        if (this.editCardFormUp) {
          this.editCardFormUp = false
          this.fetchCategories()
        } else {
          axios({
            method: 'GET',
            url: `http://localhost:3000/tasks/${id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              let task = data.data
              this.dataEdit = task
              this.editCardFormUp = true
            })
            .catch(err => {
              console.log(err.response.data)
            })
        }
      },
      deleteCard(id) {
        axios({
          method: 'DELETE',
          url: `http://localhost:3000/tasks/${id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.fetchCategories()
          })
          .catch(err => {
            console.log(err.response.data)
          })
      },
      changePage(page) {
        this.$emit('changePage', page)
      }
    },
    created() {
      if (this.isLogedIn) {
        this.fetchCategories()
      }
    },
    mounted() {
      // addCardFormDown()
    }
}
</script>