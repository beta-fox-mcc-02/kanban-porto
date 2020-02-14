<template>
  <div class="card" style="width: 18rem;">
     <div class="card-body" v-if="!editModal">
            <a href="#"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="updateCat"></i></a>
            <a href="#"><i class="fa fa-trash" aria-hidden="true" @click="deleteCat"></i></a>
         <div v-if="catShow">
            <h5 class="card-title text-center title">{{ category.name }}</h5>
         </div>
         <div v-else>
            <form @submit.prevent="updateCategory">
               <input type=text v-model="categoryName" required>
               <input type="submit" class="btn btn-warning" value="edit">
            </form>
         </div>
         <Task 
         v-for="task in listTasks" 
         :key="task.id" 
         :task="task" @deleteTask="deleteTask" @updateTask="updateTask" :editModal="editModal">

         </Task>
         <div class="btn-new-task">
            <form @submit.prevent="createTask">
               <input type="text" v-model="newTask" placeholder="new task" required>
               <input type="submit" class="btn btn-primary" value="add">
            </form>
         </div>
     </div>
     <div v-else>
        <div class="updateForm"> 
            <label>Title</label>
            <input type="text" v-model="title" required>
            <label>Description</label>
            <input type="description" v-model="description">
            <select>
            </select>
            <button type="submit" @click.prevent="updatingTask">Save</button>
         </div>
         <button type="submit" @click="closeModal">Close</button> 
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import Task from './Task'

export default {
   name: 'Category',
   components : {
      Task
   },
   data() {
      return {
         tasks : [],
         newTask : '',
         editModal : null,
         title: '',
         description: '',
         taskId : '',
         categoryName : '',
         catShow : true
      }
   },
   props : ["category"],
   methods : {
      addTask () {
         console.log('add task')
      },
      fetchTasks() {
         // console.log(this.category.id, 'category id')
         let categoryId = this.category.id
         axios({
            method: "GET",
            url : `http://localhost:3000/tasks/category/${categoryId}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(task => {
               this.tasks = task.data.data
            })
            .catch(err => {
               console.log(err)
            })
      },
      addNewTask() {
         axios({
            method: 'POST',
            url: `http://localhost:3000/tasks`,
            headers : {
               token : localStorage.token
            },
            data : {
               title : this.newTask,
               CategoryId : this.category.id
            }
         })
            .then(response => {
               console.log(response, 'response add')
               this.newTask = ''
               this.fetchTasks()
            })
            .catch(err => {
               console.log(err, 'error add')
            })
      },
      deleteTask(id) {
         axios({
            method: "DELETE",
            url : `http://localhost:3000/tasks/${id}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(data => {
               // console.log(data, 'success delete data')
               this.fetchTasks()
            })
            .catch(err => {
               console.log(err, 'error delete data')
            })
      },
      createTask() {
         this.addNewTask()
      },
      updateTask(id, status) {
         // console.log(id, status)
         if(status) {
            this.editModal = status
            // console.log('masuk update task')
            this.getTask(id)            
         } else {
            this.editModal = status
         }
      },
      closeModal () {
         this.editModal = false
      },
      getTask(id) {
         // console.log('masuk get task by id')
         axios({
            method: 'GET',
            url : `http://localhost:3000/tasks/${id}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(({data}) => {
               // console.log(data, 'get one task axios success')
               this.taskId = data.task.id
               this.title = data.task.title
               if(data.task.description) {
                  this.description = data.task.description                   
               }

            })
            .catch(err => {
               console.log(err)
            })
      },
      updatingTask() {
         console.log('masuk updating task')
         console.log(this.taskId, this.title, this.description)
         let newDescription
         if(this.description) {
            newDescription = this.description
         } else {
            newDescription = null
         }
         let id = this.taskId
         axios({
            method: "PUT",
            url: `http://localhost:3000/tasks/${id}`,
            data : {
               title : this.title,
               description : newDescription
            },
            headers : {
               token : localStorage.token
            }
         })
            .then(({data}) => {
               console.log('masuk success updating')
               this.editModal = false
               this.fetchTasks()
            })
            .catch(err => {
               console.log(err, 'masuk error updating')
            })
      },
      getCat() {
         let id = this.category.id
         console.log(id)
         axios({
            method: 'GET',
            url : `http://localhost:3000/categories/${id}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(({data}) => {
               console.log(data, 'getCat')
               this.categoryName = data.data.name
            })
            .catch(err => {
               console.log(err)
            })
      },
      updateCat() {
         if(this.catShow) {
            this.catShow = false
            this.getCat()
         } else {
            this.catShow = true
         }
      },
      deleteCat() {
         this.$emit('deleteCat', this.category.id)
      },
      updateCategory() {
         let id  = this.category.id
         console.log('masuk update category')
         // this.$emit('updateCategory', this.category.id, this.categoryName)
         axios({
            method: 'PUT',
            url : `http://localhost:3000/categories/${id}`,
            headers : {
               token : localStorage.token
            },
            data : {
               name : this.categoryName
            }
         })
            .then(data => {
               console.log(data, 'update category')
               this.catShow = true
               this.$emit('fetchCat')
            })
            .catch(err => {  
               console.log(err, 'error update category')
            })
      }
   },
   watch : {
      // category (value) {
      //    console.log(value, 'from watch')
      // }
   },
   created () { 
      // console.log(category, 'category created')
      this.editModal = false
      this.fetchTasks()

   },
   computed: {
      listTasks () {
         return this.tasks
      }
   }
}
</script>

<style scoped>
   .fa-pencil-square-o {
      color: orange
   }
   .fa-trash {
      color: red
   }
</style> 