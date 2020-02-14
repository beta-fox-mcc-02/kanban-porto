<template>
    <nav class="navbar">
        <div id="addTask-btn" href="" @click.prevent="showAddTask">
            <h4>Add Task</h4>
        </div>
            <div id="title" href="" @click.prevent="showHome">
            <h4>Kanban</h4>
            </div>
        <div id="options" href="" @click.prevent="logout">
            <h4>Log Out</h4>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'kanBar',
    data: () => {
        return {

        }
    },
    methods: {
        showAddTask() {
            this.$emit('changePage', 'addTask')
        },
        showHome() {
            this.$emit('changePage', 'contentPage')
        },
        logout() {
            localStorage.clear()
            this.$emit('changePage', 'login')
        }
    }
}
</script>

<style>

</style>