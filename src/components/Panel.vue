<template>
  <div class="card bg-light">
    <div class="card-body">
      <div class="mb-2 flex-row">
        <h6 class="card-title text-uppercase text-truncate py-2 align-self d-inline">Todo</h6>
        <div class="d-inline float-right">
          <a href="#">Edit</a> |
          <a href="#">Delete</a>
        </div>
      </div>
      <div class="items border border-light">
        <cardVue></cardVue>
        <div class="dropzone rounded" ondrop="" ondragover="" ondragleave="">&nbsp;</div>
        <cardVue></cardVue>
        <div class="dropzone rounded" ondrop="" ondragover="" ondragleave="">&nbsp;</div>
        <cardVue></cardVue>
        <div class="dropzone rounded" ondrop="" ondragover="" ondragleave="">&nbsp;</div>
      </div>
      <button class="btn btn-light btn-block">Add Task</button>
    </div>
  </div>

</template>

<script>
import cardVue from './Card';

export default {
  name: 'Panel',
  data(){
    return {

    }
  },
  components: {
    cardVue
  },
  methods: {
    fetchData(){
      console.log('fetchData');
    }
  },
  created(){
    console.log('ini dari panel');
    if(localStorage.access_token){
      this.fetchData()
    }
  }

}
</script>

<style>

</style>