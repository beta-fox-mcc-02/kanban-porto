<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Kanban Board</a>
            </div>
            <ul class="nav navbar-nav">
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <div v-if="hasToken">
                <li id="logout-navbar" @click="logout"><a href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                </div>
                <div v-else>
                <li id="sign-up-navbar"><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                <li id="login-navbar" ><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                </div>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavbarComponent",
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