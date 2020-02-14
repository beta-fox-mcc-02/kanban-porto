<template>
  <div class="p-2 m-3 align-self-center form-container" id="form-container">
      <div class="d-flex justify-content-center title">
          <p>Add card</p>
      </div>
      <form class="form" v-on:submit.prevent="addCard">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" id="title" placeholder="title" v-model="title" required>
          </div>
          <div class="form-group">
              <label for="description">Description:</label>
              <textarea name="description" id="description" class="form-control" placeholder="Description" cols="30" rows="5" v-model="description" required></textarea>
          </div>
          <div class="d-flex align-items-end add-form-action">
              <button type="submit" class="mr-2 btn btn-dark">Add card</button>
              <p class="m-0" @click="closeAddForm">cancel</p>
          </div>
      </form>
    </div>
</template>

<script>
export default {
    name: 'AddCard',
    props: {
        categoryId: Number
    },
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        closeAddForm() {
            this.$emit('closeAddForm')
        },
        fetchCategoriesAfterAdd() {
            this.$emit('fetchCategoriesAfterAdd')
        },
        addCard() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/tasks',
                data: {
                    title: this.title,
                    description: this.description,
                    CategoryId: this.categoryId
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.$emit('fetchCategoriesAfterAdd')
                    this.$emit('closeAddForm')
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }
    }
}
</script>