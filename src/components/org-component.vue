<template>
          <!-- Main Page -->
          
              <!-- <center>
                  <h1>HELLO WORLD!</h1>
              </center> -->
              <div>
                <br>
                <div class="container">
                  <div class="row">
                    <div class="col-sm"></div>
                    <div class="col-sm">
                      <div class="card card-signup z-depth-0">
                        <div class="card-header">
                          <a class="btn btn-success text-light" data-toggle="modal" data-target="#orgForm">Add Organization</a>
                          <div class="modal fade" id="orgForm" tabindex="-1" role="dialog" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header bg-info">
                                      <label class="text-light">Your List Invitation</label> 
                                    </div>
                                    <div class="modal-body">
                                      <div class="card-body">
                                        <form id="orgForm" @submit.prevent="addOrg">
                                            <div class="form-group">
                                                <label for="name">Name your Organization</label>
                                                <input type="text" v-model="orgName" name="orgName" class="form-control" placeholder="input your organization" required>
                                            </div>
                                            <button type="submit" class="btn btn-primary text-light" >Add Organization</button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <Invitation class="text-right" @org='listOrganization'></Invitation>
                        </div>
                        <div class="card-body">
                          <table class="table text-center">
                            <thead>
                              <th>Your Organization</th>
                            </thead>
                            <tbody>
                              <tr v-for='org in myOrg' :key="org.id">
                                <td class="btn" @click='readCategory(org.id, org.name)'>{{org.name}}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="card-footer">
                        </div>
                      </div>
                    </div>
                    <div class="col-sm"></div>
                  </div>
                </div>
              </div>
          
</template>

<script>
import axios from 'axios'
import Invitation from './subComponents/invitationList'
export default {
  data () {
    return {
        myOrg : [],
        orgName : '',
        board : [],
        categoryName : '',
    }
  },
  components : {
    Invitation
  },
  methods : {
        listOrganization (){
            this.$emit('currentPage', 'mainPage')
            axios.get('https://quiet-depths-10928.herokuapp.com/organizations', {
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                // console.log(data)
                this.myOrg = data
                // data.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addOrg(){
            axios.post('https://quiet-depths-10928.herokuapp.com/organizations/creates', {
                name : this.orgName
            },
            {
                headers : {
                    token : localStorage.token
                }
            })
            .then(res => {
                this.listOrganization()
                this.orgName = ''
            })
            .catch(err => {
                console.log(err)
            })
        },
        readCategory(id, name){
            axios.get('https://quiet-depths-10928.herokuapp.com/tasks/category', {
                headers : {
                    token : localStorage.token,
                    id
                }
            })
            .then(({data}) => {
                localStorage.id = id
                localStorage.name = name
                this.$emit('currentPage', 'taskPage')
            })
        },
  },
  created () {
    this.listOrganization()
    this.addOrg()
  }
}
</script>

<style>

</style>