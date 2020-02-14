<template>
  <div class="card bg-light" :id="panelId">
    <div class="card-body">
      <div class="mb-2 flex-row">
        <h6 class="card-title text-uppercase text-truncate py-2 align-self d-inline">{{ panelTitle }}</h6>
      </div>
      <div class="items border border-light" v-for="task in tasks" :key="task.id">
        <cardVue 
          :task="task" 
          class="m-1" 
          @fetchDataAgain="fetchDataAgain"
          :CategoryId="panelId"
          @reloadOtherCategory="reloadOtherCategory">
        </cardVue>

      </div>

      <form v-if="addTaskInput" class="my-2" @submit.prevent="addNewTask">
        <div class="form-group" >
          <input class="form-control" placeholder="Enter new task" required v-model="newTask">
        </div>
      </form>

      <button class="btn btn-light btn-block add-task" @click="showAddTask">Add Task</button>
    </div>
  </div>

</template>

<script>
import cardVue from './Card';
import axios from '../config/axios';

export default {
  props: {
    panelTitle: String,
    panelId: Number,
    reloadCat: Number
  },
  name: 'Panel',
  data(){
    return {
      tasks: [],
      addTaskInput: false,
      newTask: '',
      isEditTask: false,
      editedTask: '',
    }
  },
  components: {
    cardVue
  },
  methods: {
    fetchData(){
      axios({
        method: 'GET',
        url: `/kanban/${this.panelId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          res.data.data.map(el => this.tasks.push({id: el.id, title: el.title}))
        })
        .catch(err => {
          console.log(err.response);
          this.$emit('changePageTo', 'register')
          this.$emit('renderErrorMessage', err.response.data);
        })
    },
    showAddTask(){
      if(this.addTaskInput){
        this.addTaskInput = false;
        this.newTask = '';
      }else{
        this.addTaskInput = true;
      }
    },
    closeInputAddTask(){
      this.addTaskInput = false;
      this.newTask = '';

    },
    addNewTask(){
      this.addTaskInput = false;
      axios({
        method: 'POST',
        url: '/kanban',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.newTask,
          CategoryId: this.panelId
        }
      })
        .then(res => {
          this.tasks = [];
          this.fetchData();
          this.newTask = '';
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response);
          this.$emit('renderErrorMessage', err.response.data);
        })
    },
    fetchDataAgain(){
      this.tasks = [];
      this.fetchData();
    },
    editTask(){
      this.isEditTask = true;
    },
    reloadOtherCategory(payload){
      this.$emit('reloadOtherCategory', payload)
    },
    reloadThisPanel(payload){
      if(this.reloadCat === this.panelId){
        console.log('mausk');
      }
    }
  },
  created(){
    if(localStorage.access_token){
      this.fetchData()
    }
  },
  watch: {
    reloadCat: function(val){
      if(val === this.panelId){
        this.fetchDataAgain();
        this.$emit('reloadOtherCategory', 99);
      }
    }
  }

}
</script>

<style scoped>
#inputAddTask{
    width: 200px;
    height: 50px;
    padding-right: 50px;
}

#submitAddTask{
    margin-left: -50px;
    height: 20px;
    width: 50px;
}

btn .add-task{
  height: 50px;
}
</style>