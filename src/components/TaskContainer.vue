<template>
  <!-- content -->
    <div class="row center" style="width: 90%;" id="content" >
      <div class="col s12">
        <div class="row center" id="kanban" style="margin-top:3rem;">
          <div class="col s3" id="backlog">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Backlog</p>
              </div>
            </nav>
            <TaskCard
              v-for="task in backlog"
              :key="task.id"
              :task="task"
              @showContent="showContent"
              @notification="notification"
              @updateModalToggle="updateModalToggle"
              @getTask="getTask"
            ></TaskCard>
          </div>
          <div class="col s3" id="todo">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Todo</p>
              </div>
            </nav>
            <TaskCard
              v-for="task in todo"
              :key="task.id"
              :task="task"
              @showContent="showContent"
              @notification="notification"
              @updateModalToggle="updateModalToggle"
              @getTask="getTask"
            ></TaskCard>
          </div>
          <div class="col s3" id="ongoing">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Ongoing</p>
              </div>
            </nav>
            <TaskCard
              v-for="task in ongoing"
              :key="task.id"
              :task="task"
              @showContent="showContent"
              @notification="notification"
              @updateModalToggle="updateModalToggle"
              @getTask="getTask"
            ></TaskCard>
          </div>
          <div class="col s3" id="done">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Done</p>
              </div>
              </nav>
              <TaskCard
              v-for="task in done"
              :key="task.id"
              :task="task"
              @showContent="showContent"
              @notification="notification"
              @updateModalToggle="updateModalToggle"
              @getTask="getTask"
            ></TaskCard>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import TaskCard from './TaskCard'
export default {
  name: "TaskContainer",
  data() {
    return {

    }
  },

  props: {
    tasks: Array
  },

  components: {
    TaskCard
  },

  methods: {
    showContent() {
      this.$emit('showContent')
    },

    notification(err, success) {
      this.$emit('notification', err, success)
    },

    updateModalToggle(){
      this.$emit('updateModalToggle')
    },

    getTask(payload){
      this.$emit('getTask', payload)
    }
  },
  
  computed: {
    backlog (CategoryId) {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 1) arr.push(task)
        });
      return arr
      }
    },

    todo () {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 2) arr.push(task)
        });
      return arr
      }
    },

    ongoing () {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 3) arr.push(task)
        });
      return arr
      }
    },

    done () {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 4) arr.push(task)
        });
      return arr
      }
    }
  }
  
}
</script>

<style>

</style>