<template>
    <ul id="dropdown1" class="dropdown-content">
        <li @click="toOrganization"><a href="#">Organization</a></li>
        <li id="sign-out-btn" @click="signOut"><a href="#">Sign Out</a></li>
    </ul>
</template>

<script>
export default {
    name: 'DropdownMenu',
    props: {
        user: Object
    },
    methods: {
        toOrganization() {
            this.$emit('toOrganization')
        },
        signOut() {
            localStorage.clear()
            this.$emit('logout')
        }
    }
}
</script>