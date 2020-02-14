<template>
    <div id="editTask">
        <form @submit.prevent="submitEdited(editTask.id)">
            <h3>Edit Task</h3>
            <div class="form-group">
            <h4>Title</h4>
            <input
                v-model="editTask.title"
                id="edit-title"
                type="text"
                class="form-control"
                style="width: auto;"
            />
            </div>
            <div class="form-group">
            <h4>Description</h4>
            <textarea v-model="editTask.description" id="edit-description" rows="4" cols="50"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>

export default {
    name: 'EditTask',
    data: () => {
        return {
            title: '',
            description: ''
        }
    },
    props: {
        editTask: Object
    },
    methods: {
        submitEdited(id) {
            const token = localStorage.token
            axios({
                method: 'PUT',
                url: 'http://localhost:3000/tasks/' + id,
                headers: { token },
                data: {
                    title: this.editTask.title,
                    description: this.editTask.description
                }
            })
            .then(response => {
                this.$emit('showContent', 'contentPage')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        
    }
};
</script>

<style>
</style>