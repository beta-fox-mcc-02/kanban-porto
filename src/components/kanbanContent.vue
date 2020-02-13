<template>
  <div class="card my-3">
    <h5 class="card-header">
      {{ task.title }}
    </h5>
    <div class="card-body">
      <div class="card-title">Assignee : {{ task.assignee }}</div>
      <div class="card-text mb-4">
        {{ task.desc }}
      </div>
    </div>
    <div class="card-footer text-center">
      <button
        class="btn-sm m-2"
        v-if="box.name !== 'backLog'"
        @click="updateCardBackward(task.id)"
      >{{ prevButton }}</button>
 
      <button
        class="btn-sm btn-primary m-2"
        v-if="box.name !== 'Done'"
        @click.prevent="updateCardForward(task.id)"
      >
        {{ nextButton }}
      </button>
    </div>
    <button class="btn-sm btn-danger m-2" @click="deleteCard(task.id)">
      Delete Task
    </button>
  </div>
</template>

<script>
import axios from "../api/axiosInstance";
name: "kanbanContent";
export default {
  data() {
    return {};
  },
  props: {
    task: Object,
    box: Object
  },
  methods: {
    deleteCard(id){
       axios({
        method:'delete',
        url:`/task/${id}`,
      })
      .then(({data})=>{
        // console.log(data);

      })
      .catch(err=>{
        console.log(err);
      })
    },
    updateCardForward(id){

      let status
      if(this.box.name == 'backLog'){
        status = 'Todo'
      }else if(this.box.name == 'Todo'){
        status = 'Doing'
      }else if(this.box.name == 'Doing'){
        status = 'Done'
      }

      axios({
        method:'put',
        url:`/task/${id}`,
        data:{
          status: status
        }
      })
      .then(({data})=>{
        // console.log(data);

      })
      .catch(err=>{
        console.log(err);

      })
    },
    updateCardBackward(id){
        let status
      if(this.box.name == 'Done'){
        status = 'Doing'
      }else if(this.box.name == 'Doing'){
        status = 'Todo'
      }else if(this.box.name == 'Todo'){
        status = 'backLog'
      }

      // console.log(id, 'sama ', status);
      
      axios({
        method:'put',
        url:`/task/${id}`,
        data:{
          status: status
        }
      })
      .then(({data})=>{
        // console.log(data);

      })
      .catch(err=>{
        console.log(err);

      })
    }
  },
  computed: {
    nextButton() {
      if (this.box.name == "backLog") {
        return "Todo";
      } else if (this.box.name == "Todo") {
        return "Doing";
      } else if (this.box.name == "Doing") {
        return "Done";
      }
    },
    prevButton() {
      if (this.box.name == "Todo") {
        return "backLog";
      } else if (this.box.name == "Doing") {
        return "Todo";
      } else if (this.box.name == "Done") {
        return "Doing";
      }
    },
    getColor() {
      return {
        "background-color": this.box.color
      };
    }
  }
};
</script>

<style></style>
