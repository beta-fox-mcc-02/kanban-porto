<template>
    <div>
        <header>{{ title.name }}</header>
        <ul>
            <FillCardKanban 
                class="card w-75" 
                v-for="(task, i) in getCategory"
                :key="i"
                :task="task"
                @home="home"
                @fetch="fetch"
                @showEdit="showEdit"
                :title="title"
            ></FillCardKanban>
        </ul>
        <footer>  </footer>
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
        },
        fetch(){
            this.$emit('fetch')
        },
        showEdit(editData){
            this.$emit('showEdit', editData)
        },
        home(){
            this.$emit('home')
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