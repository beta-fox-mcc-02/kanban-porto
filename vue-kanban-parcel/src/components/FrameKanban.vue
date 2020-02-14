<template>
    <div class="frame">
        <FormRegistrationKanban  
            v-if="currentPage === 'registration'" 
            @changePage="changePage"
        >
        </FormRegistrationKanban>

        <FormLoginKanban 
            v-else-if="currentPage === 'logout'" 
            @showFormRegistration="showFormRegistration"  
            @home="home"
        >
        </FormLoginKanban>

        <ListsKanban 
            v-else-if="currentPage === 'login'"
            @showFormAdd="showFormAdd"
            @showEdit="showEdit"
        ></ListsKanban>

        <AddTaskKanban 
            v-else-if="currentPage === 'addTask'"
            @addedTask="addedTask"
        ></AddTaskKanban>

        <EditTaskKanban 
        v-else-if="currentPage === 'editTask'"
        :editData="editData"
        @home="home"
        ></EditTaskKanban>
    </div>
</template>

<script>

import FormRegistrationKanban from "./FormRegistrationKanban"
import FormLoginKanban from "./FormLoginKanban"
import ListsKanban from "./ListsKanban"
import AddTaskKanban from "./AddTaskKanban"
import EditTaskKanban from "./EditTaskKanban"


export default {
    name: "FrameKanban",
    data() {
        editData : {}
    },
    components: {
        FormRegistrationKanban,
        FormLoginKanban,
        ListsKanban,
        AddTaskKanban, 
        EditTaskKanban
    },
    props: {
        currentPage : String
    },
    methods: {
        showFormRegistration(){
            this.$emit('changePage', 'registration')
        }, 
        changePage(status) {
            this.$emit('changePage', 'logout')
        },
        home(status){
            this.$emit('changePage', 'login')
        },
        showFormAdd(){
            this.$emit('changePage', 'addTask' )
        }, 
        addedTask(){
            this.$emit('changePage', 'login')
        },
        showEdit(editData){
            this.editData = editData
            this.$emit('changePage', 'editTask')
        }
    }
}

</script>

<style>

</style>