<template>
    <div :id="category.id" class="layout_list">
    <div :id="category.id" class="category_content">
      <div class="category_heading">{{ category.name }}</div>
    </div>
      <TaskComponent
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      ></TaskComponent>
  </div>
</template>

<script>
import axios from 'axios';
import TaskComponent from './TaskComponent';

export default {
    name: 'TaskCategory',
    components: {
        TaskComponent
    },
    props: ['category'],
    methods: {
        fetchTask: function() {
            axios({
                method: 'GET',
                url: `http://localhost:3000/task/category/${this.category.id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(result => {
                    this.tasks = result.data;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        createCategory: function() {
            
        }
    },
    data () {
        return {
            tasks: []
        }
    },
    created() {
        this.fetchTask();
    }
}
</script>

<style>
.layout_list {
  align-self: start;
  background-color: lightgray;
  display: grid;
  border-radius: 4px;
}
.category_content {
    padding: 4px;
    text-align: center
}
</style>