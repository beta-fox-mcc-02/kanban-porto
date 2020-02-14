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
        class="row"
        v-for="(user, i) in userList"
        :key="i"
        >
        <div class="col text-left">
          <p>{{user.email}}</p>
        </div>
        <div class="col text-right">
          <p v-if="i == 0" >creator</p>
          <button class="btn btn-danger mr-3" v-if="i !== 0" @click.prevent="removeUser(user.id)">X</button>
        </div>

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
    },
    removeUser(id){
       axios({
        method: "delete",
        url: `/project/user/${id}/${this.currentProject.id}`,
      })
        .then(({ data }) => {
          this.getUserLits();
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
   created: function() {
    // if(localStorage.token) {
    //     this.socket.on("userList", data => {
    //     // console.log('kepanggil');
    //     this.getUserLits();
    //   });

    //   this.socket.on("addedUser", data => {
    //     // console.log('kepanggil');
    //     this.userList.push(data)
    //   });
    // }
  }
}
</script>

<style>

</style>