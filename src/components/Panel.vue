<template>
  <div class="card bg-light" :id="panelId">
    <div class="card-body">
      <div class="mb-2 flex-row">
        <h6 class="card-title text-uppercase text-truncate py-2 align-self d-inline">{{ panelTitle }}</h6>
      </div>
      <div class="items border border-light" v-for="task in tasks" :key="task.id">
        <cardVue :task="task" class="m-1"></cardVue>
      </div>
      <button class="btn btn-light btn-block add-task">Add Task</button>
    </div>
  </div>

</template>

<script>
import cardVue from './Card';
import axios from 'axios';

export default {
  props: {
    panelTitle: String,
    panelId: Number
  },
  name: 'Panel',
  data(){
    return {
      tasks: []
    }
  },
  components: {
    cardVue
  },
  methods: {
    fetchData(){
      axios({
        method: 'GET',
        url: `http://localhost:3000/kanban/${this.panelId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          res.data.data.map(el => this.tasks.push({id: el.id, title: el.title}))
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created(){
    if(localStorage.access_token){
      this.fetchData()
    }
  }

}
</script>

<style scoped>

btn .add-task{
  height: 50px;
}
</style>