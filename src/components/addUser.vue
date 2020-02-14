<template>
 <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary ml-4 mr-4"
      data-toggle="modal"
      data-target="#projectModal"
    >Add User</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="projectModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success" role="alert" 
            v-if="addedMsg !== ''">
              {{addedMsg}}
            </div>
            <div class="alert alert-danger" role="alert" v-if="warning !== ''">
              {{warning}}
            </div>
              <label for="exampleInputEmail1">User's Email</label>
              <input
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                v-model="userEmail"
              />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click.prevent="addUser" >Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../api/axiosInstance'
name: 'addUser'
export default {
  data(){
    return{
      userEmail:'',
      warning:'',
      addedMsg:''
    }
  },
  props:{
    currentProject: Object,
  },
  methods:{
      addUser(){
    // console.log(this.userEmail);
      axios({
      method:'post',
      url: `/project/collab`,
      data:{
        projectId: this.currentProject.id,
        email: this.userEmail
      },
      headers:{
        token: localStorage.token
      }
    })
    .then(({data})=>{
      // console.log(data);
      
        this.addedMsg = 'user added to this project'
      if(data.id){
        console.log('user added to this project');
        this.warning = ''
      }else{
        console.log('user already in this project');
        this.warning = 'user already in this project'
         this.addedMsg= ''
      }
      this.userEmail = ''
    })
    .catch(err =>{
      console.log(err);
    })
  }
  }
}
</script>

<style>

</style>