<template>
  <div>
    <div class="col-12 p-0 d-flex cards-container">
        <div class="px-2 my-2 cards-group" v-for="category in categories" :key="category.id">
          <p class="m-0 p-1 categori">{{ category.name }}</p>
          <div>
            <div class="mb-2 all-cards">
              <div class="my-1 card" v-for="task in category.Tasks" :key="task.id">
                <div class="p-1 card-body">
                    <div class="title-container">
                    <p class="m-0 card-title">{{ task.title }}</p>
                    </div>
                    <div class="description-container">
                    <p class="card-text">{{ task.description }}</p>
                    </div>
                    <div class="action-container">
                        <div>
                            <i class="m-1 fas fa-pencil-alt" @click="editCardForm(task.id)"></i>
                            <i class="m-1 far fa-trash-alt" @click="deleteCard(task.id)"></i>
                        </div>
                        <div>
                            <i class="fa fa-arrow-left" aria-hidden="true" v-if="category.id <= categories.length && category.id > 1" @click.prevent="editCategory(task.id, task.CategoryId, 'left')"></i>
                            <i class="fa fa-arrow-right" aria-hidden="true" v-if="category.id >= 1 && category.id < categories.length" @click.prevent="editCategory(task.id, task.CategoryId, 'right')"></i>
                        </div>
                    </div>
                </div>
              </div>
            </div>
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
        @fetchCategoriesAfterEdit="fetchCategories"
      ></EditCard>
  </div>
</template>

<script>
import axios from '../config/axios'
import AddCard from './AddCard'
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
          url: '/categories',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
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
        } else {
          axios({
            method: 'GET',
            url: `/tasks/${id}`,
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
          url: `/tasks/${id}`,
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
      },
      editCategory(id, catId, moveTo) {
          this.categoryId = catId
          this.move = moveTo

          if (this.move === 'right') {
              this.categoryId++
          } else if (this.move === 'left') {
              this.categoryId--
          }

          axios({
              method: 'PUT',
              url: `/tasks/${id}`,
              data: {
                  CategoryId: this.categoryId
              },
              headers: {
                  token: localStorage.getItem('token')
              }
          })
              .then(({ data }) => {
                  this.fetchCategories()
              })
              .catch(err => {
                  console.log(err.response.data)
              })
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