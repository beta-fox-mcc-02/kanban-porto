<template>
    <div>
        <RegisterComponent v-if="currentPage === 'register'" v-on:changePage="changePage"></RegisterComponent>
    </div>
    <!-- <header v-if="currentPage === 'member'">
        <nav id="upperbar">
            <div class="upperbar-menu">LOGO</div>
            <div class="upperbar-menu">MENUS</div>
            <div class="upperbar-menu"><button id="logout" v-on:click="logout">Logout</button></div>
        </nav>
    </header>
    <aside id="sidebar" v-if="currentPage === 'member'">
        <div>
            <button><i class="fas fa-users"></i></button>
            <small>Members</small>
        </div>
        <div>
            <button><i class="fas fa-plus-circle" v-on:click="showFormAdd"></i></button>
            <small>Add new task</small>
        </div>
    </aside> -->
    <!-- <main v-if="currentPage === 'member'">
        <section class="content-box" v-for="category in categories">
            <div class="content-header">
                <h3> {{ category.name }} </h3>
            </div>
            <div class="content-container">
                <div class="content-card" v-for="task in category.Tasks">
                    <div>
                        <span class="content-tag" v-bind:style="task.tag === 'low priority' ? 'background-color: #3d92a2' : 'background-color: #b71b1b'"> {{ task.tag }} </span>
                        <span class="content-title">{{task.title}}</span>
                    </div>
                    <span class="content-edit">
                        <i class="fas fa-ellipsis-v" v-on:click="updateTask(task)"></i>
                        <i class="far fa-trash-alt" v-on:click="deleteTask(task.id)"></i>
                    </span>
                </div>
            </div>
        </section>
    </main> -->
    <!-- ---------------------------------------------- REGISTER FORM ---------------------------------------------- -->
    <!-- <div class="register" v-if="currentPage === 'register'">
        <section id="register-header">
            <H1>WELCOME</H1>
            <small>Registration form</small>
        </section>
        <form id="register-form" v-on:submit.prevent="register">
            <div class="err-message">{{ errorMessage }}</div>
            <div id="register-main">
                <div>
                    <small>Name:</small>
                    <input id="register-name" type="text" autocapitalize="words" v-model="name">
                </div>
                <div>
                    <small>Email:</small>
                    <input id="register-email" type="email" v-model="email">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <div>
                    <small>Password:</small>
                    <input id="register-password" type="password" v-model="password">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <button id="register-btn" type="submit">Submit</button>
            </div>
        </form>
        <section id="register-footer">Have an account? <a id="redirect-to-login" v-on:click="redirect">Login</a></section>
    </div> -->
    <!-- ---------------------------------------------- REGISTER FORM ---------------------------------------------- -->
    <!-- ---------------------------------------------- LOGIN FORM ---------------------------------------------- -->
    <!-- <div class="login" v-if="currentPage === 'login'">
        <section id="login-header">
            <H1>WELCOME</H1>
            <small>Login form</small>
        </section>
        <form id="login-form" v-on:submit.prevent="login">
            <div class="err-message">{{ errorMessage }}</div>
            <div id="login-main">
                <div>
                    <small>Email:</small>
                    <input id="login-email" type="email" v-model="email">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <div>
                    <small>Password:</small>
                    <input id="login-password" type="password" v-model="password">
                    <i class="fas fa-exclamation-triangle" v-if="unfilledInput"></i>
                </div>
                <button id="login-btn" type="submit">Submit</button>
            </div>
        </form>
        <section id="login-footer">Not a member yet? <a id="redirect-to-register" v-on:click="redirect">Register</a></section>
    </div> -->
    <!-- ---------------------------------------------- LOGIN FORM ---------------------------------------------- -->
    <!-- ---------------------------------------------- ADDING TASK FORM ---------------------------------------------- -->
    <!-- <div class="add-task" v-if="currentPage === 'newtask'">
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
    </div> -->
    <!-- ---------------------------------------------- ADDING TASK FORM ---------------------------------------------- -->
</template>

<script>
import RegisterComponent from './components/register.vue'

export default {
    data() {
        return {
            currentPage: 'register'
        }
    },
    components: { RegisterComponent },
    methods: {
        changePage(page) {
            this.currentPage = page
        }
    },
    // created() {
    //     let access_token = localStorage.getItem('access_token')
    //     if(access_token) {
    //         this.currentPage = 'member'
    //         this.fetchAll()
    //     }
    // }
}
</script>

<style>

</style>