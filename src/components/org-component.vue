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
                      <div class="card card-signup z-depth-0" style="opacity: 0.7;">
                        <div class="card-header">
                          <a class="btn btn-success text-light" data-toggle="collapse" data-target="#orgForm" aria-expanded="false" aria-controls="orgForm">Add Organization</a>
                          <div class="card-body">
                            <form id="orgForm" @submit.prevent="addOrg">
                                <div class="form-group">
                                    <label for="name">Name your Organization</label>
                                    <input type="text" v-model="orgName" name="orgName" class="form-control" placeholder="input your organization" required>
                                </div>
                                <button type="submit" class="btn btn-primary text-light">Add Organization</button>
                            </form>
                          </div>
                        </div>
                        <div class="card-body">
                          <table class="table">
                            <tbody>
                              <tr v-for='org in myOrg' :key="org.id">
                                <td class="btn btn-light" @click='readCategory(org.id)'>{{org.name}}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="card-footer">
                          <a class="btn text-primary">Invitation</a>
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
export default {
  data () {
    return {
        myOrg : [],
        orgName : '',
        board : [],
        categoryName : '',
    }
  },
  methods : {
        listOrganization (){
            this.$emit('currentPage', 'mainPage')
            axios.get('http://localhost:3000/organizations', {
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.myOrg = data
                // data.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addOrg(){
            axios.post('http://localhost:3000/organizations/creates', {
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
        readCategory(id){
            axios.get('http://localhost:3000/tasks/category', {
                headers : {
                    token : localStorage.token,
                    id
                }
            })
            .then(({data}) => {
                localStorage.id = id
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