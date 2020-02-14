<template>
  <div class="col-sm-6 col-md-4" id="board">
    <h6 class="lead font-weight-light">{{category.name}}</h6>
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
        <a href="" id="add-task" @click.prevent="close" v-if="addTask"><span class="glyphicon glyphicon-remove"></span> close</a>
        <a href="" id="add-task" @click.prevent="add" v-if="!addTask"><span class="glyphicon glyphicon-plus"></span> add new task</a>
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
        url : 'http://localhost:4000/tasks',
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
  background-color: darkgray;
  border-radius : 3px;
  width: 23%;
  margin : 10px 1%;
  padding-bottom: 5px; 
}

.b-kanban{
  max-height:200px ;
  overflow-y: auto;
}

#add-task{
  text-decoration: none;
  margin-bottom: 10px;
}

#add-form{
  width: 100%;
}

/* .form-control{
  margin: 5px 0;
  border-radius: 5px;
} */
</style>