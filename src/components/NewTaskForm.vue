<template>
    <div id="new-task-form">
        <div class="row">
            <form class="col s12" @submit.prevent="newTaskSubmit(orgId)">
                <div class="row">
                    <div class="form-title card-title center-align activator">
                        New Task
                    </div>
                    <div class="alert card-text center-align activator">
                        {{message}}
                    </div>
                    <div class="input-field col s12">
                        <input id="new-task-title" type="text" class="validate" v-model="title">
                        <label for="title">Title</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="new-task-description" class="materialize-textarea" v-model="description"></textarea>
                        <label for="description">Description</label>
                    </div>
                    <div class="submit-container">
                        <button class="btn waves-effect waves-light form-submit" type="submit" name="action">
                            Add
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
        orgId: Number
    },
    data: () => {
        return {
            title: '',
            description: '',
            message: ''
        }
    },
    methods: {
        newTaskSubmit(orgId) {
            axios({
                method: 'POST',
                url: `https://kanban-day.herokuapp.com/organization/${orgId}/task`,
                data: {
                    title: this.title,
                    description: this.description
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('addTaskSuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        }
    }
}
</script>