<template>
          <!-- Task Page -->
          <section>
            <br><br>
            <center>
              <div class="container">
                <div class="card card-signup z-depth-0">
                  <div class="card-header text-left">
                    <a class="btn btn-success text-light" data-toggle="modal" data-target="#createCategory">Add Category</a>
                    <div class="modal fade" id="createCategory" tabindex="-1" role="dialog" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content" style="width: 50%;">
                          <div class="card card-signup z-depth-0 text-center">
                            <div class="card-body">
                              <form @submit.prevent="addCategory">
                                <div class="form-group">
                                    <label for="name">Category name</label>
                                    <input type="text" v-model="categoryName" name="categoryName" class="form-control" placeholder="input Category" required>
                                </div>
                                <button type="submit" class="btn btn-primary text-light">Add Category</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a class="btn btn-warning text-primary" @click="backToOrg">List Organization</a>
                    <search class="text-right" @read='readTask'></search>
                  </div>
                  <div class="card-body text-left">
                    <div class="row my-4">
                      <div class="col mb-4" v-for="board in boards" :key="board.OrganizationId" >
                        <div class="card">
                          <div class="card-header bg-success text-light">
                            <label>{{board.name}}</label>
                          </div>
                          <div class="card-body text-left" style="padding: 0.2rem">
                            <CreateTask 
                            :id='board.id'
                            @read='readTask'
                            class="text-right text-dark">
                            </CreateTask>
                          </div>
                          <div class="card-body" v-for="task in filterTask(board.id)" :key="task.id">
                            <div class="card text-left" >
                              <div class="card-header">
                                <label>{{task.title}}</label>
                              </div>
                              <div class="card-body">
                                <label>{{task.description}}</label>
                              </div>
                              <div class="card-footer text-center" style="padding: 0.1rem">
                                <a class="btn text-warning" ><i class="fas fa-angle-double-left"></i></a>
                                <a class="btn text-danger" @click='deleteTask(task.id)'><i class="fa fa-trash" aria-hidden="true"></i></a>
                                <a class="btn text-success" ><i class="fas fa-angle-double-right"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </center>
          </section>
</template>

<script>
import axios from 'axios'
import CreateTask from './subComponents/taskForm'
import Search from './subComponents/searchUser'
export default {
  data () {
    return {
        boards : [],
        tasks : [],
        categoryName : '',
        taskName : '',
        taskDescription : ''
    }
  },
  components : {
    CreateTask,
    Search
  },
  methods : {
    deleteTask(id){
      axios.delete(`http://localhost:3000/tasks/${id}`, {
          headers : {
            token : localStorage.token
          }
      })
      .then(res => {
        this.readTask()
        this.readCategory()
      })
      .catch(err => {
        console.log(err)
      })
    },
    filterTask(id){
      const task = []
      this.tasks.forEach(el => {
        if(el.id === id){
          el.Tasks.forEach(els => {
            const temp = {
              id : els.id,
              title : els.title,
              description : els.description
            }
            task.push(temp)
          })
        }
      });
      return task
    },
    readTask(){
      axios.get('http://localhost:3000/tasks', {
            headers : {
                token : localStorage.token,
                id : localStorage.id
            }
      })
      .then(({data}) => {
        this.tasks = data.result
        console.log(this.tasks)
      })
      .catch(err => {
        console.log(err)
      })
    },
    backToOrg(){
      this.$emit('currentPage', 'mainPage')
    },
    addCategory(){
        axios.post('http://localhost:3000/tasks/category',{
            category : this.categoryName
        },
        {
            headers : {
                token : localStorage.token,
                id : localStorage.id
            }
        })
        .then(({data}) => {
            console.log(data)
            this.readCategory()
        })
    },
    readCategory(){
      console.log('masuuuk')
        axios.get('http://localhost:3000/tasks/category', {
            headers : {
                token : localStorage.token,
                id : localStorage.id
            }
        })
        .then(({data}) => {
          console.log(data.result)
            this.boards = data.result
        })
    }
  },
  created () {
    this.readCategory()
    this.readTask()
  },
  computed : {
    
  }
}
</script>

<style>

</style>