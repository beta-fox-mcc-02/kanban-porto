<template>
    <div class="add-task">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
        <section id="add-task-header">
            <H1>ADD NEW TASK HERE</H1>
        </section>
        <div class="err-message">{{ errorMessage }}</div>
        <form id="add-task-form" v-on:submit.prevent="addTask">
            <div id="add-task-main">
                <div>
                    <small>Task title:</small>
                    <input id="add-task-email" type="text" v-model="taskTitle">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <div>
                    <small>Task tag:</small>
                    <select class="tag-selection" v-model="taskTag">
                        <option>low priority</option>
                        <option>high priority</option>
                    </select>
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <button id="add-task-btn" type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    data() {
        return {
            taskTitle: '',
            taskTag: '',
            unfilledInput: false,
            errorMessage: '',
            isLoading: false,
            fullPage: true
        }
    },
    components: { Loading },
    methods: {
        addTask() {
            if(this.taskTitle && this.taskTag) {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false
                },1000)
                let token = localStorage.getItem('access_token')
                axios({
                    method: "POST",
                    url: "https://desolate-mountain-17477.herokuapp.com/task/create",
                    headers: { token },
                    data: {
                        title: this.taskTitle,
                        tag: this.taskTag
                    }
                })
                .then((result) => {
                    this.clearInputs()
                    this.$emit('changePage', { page: `member` })
                })
                .catch((err) => { this.errorMessage = `Title length is inapproriate (maximum 200 letter)` })
            }
            else {
                this.unfilledInput = true
                this.errorMessage = `Please fill in required inputs`
            }
        },
        clearInputs() {
            this.taskTitle = '',
            this.taskTag = '',
            this.unfilledInput = false
        },
        onCancel() {
            console.log(`cancel`)
        }
    }
}
</script>