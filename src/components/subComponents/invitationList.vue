<template>
  <div>
      <a class="btn btn-primary text-light" data-toggle="modal" data-target="#list" @click='list'><i class="fa fa-bullhorn" aria-hidden="true"></i></a>
      <div class="modal fade" id="list" tabindex="-1" role="dialog" aria-hidden="true" style="opacity: 1;">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header bg-info">
                  <label class="text-light">Your List Invitation</label> 
                </div>
                <div class="modal-body">
                  <table class="table text-center">
                      <thead>
                          <th>Organization</th>
                          <th>Option</th>
                      </thead>
                      <tbody>
                          <tr v-for="user in invitation" :key="user.id">
                              <td>{{user.organization}}</td>
                              <td>
                                  <a class="btn" @click="accept(user.UserId, user.organization)" data-dismiss="modal"><i class="fa fa-check" aria-hidden="true"></i></a>
                                  <a class="btn" @click="refuse(user.id)" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i></a>
                              </td>
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
            invitation : []
        }
    },
    methods : {
        refuse(id){
            axios.delete('http://localhost:3000/refuse', {
                id
            },{
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                this.$emit('org')
            })
            .catch(err => {
                console.log(err)
            })
        },
        accept(id, name){
            axios.post('http://localhost:3000/accept', {
                id,
                name 
            }, {
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                this.list()
                this.$emit('org')
            })
            .catch(err => {
                console.log(err)
            })
        },
        list(){
            axios.get('http://localhost:3000/userInvitation', {
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                // console.log(data)
                this.invitation = data
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>