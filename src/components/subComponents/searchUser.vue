<template>
  <div>
      <a class="btn btn-primary text-light" data-toggle="modal" data-target="#searchFriend" @click='allUser'><i class="fa fa-paper-plane" aria-hidden="true"></i></a>
      <div class="modal fade" id="searchFriend" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header bg-info">
                  <label class="text-light">User List</label> 
                </div>
                <div class="modal-body">
                  <table class="table text-center">
                      <thead>
                          <th>Username</th>
                          <th>Invite</th>
                      </thead>
                      <tbody>
                          <tr v-for="user in uninvitedUser" :key="user.id">
                              <td>{{user.username}}</td>
                              <td><a class="btn" @click="invite(user.id)" data-dismiss="modal"><i class="fa fa-user-plus text-success" aria-hidden="true"></i></a></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            Users : [],
            compareUser : []
        }
    },
    methods : {
        allUser () {
            axios.get('http://localhost:3000/tasks/search', {
                headers : {
                    token : localStorage.token,
                    id : localStorage.id
                }
            })
            .then(({data}) => {
                // console.log(data)
                this.Users = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        invite(id){
            axios.post('http://localhost:3000/invite', {
                UserId : id
            }, {
                headers : {
                    token : localStorage.token,
                    id : localStorage.id
                }
            })
            .then(({data}) => {
                this.$emit('read')
            })
            .catch(err => {
                console.log(err)
            })
        },
        check(){
            axios.get('http://localhost:3000/organizations/invites', {
                headers : {
                    token : localStorage.token,
                    id : localStorage.id
                }
            })
            .then(({data}) => {
                this.compareUser = data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created () {
        this.check()
    },
    computed : {
        uninvitedUser(){
            const temp = []
            for(let i = 0; i < this.compareUser.length; i++){
                for(let j = 0; j < this.Users.length; j++){
                    if(this.Users[j].id != this.compareUser[i].UserId){
                        this.Users.splice(j, 1)
                        break
                    }
                }
            }
            console.log(this.Users)
            return this.Users
        }
    }
}
</script>

<style>

</style>