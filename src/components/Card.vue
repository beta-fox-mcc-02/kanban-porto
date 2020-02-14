<template>
  <div>
    <div class="card shadow-sm" v-if="!isEditTask">
      <div class="card-body p-2">
        <div class="card-title" :id="task.id">
          <h6> {{ task.title }} </h6>
        </div>
        <div class="">
          <small class="float-left">
            <a href="#"><i class="fas fa-arrow-left mr-2" 
                @click="move('left')"
                v-if="!CategoryOne"></i></a>
            <a href="#"><i class="fas fa-arrow-right"
                @click="move('right')"
                v-if="!CategoryFour"></i></a>
          </small>
          <small class="float-right">
            <a href="#"><i class="fas fa-edit" @click="showEditForm"></i></a> |
            <a href="#"><i class="fas fa-trash-alt" @click="deleteTask"></i></a>
          </small>
        </div>
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
      editedTask: '',
      CategoryOne: this.CategoryId === 1 ? true : false,
      CategoryFour: this.CategoryId === 4 ? true : false
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
          this.$emit('fetchDataAgain');
        })
        .catch(err => {
          console.log(err.response.data);
        })
    },
    move(direction){
      let catId;
      if(direction === 'left') catId = this.CategoryId - 1;
      else catId = this.CategoryId + 1;
      console.log(catId);
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/kanban/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        },
      })
        .then(res => {
          return axios({
            method: 'POST',
            url: `http://localhost:3000/kanban`,
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              title: this.task.title,
              CategoryId: catId
            }
          })
        })
        .then(res => {
          console.log(res.data);
          this.$emit('fetchDataAgain');
          this.$emit('reloadOtherCategory', catId)
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