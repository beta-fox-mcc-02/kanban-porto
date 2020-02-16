<template>
    <div class="container-fluid">
        <div class="col-12">
            <div class="row">
                <Category 
                    v-for="category in categories" 
                    v-bind:key="category.id"
                    v-bind:category="category"
                    @editTask="editTask"
                    @deleteTask="deleteTask"
                    @updateData="updateData">
                </Category>
            </div>
        </div>
    </div>     
</template>

<script>
import Category from './Category';
export default {
    name: "Kanban",
    data() {
        return {
            categories: []
        }
    },
    components: {
        Category
    },
    methods: {
        getCategories(){
            axios({
                method: "get",
                url: "http://localhost:3000/category",
            })
                .then(result => {
                    this.categories = result.data.data;
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        },
        editTask(id) {
            this.$emit('editTask', id);
        },
        deleteTask(id) {
            this.categories = []
            this.getCategories();
        },
        updateData() {
            this.categories = []
            this.getCategories();
        }
    },
    created() {
        this.categories = []
        this.getCategories();
    }
}
</script>

<style>

</style>