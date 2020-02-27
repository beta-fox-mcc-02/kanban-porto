<template>
  <div class="card">
    <header class="card-header">
        <p class="card-header-title">
            {{ category.name }}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </a>
    </header>


    <TaskCard v-for="task in tasks" :key="task.id" :task="task" @updateStatus="updateStatus" @getTasks="getTasks" @editTask="editTask" @currentPage="currentPage">

    </TaskCard>

    
        
    </div>
</template>

<script>
import TaskCard from './TaskCard'
export default {
    name: 'CategoryCard',
    data() {
        return {
            tasks: [],
            taskData: {}
        }
    },
    props: {
        category: Object
    },
    components: {
        TaskCard
    },
    computed: {
        getTask() {
            let task = this.category.Tasks
            // console.log(task)
            return task
        }
    },
    methods: {
        fetchTasks(id) {
            axios({
            method: 'GET',
            url: 'https://guarded-depths-33701.herokuapp.com/categories/' + id + '/tasks',
            headers: { token: localStorage.token }
            })
            .then(response => {
                console.log(response.data, '============')
                this.tasks = response.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        editTask(data) {
            this.$emit('editTask', data)
            // this.taskData = data
            // console.log(data)

        },
        currentPage(page) {
            this.$emit('currentPage', 'editTask')
        },
        getTasks(id) {
            this.fetchTasks(id)
        },
        updateStatus() {
            this.$emit('updateStatus')
        }
    },
    created() {
        console.log(this.category.id)
        this.fetchTasks(this.category.id)
    }
}
</script>

<style>

</style>