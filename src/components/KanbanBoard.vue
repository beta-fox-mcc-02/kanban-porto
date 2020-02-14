<template>
    <div class="board-container container">
        <div class="center-align activator">
            {{message}}
        </div>
        <a @click="toAddTask" class="waves-effect waves-light btn-large s12 m6 l3">
            Add Task<i class="material-icons right">library_add</i>
        </a>
        <div class="row">
            <div class="col s12 m6 l3">
                <div id="backlog-column" class="t col s12">
                    <div class="card-title center-align activator">
                        Backlog
                    </div>
                    <div class="cards-column" v-for="{id, title, description, CategoryId} in backlogTasks" :key="id">
                        <div class="card">
                            <span class="card-title">
                                {{title}}
                            </span>
                            <span class="card-text">
                                {{description}}
                            </span>
                            <div class="task-actions">
                                <a href="#" @click="toUpdateTaskForm(id)"><i class="small material-icons">mode_edit</i></a>
                                <a href="#" @click.prevent="deleteTask(id)"><i class="small material-icons">delete</i></a>
                                <a href="#" @click.prevent="nextCategory(id, CategoryId)"><i class="small material-icons">navigate_next</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" col s12 m6 l3">
                <div id="product-column" class="t col s12">
                    <div class="card-title center-align">
                        Product
                    </div>
                    <div class="cards-column" v-for="{id, title, description, CategoryId} in productTasks" :key="id">
                        <div class="card">
                            <span class="card-title">
                                {{title}}
                            </span>
                            <span class="card-text">
                                {{description}}
                            </span>
                            <div class="task-actions">
                                <a href="#" @click.prevent="previousCategory(id, CategoryId)"><i class="small material-icons">navigate_before</i></a>
                                <a href="#" @click="toUpdateTaskForm(id)"><i class="small material-icons">mode_edit</i></a>
                                <a href="#" @click.prevent="deleteTask(id)"><i class="small material-icons">delete</i></a>
                                <a href="#" @click.prevent="nextCategory(id, CategoryId)"><i class="small material-icons">navigate_next</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 m6 l3">
                <div id="development-column" class="t col s12 ">
                    <div class="card-title center-align">
                        Development
                    </div>
                    <div class="cards-column" v-for="{id, title, description, CategoryId} in developmentTasks" :key="id">
                        <div class="card">
                            <span class="card-title">
                                {{title}}
                            </span>
                            <span class="card-text">
                                {{description}}
                            </span>
                            <div class="task-actions">
                                <a href="#" @click.prevent="previousCategory(id, CategoryId)"><i class="small material-icons">navigate_before</i></a>
                                <a href="#" @click="toUpdateTaskForm(id)"><i class="small material-icons">mode_edit</i></a>
                                <a href="#" @click.prevent="deleteTask(id)"><i class="small material-icons">delete</i></a>
                                <a href="#" @click.prevent="nextCategory(id, CategoryId)"><i class="small material-icons">navigate_next</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 m6 l3">
                <div id="done-column" class="t col s12 ">
                    <div class="card-title center-align">
                        Done
                    </div>
                    <div class="cards-column" v-for="{id, title, description, CategoryId} in doneTasks" :key="id">
                        <div class="card">
                            <span class="card-title">
                                {{title}}
                            </span>
                            <span class="card-text">
                                {{description}}
                            </span>
                            <div class="task-actions">
                                <a href="#" @click.prevent="previousCategory(id, CategoryId)"><i class="small material-icons">navigate_before</i></a>
                                <a href="#" @click="toUpdateTaskForm(id)"><i class="small material-icons">mode_edit</i></a>
                                <a href="#" @click.prevent="deleteTask(id)"><i class="small material-icons">delete</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'KanbanBoard',
    props: {
        orgId: Number,
        tasks: Array,
        members: Array
    },
    data: () => {
        return {
            message: ''
        }
    },
    computed: {
        backlogTasks() {
            let backlog = this.tasks.filter(task => task.CategoryId == 1)
            return backlog
        },
        productTasks() {
            let product = this.tasks.filter(task => task.CategoryId == 2)
            return product
        },
        developmentTasks() {
            let development = this.tasks.filter(task => task.CategoryId == 3)
            return development
        },
        doneTasks() {
            let done = this.tasks.filter(task => task.CategoryId == 4)
            return done
        }
    },
    methods: {
        toAddTask() {
            this.$emit('toNewTaskForm')
        },
        toUpdateTaskForm(id) {
            this.$emit('toUpdateTaskForm', id)
        },
        nextCategory(id, status) {
            axios({
                method: 'PATCH',
                url: `https://kanban-day.herokuapp.com/organization/${this.orgId}/task/${id}`,
                data: {
                    category_id: status + 1
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('changeCategorySuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        },
        previousCategory(id, status) {
            axios({
                method: 'PATCH',
                url: `https://kanban-day.herokuapp.com/organization/${this.orgId}/task/${id}`,
                data: {
                    category_id: status - 1
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('changeCategorySuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        },
        deleteTask(id) {
            axios({
                method: 'DELETE',
                url: `https://kanban-day.herokuapp.com/organization/${this.orgId}/task/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('deleteTaskSuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        }
    },
    created() {
        if(localStorage.access_token) {
            this.orgId,
            this.tasks,
            this.members
        }
    }

}
</script>

<style>

</style>