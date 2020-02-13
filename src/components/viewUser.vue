<template>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#listUserModal" @click.prevent="getUserLits">
  Project's User
</button>

<!-- Modal -->
<div class="modal fade" id="listUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">User's list</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- {{userList}} -->
        <div 
        v-for="(user, i) in userList"
        :key="i"
        >
          <p>name: {{user.name}}, email: {{user.email}}</p>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import axios from '../api/axiosInstance'
name:'viewUser'
export default {
  data(){
    return{
      userList:[]
    }
  },
  props:{
    currentProject: Object,
  },
  methods:{
    getUserLits(){
       axios({
        method: "get",
        url: `/project/${this.currentProject.id}`,
      })
        .then(({ data }) => {
          this.userList = data[0].Users
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style>

</style>