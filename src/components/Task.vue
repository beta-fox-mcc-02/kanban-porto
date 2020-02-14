<template>
   <div class="">
      <button href="#" class="btn btn-danger" @click.prevent="deleteTask">Delete</button>
      <a href="#" class="btn flex mb-2 task-style" @click.prevent="updateTask">  
         <div>
            <div>
               {{ task.title }}
            </div>
            <hr>
            <div>
               {{ task.description }}
            </div>
         </div>
      </a>
   </div>
</template>

<script>
import axios from 'axios'

export default {
   data () {
      return {
         title : '',
         description : ''
      } 
   },
   props : ['task', 'editModal'],
   methods : {
      deleteTask() {
         console.log('masuk function delete')
         this.$emit('deleteTask', this.task.id)
      },
      updateTask() {
         let modal = this.editModal
         console.log(modal)
         if(modal) {
            modal = false
         } else {
            modal = true
         }
         // console.log(modal)
         this.$emit('updateTask', this.task.id, modal)
      }  
   },
   created () {
      // console.log(this.editModal)
      // console.log(this.task, 'check task')
      // console.log(this.task[0].title, 'check title')
      // console.log(this.task[0].description, 'check desc')
   }
}
</script>

<style scoped>
   .flex {
      display: flex;
      flex-direction: column
   }
   a {
      background-color: #ccc   
   }
   .task-style {
      display: hide
   }
   .task-style:hover {
      display: block
   }
</style>