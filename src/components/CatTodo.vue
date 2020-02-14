<template>
  <div class="mb-2 all-cards">

    <!-- looping cards begin -->
    <div class="my-1 card" v-for="task in todos" :key="task.id">
    <div class="p-1 card-body">
        <div class="title-container">
        <p class="m-0 card-title">{{ task.title }}</p>
        </div>
        <div class="description-container">
        <p class="card-text">{{ task.description }}</p>
        </div>
        <div class="action-container">
        <i class="m-1 fas fa-pencil-alt" @click="editCardForm(task.id)"></i>
        <i class="m-1 far fa-trash-alt" @click="deleteCard(task.id)"></i>
        </div>
    </div>
    </div>
    <!-- looping cards end -->

    </div>
</template>

<script>
export default {
    name: 'Todo',
    props: {
        todos: Array
    },
    data() {
        return {

        }
    },
    methods: {
        editCardForm(id) {
            this.$emit('editCardForm', id)
        },
        deleteCard(id) {
            this.$emit('deleteCard', id)
        }
    }
}
</script>