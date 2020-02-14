<template>
    <div class="col-md-3 mb-4" v-if="page == 'project'" :id="box.name">
    <div class="container p-3 rounded-top" :style="getColor">
      <h3 class="mb-0">{{ box.name }}</h3>
    </div>
    <div class="container border rounded-bottom">
      <!-- {{filterin}} -->
      <draggable 
      :move="checkMove"
       group="people" @start="drag=true" @end="drag=false">
      <kanbanContent
       v-for="task in getStatus" :key="task.id"
        :task="task"
        :box="box"
       />
      <kanbanContent/>
    </draggable>

    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import kanbanContent from '../components/kanbanContent'
name: 'kanbanCard'
export default {
data(){
  return{
    testArray:[]
  }
},
props:{
  filterin: Array,
  box:Object,
  page:String
},
methods:{
  checkMove: function(evt){
    console.log(evt, 'ini evt');
    
    // return (evt.draggedContext.element.name!=='apple');
}
},
components:{
  kanbanContent,
  draggable
},
computed:{
  getStatus(){
    this.testArray = this.filterin.filter(i => i.status == this.box.name);
      return this.testArray 
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