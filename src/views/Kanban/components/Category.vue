<template>
  <div class="card" style="width: 18rem;">
     <div class="card-body" v-if="!editModal">
         <a href="#"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="updateCat"></i></a>
         <a href="#"><i class="fa fa-trash" aria-hidden="true" @click="deleteCat"></i></a>
         <div v-if="catShow">
            <h5 class="card-title text-center title">{{ category.name }}</h5>
         </div>
         <div v-else style="width:100%; margin-bottom: 10px">
            <form @submit.prevent="updateCategory" style="display: flex; justify-content: center; align-items: center">
               <input type="text" style="width: 80%" v-model="categoryName" required autofocus>
               <input type="submit" style="height: 30px; width: 20%" class="btn-success" value="save">
            </form>
         </div>
         <Task 
         v-for="task in listTasks" 
         :key="task.id" 
         :task="task" 
         @deleteTask="deleteTask" 
         @updateTask="updateTask" 
         :editModal="editModal"
         :start="start"
         :end="end"
         :categoryId="category.id"
         @prev="prev"
         @next="next">

         </Task>
         <div class="btn-new-task">
            <form @submit.prevent="createTask" class="newTask">
               <input type="text" v-model="newTask" placeholder="new task" style="width:80%" required>
               <input type="submit" style="width: 20%" class="btn btn-primary" value="add">
            </form>
         </div>
     </div>
     <div v-else class="updateForm">
        <div class="updateForm pt-5"> 
            <label for="title"><b>Title</b></label>
            <input type="text" style="width: 90%" class="mb-2" v-model="title" required>
            <label for="description"><b>Description</b></label>
            <textarea type="description" style="width: 90%; height:100px" class="mb-2" v-model="description"></textarea>
            <button class="btn btn-success mb-2" type="submit" @click.prevent="updatingTask">Save</button>
         </div>
         <button class="btn btn-danger mr" type="submit" @click="closeModal">Close</button> 
     </div>
  </div>
</template>

<script>
import axios from '../../../config/axios'
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
   props : ["category", "start", "end", "allCategory"],
   methods : {
      addTask () {
         console.log('add task')
      },
      fetchTasks() {
         // console.log(this.category.id, 'category id')
         let categoryId = this.category.id
         axios({
            method: "GET",
            url : `/tasks/category/${categoryId}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(({ data }) => {
               // console.log(data, '=====data')
               this.tasks = data.data
            })
            .catch(err => {
               console.log(err)
            })
      },
      addNewTask() {
         axios({
            method: 'POST',
            url: `/tasks`,
            headers : {
               token : localStorage.token
            },
            data : {
               title : this.newTask,
               CategoryId : this.category.id
            }
         })
            .then(response => {
               // console.log(response, 'response add')
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
            url : `/tasks/${id}`,
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
         console.log(id, status)
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
            url : `/tasks/${id}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(({ data }) => {
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
      updatingTask(catId, taskId) {
         // console.log(catId, 'updating task 2')
         // console.log('masuk updating task')
         // console.log(this.taskId, this.title, this.description, catId)
         let newDescription
         if(this.description) {
            newDescription = this.description
         } else {
            newDescription = null
         }
         let CategoryId
         let id = this.taskId
         if(catId && taskId) {
            id = taskId
            CategoryId = catId
         } else {
            CategoryId = null
         }  
         // console.log(CategoryId, id)
         axios({
            method: "PUT",
            url: `/tasks/${id}`,
            data : {
               title : this.title,
               description : newDescription,
               CategoryId
            },
            headers : {
               token : localStorage.token
            }
         })
            .then(({ data }) => {
               // console.log(data, 'masuk success updating')
               this.editModal = false
               this.$emit('fetchCat')
               // this.fetchTasks()
            })
            .catch(err => {
               console.log(err, 'masuk error updating')
            })
      },
      getCat() {
         let id = this.category.id
         // console.log(id)
         axios({
            method: 'GET',
            url : `/categories/${id}`,
            headers : {
               token : localStorage.token
            }
         })
            .then(({data}) => {
               // console.log(data, 'getCat')
               this.categoryName = data.data.name
            })
            .catch(err => {
               console.log(err)
            })
      },
      updateCat() {
      //   console.log('test')
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
         // console.log('masuk update category')
         // this.$emit('updateCategory', this.category.id, this.categoryName)
         axios({
            method: 'PUT',
            url : `/categories/${id}`,
            headers : {
               token : localStorage.token
            },
            data : {
               name : this.categoryName
            }
         })
            .then(data => {
               // console.log(data, 'update category')
               this.catShow = true
               this.$emit('fetchCat')
            })
            .catch(err => {  
               // console.log(err, 'error update category')
            })
      },
      next(catId, taskId) {
         // console.log(catId, taskId)
         // console.log(catId, 'next 1')
         // console.log(this.allCategory)
         let status = true
         let i = 0 
         while(status) {
            if(this.allCategory[i].id === +catId) {
               catId = this.allCategory[i+1].id
               status = false
            } else {
               i++
            }
         }
         // console.log(catId, 'next 2', taskId)
         this.updatingTask(catId, taskId)
         console.log(this.category, 'next2')
         // this.$emit('fetchCat')
         // this.$emit('next', catId, taskId)
      },
      prev(catId, taskId) {
         // console.log(catId, taskId)
         // console.log(this.allCategory)
         
         let status = true
         let i = this.allCategory.length-1
         while(status) {
            if(this.allCategory[i].id === +catId) {
               catId = this.allCategory[i-1].id
               status = false
            } else {
               i--
            }
            if(i <= 0) {
               status = false
            }
         }   
         // console.log(catId, 'next 2', taskId)
         this.updatingTask(catId, taskId)
         console.log(this.category, "prev2")
         // this.$emit('fetchCat')
         // this.$emit('prev', catId, taskId)
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
      },
      firstCat () {
         let i = 0
         
      },
      lastCat () {
         
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
   .newTask {
      display: flex
   }
   .updateForm {
      display : flex;
      flex-direction: column;
      align-items: center
   }
</style> 