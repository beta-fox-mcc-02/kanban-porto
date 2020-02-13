<template>
  <!-- content -->
    <div class="row center" style="width: 90%;" id="content" >
      <div class="col s12">
        <div class="row center" id="kanban" style="margin-top:3rem;">
          <div class="col s3" id="backlog">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Backlog</p>
                <!-- <div class="right">
                  <a href="#" class="btn-floating red" id="add-backlog"><i class="material-icons">add</i></a>
                </div> -->
              </div>
            </nav>
            <div class="card hoverable" v-for="task in tasks" :key="task.id">
              <div class="card-content">
                <span class="card-title" id="title">{{task.title}}</span>
                <div class="row">
                  <div class="col s12">
                    <p id="description">{{task.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s3" id="todo">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Todo</p>
              </div>
            </nav>
          </div>
          <div class="col s3" id="ongoing">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Ongoing</p>
              </div>
            </nav>
          </div>
          <div class="col s3" id="done">
            <nav>
              <div class="nav-wrapper z-depth-3" id="backlog-nav">
                <p>Done</p>
              </div>
              </nav>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "TaskContainer",
  data() {
    return {

    }
  },

  props: {
    tasks: Array
  },

  methods: {
    
  },
  
}
</script>

<style>

</style>