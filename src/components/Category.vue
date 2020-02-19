<template>
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">{{category.name}}</div>
            <div id="tempat-card" class="isi-task">
                <Card class="issue" 
                    v-for="task in tasksOfUser" 
                    v-bind:key="task.id" 
                    :task="task"
                    @deleteTask="deleteTask"
                    @showEditForm="showEditForm"
                    @updateSucces="updateSucces">
                </Card>
            </div>
        </div>
</template>

<script>
import Card from './Card'

export default {
    name : "Categories",
    props : ['category', 'tasks'],
    components : {
        Card
    },
    data() {
        return {
            
        }
    },
    methods : {
        deleteTask() {
            this.$emit('deleteTask')
        },
        showEditForm(dataTaskToEdit) {
            this.$emit('showEditForm', dataTaskToEdit)
        },
        updateSucces() {
            this.$emit('updateSucces')
        }
    },
    computed : {
        tasksOfUser() {
            let output = []
            for (let j = 0; j < this.tasks.length; j++) {
                if (this.tasks[j].CategoryId === this.category.id) {
                    output.push(this.tasks[j])
                }
            }
            return output
        }
    }
}
</script>

<style>

</style>