<template>
    <div id="update-task-form">
        <div class="row">
            <form class="col s12" @submit.prevent="updateTaskSubmit">
                <div class="row">
                    <div class="form-title card-title center-align activator">
                        Update Task
                    </div>
                    <div class="alert card-text center-align activator">
                        {{message}}
                    </div>
                    <div class="input-field col s12">
                        <input id="update-task-title" type="text" class="validate" v-model="title">
                        <label for="title">Title</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="update-task-description" class="materialize-textarea" v-model="description"></textarea>
                        <label for="description">Description</label>
                    </div>
                    <div class="input-field col s12">
                        <select class="select-option-input" v-model="category_id">
                            <option v-for="{text, value, i} in options" :value="value" :key="i">
                                {{text}}
                            </option>
                        </select>
                        <label>Category</label>
                    </div>
                    <div class="submit-container">
                        <button @click="toKanbanBoard" class="btn waves-effect waves-light form-submit" type="button" name="action">
                            <i class="material-icons right">keyboard_backspace</i>
                            Back
                        </button>
                        <button class="btn waves-effect waves-light form-submit" type="submit" name="action">
                            Edit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        orgId: Number,
        taskId: Number
    },
    data: () => {
        return {
            options: [
                {
                    text: 'Backlog',
                    value: 1
                },
                {
                    text: 'Product',
                    value: 2
                },
                {
                    text: 'Development',
                    value: 3
                },
                {
                    text: 'Done',
                    value: 4
                }
            ],
            title: '',
            description: '',
            category_id: 0,
        }
    },
    mounted: () => {
        $('select').formSelect();
    },
    methods: {
        getTaskData() {
            axios({
                method: 'GET',
                url: `http://localhost:3000/organization/${this.orgId}/task/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.title = data.title
                    this.description = data.description
                    this.category_id = data.category_id
                })
                .catch(err => {
                    this.message = err.response.data
                })
        },
        updateTaskSubmit() {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/organization/${this.orgId}/task/${this.taskId}`,
                data: {
                    title: this.title,
                    description: this.description,
                    category_id: this.category_id
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('updateTaskSuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        },
        toKanbanBoard() {
            this.$emit('toKanbanBoard')
        }
    },
    created() {
        this.getTaskData()
    }
}
</script>