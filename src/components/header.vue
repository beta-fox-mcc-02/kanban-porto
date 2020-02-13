<template>
    <header>
        <nav id="upperbar">
            <div class="upperbar-menu">LOGO</div>
            <div class="upperbar-menu">MENUS</div>
            <div class="upperbar-menu"><button id="logout" v-on:click="logout">Logout</button></div>
        </nav>
    </header>
</template>

<script>
export default {
    data() { return {} },
    methods: {
        logout() { this.$emit('changePage', { page: `register` }) }
    }
}
</script>