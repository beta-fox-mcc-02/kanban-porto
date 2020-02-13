<template>
  <div v-if="isLogedIn">
    <div class="col-12 p-0 d-flex cards-container">
        <div class="pl-2 my-2 cards-group" v-for="category in categories">
          <p class="m-0 p-1 categori">{{ category.name }}</p>
          <div>
            <CatBacklog :backlogs="backlogs" v-if="backlog === category.name"></CatBacklog>
            <CatTodo :todos="todos" v-if="todo === category.name"></CatTodo>
            <CatDone :dones="dones" v-if="done === category.name"></CatDone>
            <CatComplete :completes="completes" v-if="complete === category.name"></CatComplete>
          </div>
          <div class="mt-2 add-card">
              <p class="icon-add-card">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Add a card
            </p>
          </div>
        </div>
        

      <!-- <AddCard>
      </AddCard> -->
  </div>
</template>

<script>
import AddCard from './AddCard'
import CatBacklog from './CatBacklog'
import CatTodo from './CatTodo'
import CatDone from './CatDone'
import CatComplete from './CatComplete'

export default {
    name: 'Board',
    props: {
        isLogedIn: Boolean
    },
    data() {
        return {
          key: null,
          categoryDisplay: '',
          backlog: 'Backlog',
          todo: 'Todo',
          done: 'Done',
          complete: 'Complete',
          categories: [],
          backlogs: [],
          todos: [],
          dones: [],
          completes: []
        }
    },
    components: {
      AddCard,
      CatBacklog,
      CatTodo,
      CatDone,
      CatComplete
    },
    methods: {
      fetchCategories() {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/categories'
        })
          .then(({ data }) => {
            let result = data.data
            result.forEach(data => {
              this.categories.push(data)



              if (data.name === 'Backlog') {
                if (data.Tasks.length) {
                  data.Tasks.forEach(task => {
                    this.backlogs.push(task)
                  })
                }
              } else if (data.name === 'Todo') {
                if (data.Tasks.length) {
                  data.Tasks.forEach(task => {
                    this.todos.push(task)
                  })
                }
              } else if (data.name === 'Done') {
                if (data.Tasks.length) {
                  data.Tasks.forEach(task => {
                    this.dones.push(task)
                  })
                }
              } else if (data.name === 'Complete') {
                if (data.Tasks.length) {
                  data.Tasks.forEach(task => {
                    this.completes.push(task)
                  })
                }
              }
            })

            console.log(this.categories)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created() {
      if (this.isLogedIn) {
        this.fetchCategories()
      }
    }
}
</script>