<template>
   <div class="card-task">
      <a href="#" class="btn flex mb-2 task-style" @click.prevent="updateTask">  
         <div>
            {{ task.title }}
            <hr>
            {{ taskDescription }}
         </div>
      </a>
         <div id="flexButton">
            <div v-if="+categoryId != +start" @click.prevent="prev"><i class="fa fa-chevron-left btn-arr" aria-hidden="true"></i></div>
            <div v-if="+categoryId != +end" @click.prevent="next"><i class="fa fa-chevron-right btn-arr" aria-hidden="true"></i></div>
            <div><a href="#" class="btn btn-danger" @click.prevent="deleteTask"><i class="fa fa-trash" aria-hidden="true"></i></a></div>
         </div>
   </div>
</template>

<script>
export default {
   data () {
      return {
         title : '',
         description : ''
      } 
   },
   props : ['task', 'editModal', 'start', 'end', 'categoryId'],
   methods : {
      deleteTask() {
         // console.log('masuk function delete')
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
      },
      prev() {
         // console.log(this.task)

         this.$emit('prev', this.task.CategoryId, this.task.id)
      },
      next() {
         // console.log(this.task)
         this.$emit('next', this.task.CategoryId, this.task.id)
      }  
   },
   computed : {
      taskDescription () {
         if(this.task.description) {
            return this.task.description.substring(0, 10) + '...'
         } else {
            return this.task.description
         }
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
   .task-style {
      display: hide;
      background-color: #ccc   
   }
   .task-style:hover {
      display: block
   }
   .card-task {
      background-color: grey;
      margin-bottom: 5px;
      border-radius: 2px
   }
   #flexButton {
      display : flex;
      justify-content: space-evenly;
   }
   .btn-arr {
      padding: 4px
   }
   .btn-arr:hover {
      background-color: white;
      border-radius: 2px
   }
</style>