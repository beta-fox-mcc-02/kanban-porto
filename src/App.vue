<template>
<div class="container">
    <NavbarComponent></NavbarComponent>
    <LoginForm v-if="!hasToken"></LoginForm>
    <RegisterForm v-if="!hasToken"></RegisterForm>
    <KanbanBoard></KanbanBoard>
</div>
</template>

<script>
import LoginForm from './components/LoginForm';
import NavbarComponent from './components/NavbarComponent';
import RegisterForm from './components/RegisterForm';
import KanbanBoard from './components/KanbanBoard';

export default {
    name: 'Kanban',
    components: {
        NavbarComponent,
        LoginForm,
        RegisterForm,
        KanbanBoard
    },
    data () {
        return {
            token: localStorage.getItem('access_token')
        }
    },
    computed: {
        hasToken() {
            return this.token;
        }
    },
    methods: {
        logout: function() {
            localStorage.clear();
        }
    }
}
</script>
