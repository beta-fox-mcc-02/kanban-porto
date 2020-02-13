<template>
  <div>
        <div>
            <span class="content-tag" v-bind:style="task.tag === 'low priority' ? 'background-color: #3d92a2' : 'background-color: #b71b1b'"> {{ task.tag }} </span>
            <span class="content-title">{{task.title}}</span>
        </div>
        <span class="content-edit">
            <i class="fas fa-ellipsis-v" v-on:click="updateTask(task)"></i>
            <i class="far fa-trash-alt" v-on:click="deleteTask(task.id)"></i>
        </span>
  </div>
</template>

<script>
export default {
    name: 'MainCards-Child',
    props: {
        task: Object
    }
}
</script>

<style>

</style>