<template>
  <div>
      <a class="btn btn-primary text-light" data-toggle="modal" data-target="#searchFriend" @click='allUser'>Invite</a>
      <div class="modal fade" id="searchFriend" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  User List
                </div>
                <div class="modal-body">
                  <table class="table text-center">
                      <tbody>
                          <tr v-for="user in Users" :key="user.id">
                              <td></td>
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
            Users : []
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
                console.log(data)
                Users = data.result
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created () {
        this.allUser()
    }
}
</script>

<style>

</style>