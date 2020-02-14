<template>
  <div class="container-edit" v-else-if="page === 'edit'">
    <div class="edit-content">
      <center>
        <b>edit</b>
        <hr width="20%" color="steelblue" />
        <form v-on:submit.prevent="editTask" method="post">
          <input
            type="text"
            name="title-edit"
            id="title-edit"
            placeholder="your title update...."
            class="input-text"
            v-model="edit.title"
          />
          <br />
          <input type="submit" value="Add new backlog" class="button-primary" />
        </form>
        <button class="button-success" v-on:click="kanban">
          Back to kanban
        </button>
      </center>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
