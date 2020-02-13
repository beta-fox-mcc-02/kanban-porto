<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#taskModal"
    >Add Task</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="taskModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
           <div class="modal-body">
               <div class="form-group">
    <label for="">title</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter title" v-model="title">
  </div>
    <div class="form-group">
    <label for="">Assignee</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter assignee" v-model="assignee">
  </div>
    <div class="form-group">
    <label for="">Description</label>
    <input class="form-control" aria-describedby="emailHelp" placeholder="Enter description" v-model="desc">
  </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="submit"
              class="btn btn-primary"
              data-dismiss="modal"
              @click.prevent="addtask"
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../api/axiosInstance'
name: 'addTask'
export default {
  data(){
    return{
      title:'',
      assignee:'',
      desc: '',
    }
  },
  props:{
    currentProject: Object
  },
  methods:{
    addtask(){
      // console.log('keluar');
      
    axios({
      method:'post',
      url:`/task`,
      data:{
        title: this.title,
        assignee: this.assignee,
        desc: this.desc,
        status: 'backLog',
        ProjectId: this.currentProject.id
      }
    })
    .then (({data})=>{
      // this.tasks = data
      this.title = ''
      this.assignee = ''
      this.desc = ''
      console.log(data);
      

    })
    .catch(err =>{
      console.log(err);
      
    })
  },
  }
};
</script>

<style>
</style>