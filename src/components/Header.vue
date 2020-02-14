<template>
    <nav>     
        <div class="nav-wrapper">
            <a href="#" class="brand-logo">
                <img src="../../assets/img/logo/kanban-logo.png" alt="Kanban">
            </a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <div class="navbar-container">
                    <div v-if="isLogin" id="logged-user-navbar">
                        <li>
                            <a href="#" class="dropdown-trigger" data-target="dropdown1">
                            {{getUserName}}
                            <i class="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </div>
                    <div v-else id="no-user-navbar">
                        <li id="sign-up-btn" @click="toRegister"><a href="#">Sign Up</a></li>
                        <li id="sign-in-btn" @click="toLogin"><a href="#">Sign In</a></li>
                    </div>
                </div>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    nama: 'Navbar',
    props: {
        isLogin: Boolean,
        user: Object
    },
    computed: {
        getUserName() {
            return this.user.name
        },
        getUserAvatar() {
            return `https://robohash.org/${this.user.name}?set=set4`
        }
    },
    methods: {
        toLogin() {
            this.$emit('toLogin')
        },
        toRegister() {
            this.$emit('toRegister')
        },
    }

}
</script>