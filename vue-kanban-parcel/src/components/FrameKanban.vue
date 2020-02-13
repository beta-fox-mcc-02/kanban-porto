<template>
    <div class="frame">
        <FormRegistrationKanban  
            v-if="statusUser === 'notUser'" 
            @changePage="changePage"
        >
        </FormRegistrationKanban>

        <FormLoginKanban 
            v-if="statusUser === 'logout'" 
            @showFormRegistration="showFormRegistration"  
            @home="home"
        >
        </FormLoginKanban>

        <ListsKanban v-if="statusUser === 'login'"></ListsKanban>
    </div>
</template>

<script>

import FormRegistrationKanban from "./FormRegistrationKanban"
import FormLoginKanban from "./FormLoginKanban"
import ListsKanban from "./ListsKanban"

export default {
    name: "FrameKanban",
    components: {
        FormRegistrationKanban,
        FormLoginKanban,
        ListsKanban
    },
    props: {
        statusUser : String
    },
    methods: {
        showFormRegistration(){
            this.$emit('changePage', 'notUser')
        }, 
        changePage(status) {
            this.$emit('changePage', 'logout')
        },
        home(status){
            this.$emit('home', 'login')
        }
    }
}
</script>

<style>

</style>