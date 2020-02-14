<template>
  <div>
    <div class="card shadow-sm" v-if="!isEditTask">
      <div class="card-body p-2">
        <div class="card-title" :id="task.id">
          <h6> {{ task.title }} </h6>
        </div>
        <small class="float-right">
          <a href="#"><i class="fas fa-edit" @click="showEditForm"></i></a> |
          <a href="#"><i class="fas fa-trash-alt" @click="deleteTask"></i></a>
        </small>
      </div>
    </div>

     <form 
      v-if="isEditTask" 
      class="my-2" 
      @submit.prevent="editTask">
      <div class="form-group" >
        <input class="form-control" placeholder="Edit task" required v-model="editedTask">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props : {
    task: Object,
    CategoryId: Number
  },
  name: 'Card',
  data(){
    return {
      isEditTask: false,
      editedTask: ''
    }
  },
  methods: {
    deleteTask(){
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/kanban/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          console.log('success delete data');
          this.$emit('fetchDataAgain')
        })
        .catch(err => {
          console.log(err.response.data);
        })
    },
    showEditForm(){
      this.isEditTask = true;
    },
    editTask(){
      axios({
        method: 'PUT',
        url: `http://localhost:3000/kanban/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.editedTask,
          CategoryId: this.CategoryId
        }
      })
        .then(res => {
          console.log('success update data');
          this.$emit('fetchDataAgain')
        })
        .catch(err => {
          console.log(err.response.data);
        })
    }
    
  }

}
</script>

<style scoped>
.fa-trash-alt{
  color: red;
}

</style>