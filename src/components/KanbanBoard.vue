<template>
    <div class='layout'>
        <TaskCategory 
       v-for="category in categories"
        :key="category.id"
        :category="category"
        >
        </TaskCategory>
    </div>
</template>

<script>
import TaskCategory from './TaskCategory';
import axios from 'axios';

export default {
    name: 'KanbanBoard',
    components: {
        TaskCategory
    },
    methods: {
        fetchCategory() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/category',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(result => {
                    this.categories = result.data;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    data() {
        return {
            categories: []
        }
    },
    created() {
        this.fetchCategory();
    }
}
</script>

<style>
.layout {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 20px;

}
</style>