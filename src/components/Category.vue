<template>
    <div class="col-3 mt-3" style="background-color: rgba(255,255,255,0.4);">
        <h3 class="text-center mt-2 text-white">{{category.name}}</h3>
        <TaskCard 
                v-for="task in tasks" 
                v-bind:key="task.id"
                v-bind:task="task"
                @editTask="editTask"
                @createTask="createTask"
                @forwardTask="forwardTask"
        ></TaskCard>
    </div>
</template>

<script>
import TaskCard from './TaskCard';
export default {
    name: "Category",
    data() {
        return {
            tasks: []
        }
    },
    props: {
        category: Object
    },
    components: {
        TaskCard
    },
    methods: {
        getTask(){
            axios({
                method: "get",
                url: "http://localhost:3000/board/" + this.category.id + "/tasks",
                headers: {
                    "token" : localStorage.token
                }
            })
                .then(result => {
                    console.log(result);
                    
                    this.tasks = result.data.data;
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        },
        editTask(id) {
            this.$emit('editTask', id);
        },
        createTask() {
            this.$emit('createTask');
        },
        forwardTask(id, category) {
            axios({
                method: "patch",
                url: "http://localhost:3000/board/" + id + '/next',
                headers: {
                    "token" : localStorage.token
                },
                data: {
                    CategoryId : category
                }
            })
                .then(result => {
                    // this.title = result.data.data.title;
                    console.log(result);
                    this.$emit('updateData');
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        }
    },
    created() {
        this.tasks = []
        this.getTask();
    }
}
</script>

<style>

</style>