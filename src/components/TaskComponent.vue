<template>
   <!-- <div class="task-wrapper">
    <a @click="updateTask" class="task-content">
      <div class="task-title">
        <span>{{ task.title }}</span>
        <div class="task-description" v-if="task.description">
          <i class="fa fa-tasks"></i>
        </div>
      </div>
    </a>
    <a @click="openModalDelete" class="delete-task">
      <i class="fa fa-trash"></i>
    </a>
  </div> -->
    <div class='list__card'>
        <label class='card__label'>{{ task.title }}</label>
        <div class='task_description'>{{task.description}} </div>
        <!-- <div class='card__date'>Jan 28th</div> nanti jadi link untuk delete task -->
    </div>
</template>

<script>
export default {
    name: 'TaskComponent',
    props:['task']
}
</script>

<style>
.list__card {
  background-color: ghostwhite;
  background: ghostwhite;
  display: grid;
  box-sizing: border-box;
  margin: 6px;
  border-radius: 4px;
  
  padding: 8px;
  
  transition: all .3s ease;
}
</style>