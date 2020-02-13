<template>
    <div class="col-md-3 mb-4" v-if="page == 'project'">
    <div class="container p-3 rounded-top" :style="getColor">
      <h3 class="mb-0">{{ box.name }}</h3>
    </div>
    <div class="container border rounded-bottom">
      <!-- {{filterin}} -->
      <kanbanContent
       v-for="task in getStatus" :key="task.id"
        :task="task"
        :box="box"
       />
      <kanbanContent/>
    </div>
  </div>
</template>

<script>
import kanbanContent from '../components/kanbanContent'
name: 'kanbanCard'
export default {
data(){
  return{

  }
},
props:{
  filterin: Array,
  box:Object,
  page:String
},
components:{
  kanbanContent
},
computed:{
  getStatus(){
    let result = this.filterin.filter(i => i.status == this.box.name);
      return result
  },
  getColor(){
    return {
        "background-color": this.box.color,
      };
  }
}
}
</script>

<style>

</style>