<template>
  <div class="p-2 m-3 align-self-center form-container" id="form-container">
      <div class="d-flex justify-content-center title">
          <p>Add card</p>
      </div>
      <form class="form" v-on:submit.prevent="addCardFunction">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" id="title" placeholder="title" v-model="title" required>
          </div>
          <div class="form-group">
              <label for="description">Description:</label>
              <textarea name="description" id="description" class="form-control" placeholder="Description" cols="30" rows="5" v-model="description" required></textarea>
          </div>
          <div class="d-flex align-items-center">
              <button id="btn-add-card" type="submit" class="mr-2 btn btn-dark">Add card</button>
          </div>
      </form>
    </div>
</template>

<script>
export default {
    name: 'AddCard',
    data() {
        return {
            title: '',
            description: ''
        }
    }
}
</script>