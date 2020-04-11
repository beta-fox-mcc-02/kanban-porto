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
            @error="error"
        >
        </FormLoginKanban>

        <ListsKanban 
            class="lists"
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

        <button
            v-if="currentPage === 'login'"
            class="addTask"
            @click="showFormAdd"
        >Add Task</button>
        <!-- <ErrorTaskKanban v-else-if="currentPage === 'error'"></ErrorTaskKanban> -->
    </div>
</template>

<script>

import FormRegistrationKanban from "./FormRegistrationKanban"
import FormLoginKanban from "./FormLoginKanban"
import ListsKanban from "./ListsKanban"
import AddTaskKanban from "./AddTaskKanban"
import EditTaskKanban from "./EditTaskKanban"
// import ErrorTaskKanban from "./ErrorTaskKanban"


export default {
    name: "FrameKanban",
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
        error(message){
            Toastify({
            text: message,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: 'left', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
            }).showToast()
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