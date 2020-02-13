<template>
  <div>
    <div class="card shadow-sm">
      <div class="card-body p-2">
        <div class="card-title" :id="task.id">
          <h6> {{ task.title }} </h6>
        </div>
        <small class="float-right">
          <a href="#"><i class="fas fa-edit"></i></a> |
          <a href="#"><i class="fas fa-trash-alt"></i></a>
          </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    task: Object
  },
  name: 'Card',
  data(){
    return {
      
    }
  }

}
</script>

<style scoped>


</style>