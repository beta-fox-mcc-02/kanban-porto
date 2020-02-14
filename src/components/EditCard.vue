<template>
    <div class="p-2 m-3 align-self-center form-container">
        <div class="d-flex justify-content-center title">
            <p>Edit card</p>
        </div>
        <form class="form" @submit.prevent="editCard">
            <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" required 
                v-model="title"
            >
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea name="description" class="form-control" cols="30" rows="5" required 
                    v-model="description"
                ></textarea>
            </div>
            <div class="d-flex align-items-end add-form-action">
                <button type="submit" class="mr-2 btn btn-dark">Edit card</button>
                <p class="m-0" @click="closeEditForm">cancel</p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'EditForm',
    props: {
        dataEdit: Object
    },
    data() {
        return {
            taskId: this.dataEdit.id,
            title: this.dataEdit.title,
            description: this.dataEdit.description
        }
    },
    methods: {
        closeEditForm() {
            this.$emit('closeEditForm')
        },
        editCard() {
            let id = this.taskId

            axios({
                method: 'PUT',
                url: `http://localhost:3000/tasks/${id}`,
                data: {
                    title: this.title,
                    description: this.description
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.$emit('closeEditForm')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>