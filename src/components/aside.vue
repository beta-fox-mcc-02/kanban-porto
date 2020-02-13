<template>
    <div>
        <aside id="sidebar">
            <div>
                <button><i class="fas fa-users"></i></button>
                <small>Members</small>
            </div>
            <div>
                <button><i class="fas fa-plus-circle" v-on:click="showFormAdd"></i></button>
                <small>Add new task</small>
            </div>
        </aside>
    <AddTaskComponent v-on:changePage="changePage" v-if="currentPage === 'newtask'"></AddTaskComponent>
    </div>
</template>

<script>
import AddTaskComponent from './2ndTierComponents/add_newtask.vue'

export default {
    data() { 
        return {
            currentPage: ''
        } 
    },
    methods: {
        showFormAdd() { 
            this.currentPage = 'newtask'
        },
        changePage(fromChild) {
            this.currentPage = fromChild.page
            this.$emit('changePage', { page: fromChild.page })
        }
    },
    components: { AddTaskComponent }
}
</script>

<style>

</style>