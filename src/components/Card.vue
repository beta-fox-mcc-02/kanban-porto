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
import axios from '../config/axios';

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
      this.$emit('loadingPage', true);
      axios({
        method: 'DELETE',
        url: `/kanban/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          // this.$emit('loadingPage', false);
          console.log('success delete data');
          this.$emit('fetchDataAgain')
        })
        .catch(err => {
          this.$emit('loadingPage', false);
          console.log(err.response.data);
        })
    },
    showEditForm(){
      this.$emit('loadingPage', true);
      axios({
        method: 'GET',
        url: `/kanban/card/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          this.$emit('loadingPage', false);
          this.isEditTask = true;
          this.editedTask = res.data.data.title;
        })
        .catch(err => {
          this.$emit('loadingPage', false);
          console.log(err.response);
        })
    },
    editTask(){
      this.$emit('loadingPage', true);
      axios({
        method: 'PUT',
        url: `/kanban/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.editedTask,
          CategoryId: this.CategoryId
        }
      })
        .then(res => {
          // this.$emit('loadingPage', false);
          console.log('success update data');
          this.$emit('fetchDataAgain');
        })
        .catch(err => {
          this.$emit('loadingPage', false);
          console.log(err.response.data);
        })
    },
    move(direction){
      let catId;
      if(direction === 'left') catId = this.CategoryId - 1;
      else catId = this.CategoryId + 1;
      this.$emit('loadingPage', true);
      axios({
        method: 'DELETE',
        url: `/kanban/${this.task.id}`,
        headers: {
          access_token: localStorage.access_token
        },
      })
        .then(res => {
          return axios({
            method: 'POST',
            url: `/kanban`,
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
          // this.$emit('loadingPage', false);
          console.log(res.data);
          this.$emit('fetchDataAgain');
          this.$emit('reloadOtherCategory', catId)
        })
        .catch(err => {
          this.$emit('loadingPage', false);
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

.fa-arrow-right, .fa-arrow-left{
  color:rgb(51, 117, 45);
}

</style>