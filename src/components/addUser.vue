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
            <button type="submit" class="btn btn-primary" @click.prevent="addUser" data-dismiss="modal">Add</button>
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
      userEmail:''
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
  }
  }
}
</script>

<style>

</style>