<template>
  <div class="mb-2 all-cards">

    <!-- looping cards begin -->
    <div class="my-1 card" v-for="task in completes" :key="task.id">
    <div class="p-1 card-body">
        <div class="title-container">
        <p class="m-0 card-title">{{ task.title }}</p>
        </div>
        <div class="description-container">
        <p class="card-text">{{ task.description }}</p>
        </div>
        <div class="action-container">
            <div>
                <i class="m-1 fas fa-pencil-alt" @click="editCardForm(task.id)"></i>
                <i class="m-1 far fa-trash-alt" @click="deleteCard(task.id)"></i>
            </div>
            <div>
                <i class="fa fa-arrow-left" aria-hidden="true" @click.prevent="editCategory(task.id, task.CategoryId, 'left')"></i>
            </div>
        </div>
    </div>
    </div>
    <!-- looping cards end -->

    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'Complete',
    props: {
        completes: Array
    },
    data() {
        return {
            categoryId: null,
            move: ''
        }
    },
    methods: {
        editCardForm(id) {
            this.$emit('editCardForm', id)
        },
        deleteCard(id) {
            this.$emit('deleteCard', id)
        },
        editCategory(id, catId, moveTo) {
            this.categoryId = catId
            this.move = moveTo

            if (this.move === 'right') {
                this.categoryId++
            } else if (this.move === 'left') {
                this.categoryId--
            }

            axios({
                method: 'PUT',
                url: `/tasks/${id}`,
                data: {
                    CategoryId: this.categoryId
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.$emit('fetchCategories')
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }
    }
}
</script>