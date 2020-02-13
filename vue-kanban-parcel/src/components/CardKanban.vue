<template>
    <div>
        <header>{{ title.name }}</header>
        <ul>
            <FillCardKanban 
                class="card w-75" 
                v-for="(task, i) in getCategory"
                :key="i"
                :task="task"
            ></FillCardKanban>
        </ul>
        <footer>Add a card...</footer>
    </div>
</template>

<script>

import FillCardKanban from './FillCardKanban'

export default {
    name: "Cardkanban",
    props: {
        tasks: Array,
        title : Object
    }, 
    components: {
        FillCardKanban
    },
    methods: {
        fetchData(){
            this.tasks.filter(task => title.name)
        }
    },
    computed: {
        getCategory(){
            let taskByCategory = this.tasks.filter(task => task.Category.status === this.title.name)
            return taskByCategory
        }
    }
}
</script>

<style>

</style>