<template>
  <div>
    <div v-if="isLoading">
      <Loading ></Loading>
    </div>
    <div class="row" v-else>
      <div class="col">
          <div class="text-center mb-3">
              <h1 >Kanban Windows 98 Theme</h1>
              <input class="btn btn-primary mb-2" type="submit" href="#" value="Add Category" @click="inputCreate">
              <div v-if="status">
                <form @submit="createCategory">
                    <input type="text" v-model="name" placeholder="input your new category">
                    <button class="btn btn-primary" type="submit">+</button>
                </form>
              </div>
          </div>
          <div class="category-task container">
            <div class="row">
              <Category 
              v-for="category in getCategories" 
              :key="category.id" 
              :category="category" 
              class="card-category m-2" 
              @deleteCat="deleteCat" 
              @fetchCat="fetchCat"
              :start="start"
              :end="end"
              :allCategory="allCategory">  
        
              </Category>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '../../../config/axios'
import Category from './Category'
import Loading from '../../../components/Loading'

export default {
  data () {
    return {
      task : '',
      categories : [],
      status : false,
      name : '',
      startCat : '',
      endCat : '',
      allCategory: '',
      isLoading: false
    }
  },
  components :{
    Category,
    Loading
  },
  methods : {
    createCategory () {
      axios({
        method: 'POST',
        url : '/categories',
        headers : {
          token : localStorage.token
        },
        data : {
          name : this.name
        }
      })
        .then(response => {
          // console.log(response, 'axios board vue create success')
          this.status = false
          this.name = ''
          this.fetchCategories()
        })
        .catch(err => {
          console.log(err, 'axios board vue create fail')
        })
    },
    fetchCategories () {
      this.changeLoading(true)
      axios({
        method: 'GET',
        url : '/categories',
        headers : {
          token : localStorage.token
        }
      })
        .then(({ data }) => {
          //  console.log(data, '=== dari fetch ===')
          // console.log(data.categories, 'fetch categories')
          this.categories = data.categories
          this.allCategory = data.categories
          // console.log(this.categories, this.allCategory)
          if (this.categories.length !== 0)  {
            // console.log(this.categories.categories)
            this.start = this.categories[0].id
            this.end = this.categories[this.categories.length - 1].id
          }
        })
        .catch(err => {
          console.log(err, 'fail fetch categories')
        })  
        .finally(_ => {
          this.changeLoading(false)
        })
    },
    deleteCategories (id) {
      axios({
        method: 'DELETE',
        url: `/categories/${id}`, 
        headers : {
          token : localStorage.token
        }
      })
        .then(data => {
          this.fetchCategories()
        })
        .catch(err => {
          console.log(err, 'fail delete categories')
        })
    },
    inputCreate() {
      if(this.status) {
        this.status = false
      } else {
        this.status = true
      }
    },
    closeForm() {
      this.status = false
    },
    deleteCat(id) {
      this.deleteCategories(id)
    },
    fetchCat() {
      this.fetchCategories()
    },
    changeLoading (status) {
      this.isLoading = status
    }
  },
  created () {
    this.fetchCategories()
  },
  computed: {
    getCategories () {
      return this.categories
    }
  },
  watch: {
    categories(val) {
      console.log(val)
      this.categories = val
    }
  }
}
</script>

<style scoped>
  .category-task {
    display : flex;
    overflow: auto;
  }
  @media (max-width: 768px) { 
    .category-task {
      display : flex;
      align-items :center;
      flex-direction: column;
    }
  }
  .card-category {
    background-color: teal;
    overflow: auto;
    height: 400px
  }
</style>>