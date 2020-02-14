<template>
  <div class="row">
     <div class="col">
         <div class="text-center mb-3">
            <h1 >Kanban</h1>
            <input class="btn btn-primary" type="submit" href="#" value="Add Category" @click="inputCreate">
            <div v-if="status">
               <form @submit="createCategory">
                  <input type="text" v-model="name" placeholder="input your new category">
               </form>
               <button type="submit" @click="closeForm">X</button>
            </div>
         </div>
         <div class="flex">
            <Category 
            v-for="category in categories.categories" 
            :key="category.id" 
            :category="category" class="card-category m-2" @deleteCat="deleteCat" @fetchCat="fetchCat">  
      
            </Category>
         </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Category from './Category'

export default {
   data () {
      return {
         task : '',
         categories : [],
         status : false,
         name : ''
      }
   },
   components :{
      Category
   },
   methods : {
      createCategory () {
         axios({
            method: 'POST',
            url : 'http://localhost:3000/categories',
            headers : {
               token : localStorage.token
            },
            data : {
               name : this.name
            }
         })
            .then(response => {
               console.lof(response, 'axios board vue create success')
               this.status = false
               this.fetchCategories()
            })
            .catch(err => {
               console.log(err, 'axios board vue create fail')
            })
      },
      fetchCategories () {
         axios({
            method: 'GET',
            url : 'http://localhost:3000/categories',
            headers : {
               token : localStorage.token
            }
         })
            .then(response => {
               console.log(response, 'fetch categories')
               this.categories = response.data
            })
            .catch(err => {
               console.log(err, 'fail fetch categories')
            })
      },
      deleteCategories (id) {
         console.log('delete categories')
         axios({
            method: 'DELETE',
            url: `http://localhost:3000/categories/${id}`, 
            headers : {
               token : localStorage.token
            }
         })
            .then(data => {
               console.log(data, 'success delete categories')
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
         console.log(id, 'delete cat')
         this.deleteCategories(id)
      },
      fetchCat() {
         this.fetchCategories()
      }
   },
   created () {

      this.fetchCategories()
   },
   watch : {
      // categories(val) {
      //    console.log(val.categories)
      //    this.categories = val
      // }
   }
   
}
</script>

<style scoped>
   .flex {
      display : flex;
   }
   .card-category {
      background-color: teal;
      overflow: scroll;
      height: 400px
   }
</style>>