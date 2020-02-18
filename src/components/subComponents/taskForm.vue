<template>
  <div>
    <a class="btn btn-success" data-toggle="modal" :data-target="'#createTask'+id">+</a>
    <div class="modal fade" :id="'createTask'+id" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="width: 80%;">
          <div class="card card-signup z-depth-0 text-center ">
            <div class="card-body">
              <br>
              <form @submit.prevent="addTask">
                <div class="form-group">
                    <label for="name">Task name</label>
                    <input type="text" v-model="taskName" name="taskName" class="form-control" placeholder="input task title" required>
                </div>
                <div class="form-group">
                    <label for="name">Description</label>
                    <input type="text" v-model="taskDescription" name="taskDescription" class="form-control" placeholder="input description" required>
                </div>
                <button type="submit" class="btn btn-primary text-light">Add Task</button>
              </form>
              <br>
            </div>
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
        boards : [],
        tasks : [],
        categoryName : '',
        taskName : '',
        taskDescription : ''
        }
    },
    props : {
        id : Number
    },
    methods : {
        addTask(){
          const id = this.id
          // console.log(this.id)
          axios.post('https://quiet-depths-10928.herokuapp.com/tasks', {
            title : this.taskName,
            description : this.taskDescription,
            CategoryId : id
          },
          {
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
        }
    },
    created () {
        // this.read
        // console.log(this.id)
    },
    computed : {
    }
}
</script>

<style>

</style>