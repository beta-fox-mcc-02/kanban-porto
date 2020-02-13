<template>
<div>
  <div class="container mt-4" v-if="page == 'project'">
    <!-- <h1>halaman project {{currentProject}}</h1> -->
     <div class="row"></div>
    <div class="float-right">
      <button class="btn btn-primary" @click.prevent="formTask">Add Task</button>
      <button class="btn btn-primary" @click.prevent="formUser">Add User</button>
    </div>

    <!-- task form -->
    <form v-if="taskForm == true"  @submit.prevent="addtask">
  <div class="form-group mt-5">
    <label for="">title</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter title" v-model="title">
  </div>
    <div class="form-group mt-5">
    <label for="">Assignee</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter assignee" v-model="assignee">
  </div>
    <div class="form-group mt-5">
    <label for="">Description</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter description" v-model="desc">
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>

<!-- user  -->
<form v-if="addUserForm == true"  @submit.prevent="addUser">
  <div class="form-group mt-5">
    <label for="">User Email</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter title" v-model="userEmail">
  </div>

  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
    <h1>Kanban Tasks {{currentProject}}</h1>
  </div>

    <!-- {{filterin}} -->
    <div class=" row mt-4 mr-1 ml-1">
    <kanbanCard
    v-for="(box, i) in boxes"
    :key="i"
    :box="box"
    :page="page"
    :filterin="filterin"
    >
    </kanbanCard>
    </div>
    <!-- <h1>ini bedain{{currentProject}}</h1>
    {{kanbanTasks}} ini tasks -->

  </div>
</template>
<script>
import axios from '../api/axiosInstance'
import kanbanCard from './kanbanCard'
name: 'projectPage'
export default {
  data(){
    return{
      title:'',
      assignee:'',
      desc: '',
      tasks:[],
      taskForm: false,
      addUserForm: false,
      userEmail: '',
      boxes: [{
        name: 'backLog',
        color: '#FF5722',
      },{
        name: 'Todo',
        color: '#2196F3',
      }, {
        name: 'Doing',
        color: '#00BCD4',
      }, {
        name: 'Done',
        color: '#8BC34A',
      }],
    }
  },
  components:{
    kanbanCard
  },
  props:{
    page: String,
    currentProject: Number,
    kanbanTasks: Array
  },
  methods:{
    changePage(laman){
    // console.log('dari project page',laman);
    this.$emit('change-Page', laman)
  },
  addUser(){
    // console.log(this.userEmail);
      axios({
      method:'post',
      url: `/project/collab`,
      data:{
        projectId: this.currentProject,
        email: this.userEmail
      },
      headers:{
        token: localStorage.token
      }
    })
    .then(({data})=>{
      console.log(data);
      
      if(data.id){
        console.log('user added to this project');
      }else{
        console.log('user already in this project');
      }
      this.userEmail = ''
      addUserForm= false
    })
    .catch(err =>{
      console.log(err);
    })
  },
  addtask(){
    axios({
      method:'post',
      url:`/task`,
      data:{
        title: this.title,
        assignee: this.assignee,
        desc: this.desc,
        status: 'backLog',
        ProjectId: this.currentProject
      }
    })
    .then (({data})=>{
      // this.tasks = data
      this.title = ''
      this.assignee = ''
      this.desc = ''
      this.taskForm = false

    })
    .catch(err =>{
      console.log(err);
      
    })
  },
  formUser(){
    if(this.addUserForm == false){
      this.addUserForm = true
    }else{
      this.addUserForm = false
    }
  },
  formTask(){
    if(this.taskForm == false){
      this.taskForm = true
    }else{
      this.taskForm = false
    }
  }
  },
  computed:{
    filterin(){
      let result = this.kanbanTasks.filter(i => i.ProjectId == this.currentProject);
      return result
    }
  }
}
</script>

<style>

</style>