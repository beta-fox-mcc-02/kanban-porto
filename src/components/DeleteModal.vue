<template>
  <div id="modal-delete" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="closeModal" class="close">&times;</span>
        <h5>Delete Confirmation</h5>
      </div>
      <div class="modal-body">
        <p>Are you sure want to delete this data ?</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="closeModal"
          id="btn-close-modal"
          class="btn btn-secondary"
        >Close</button>
        <a id="delete-task" @click="deleteTask" class="btn btn-danger color-white">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  methods: {
    closeModal() {
      this.$emit("closeModalDelete", false);
    },
    deleteTask() {
      this.$emit("deleteTask");
    }
  }
};
</script>