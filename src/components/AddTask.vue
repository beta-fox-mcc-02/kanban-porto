<template>
    <div id="addTask">
        <form @submit.prevent="addTask">
            <h3>Add Task</h3>
            <div class="form-group">
            <h4>Title</h4>
            <input
                v-model="title"
                id="add-title"
                type="text"
                class="form-control"
                style="width: auto;"
            />
            </div>
            <div class="form-group">
            <h4>Description</h4>
            <textarea v-model="description" id="add-description" rows="4" cols="50"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>

export default {
    name: 'AddTask',
    data: () => {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        addTask() {
            const token = localStorage.token
            axios({
                method: 'POST',
                url: 'https://guarded-depths-33701.herokuapp.com/tasks',
                headers: { token },
                data: {
                    title: this.title,
                    description: this.description
                }
            })
            .then(response => {
                this.$emit('showContent', 'contentPage')
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    },
    created() {
        
    }
};
</script>

<style>
</style>