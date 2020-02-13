<template>
  <div class="container" v-if="page == 'home'">
    <div class="row"></div>
    <div class="float-right">
      <button class="btn btn-primary" @click.prevent="formProject">Add Project</button>
    </div>
    <form v-if="projectForm == true">
  <div class="form-group mt-5">
    <label for="exampleInputEmail1">Project Name</label>
    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" v-model="projectName">
  </div>
  <button type="submit" class="btn btn-primary" @click.prevent="addProject" >Submit</button>
</form>

<form v-if="projectEdit == true" @submit.prevent="projectUpdate" >
  <div class="form-group mt-5">
    <label for="exampleInputEmail1">New Project Name</label>
    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" v-model="projectName">
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>

    <h1>projects</h1>
  <div class="container row">
  <div class="card bg-info ml-3 mt-3 " style="border-raidus: 5px; width: 16rem;"
  v-for="project in projects" :key="project.id" 

  >
    <div class="card-body text-center">
      <h5 class="card-text"
      @click.prevent="currentProject(project.id)"
      >{{project.name}}</h5>
    </div>
    <div class="card-footer text-center">
      <button class="btn btn-danger" @click="removeProject(project.id)" >delete</button>
      <button class="btn btn-warning" @click="updateProject(project.id,project.name)" >edit</button>
    </div>
  </div>

  </div>
  </div>
</template>

<script>
import axios from '../api/axiosInstance'
name: 'homePage'
export default {
data(){
  return{
    projectName: '',
    projectForm: false,
    projects: [],
    projectEdit: false,
    projectId: null
  }
},
props:{
  page: String,
  socket: Object
  },
methods:{
  projectUpdate(){
     axios({
      method:'put',
      url: `/project/${this.projectId}`,
      data:{
        name: this.projectName
      }
    })
    .then(({data})=>{
      this.projectName = ''
      this.projectId = ''
      this.projectEdit = false
      this.fetchProject()
    })
    .catch(err =>{
      console.log(err);
    })
  },
  updateProject(id, name){
    // console.log(id,'ini nama');
    this.projectName = name
    this.projectId = id
    if(this.projectEdit == false){
      this.projectEdit = true
    }else{
      this.projectEdit = false
    }
  },
  removeProject(id){
    axios({
      method:'delete',
      url: `/project/${id}`
    })
    .then(({data})=>{
      this.fetchProject()
    })
    .catch(err =>{
      console.log(err);
      
    })
  },
  formProject(){
    console.log(this.projectForm);
    
    if(this.projectForm == false){
      this.projectForm = true
    }else{
      this.projectForm = false
    }
  },
  currentProject(id){
    // console.log(id, 'dari home');
    
    this.$emit('project-Page', id)
    this.changePage('project')

  },
  changePage(laman){
    // console.log('dari home page',laman);
    this.$emit('change-Page', laman)
  },
  addProject(){
    axios({
      method:'post',
      url:'/project',
      data:{
        name: this.projectName
      }
    })
    .then(({data})=>{
      this.projectName = ''
      this.projectForm = false
      this.fetchProject()
      console.log(data);
      
    })
    .catch(err =>{
      console.log(err);
      
    })
  },
  fetchProject(){
    axios({
      method:'get',
      url:'/project'
    })
    .then(({data})=>{
      this.projects = data
    })
    .catch(err =>{
      console.log(err);
      
    })
  }
},
created: function(){
  if(localStorage.token){
    this.fetchProject()
    this.page='home'
    this.socket.on('project', (data) => {
      // console.log(data, 'ini dari io');
      this.projects.push(data)
      });

    this.socket.on('fetchProject', (data) => {
      this.fetchProject()

    });
    }
}
}
</script>

<style>

</style>