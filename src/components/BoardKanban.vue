<template>
  <div class="col-sm-6 col-md-4" id="board">
    <h6 class="lead font-weight-light title-category">{{category.name}}</h6>
    <div class="card-body b-kanban">
        <CardKanban
        v-for="task in category.task"
        :key="task.id"
        :task='task'
        :IdCategory='category.id'
        @nextBotton='nextCard'
        @prevBotton='prevCard'
        @fetchData='fetchData'
        >
        </CardKanban>
    </div>
    <form class="add-form" v-if="addTask" @submit.prevent="addNewTask">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Enter New Task" required v-model="input">
      </div>
    </form>
        <a href="" class="add-task" @click.prevent="close" v-if="addTask"><span class="glyphicon glyphicon-remove"></span> close</a>
        <a href="" class="add-task" @click.prevent="add" v-if="!addTask"><span class="glyphicon glyphicon-plus"></span> add new task</a>
  </div>
</template>

<script>
import CardKanban from './CardKanban'
import axios from '../config/axios'

export default {
  Name:'BoardKanban',
  props : {
    category : Object
  },
  data(){
    return {
      addTask:false,
      input : '',
      idEdit : Number
    }
  },
  components : {
    CardKanban
  }, 
  methods:{
    add(){
      this.addTask ? this.addTask=false : this.addTask=true
    },
    fetchData(){
      this.$emit('fetchData')
    },
    nextCard(title,id){
      let CategoryId = this.category.id
      let data = {title,CategoryId:CategoryId+1}
      if(CategoryId!=4){
        this.UpdateTask(id,data)
      }
    },
    prevCard(title,id){
      let CategoryId = this.category.id
      let data = {title,CategoryId:CategoryId-1}
      if(CategoryId!==1){
        this.UpdateTask(id,data)
      }
    },
    UpdateTask(id,data){
      axios({
        method : 'PUT',
        url : `/tasks/${id}`,
        headers : {
          token: localStorage.token
        },
        data
      })
      .then(({data})=>{
        this.editForm = false
        this.$emit('fetchData')
      })
      .catch(err=>{
        console.log(err.response.data)
      })
    }, 
    addNewTask(){
      let title = this.input 
      let CategoryId = this.category.id
      let data = {title,CategoryId}
      axios({
        method : 'POST',
        url : '/tasks',
        headers : {
          token : localStorage.token
        },
        data
      })
      .then(({data})=>{
        this.$emit('fetchData')
        this.input = ''
        this.addTask = false
      })
      .catch(err=>{
        console.log(err.response);
      })
    }, 
    close(){
      this.addTask=false
    }
  }
}
</script>

<style>
#board{
  background-color: #d2d2d291;
  border-radius: 5px;
  width: 23%;
  margin : 10px 1%;
  padding-bottom: 5px; 
}

.b-kanban{
  height: max-content;
  max-height:70vh;
  overflow-y: auto;
}

.add-task{
  text-decoration: none;
  margin-bottom: 10px;
  color: #124a69cf;
}

#add-form{
  width: 100%;
}

.title-category{
  font-family: 'Palanquin Dark', sans-serif;
  color: #124a69cf
}
/* .form-control{
  margin: 5px 0;
  border-radius: 5px;
} */
</style>