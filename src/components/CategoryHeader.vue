<template>
  <div class="title-category">
    <div v-if="showEditCategory" class="input-category">
      <small v-if="error" class="error">{{ error }}</small>
      <div class="input-group mb-3">
        <input
          v-model="currentCategory"
          type="text"
          class="form-control"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button @click="editCategory()" class="btn btn-dark" type="button">Edit</button>
        </div>
      </div>
    </div>
    <h2 v-if="!showEditCategory">{{ currentCategoryDB }}</h2>
    <a @click="showModalDelete()" class="abs trash">
      <i class="fa fa-trash" aria-hidden="true"></i>
    </a>
    <a v-if="!showEditCategory" @click.prevent="toggleEdit" href class="abs">
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    </a>
    <button v-if="showEditCategory" @click="toggleEdit" type="button" class="close abs">
      <span aria-hidden="true">&times;</span>
    </button>

    <!-- modal -->
    <div v-if="showModal" class="modal-dialog modal-custom" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Are You Sure?</h5>
          <button @click="hideModalDelete()" type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            This will also delete all tasks in this category.
            <br>Continue?
          </p>
        <div class="modal-footer">
          <button @click="deleteCategory()" type="button" class="btn btn-primary">Continue</button>
          <button @click="hideModalDelete()" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditHeader",
  data() {
    return {
      error: "",
      showEditCategory: false,
      showModal: false,
      currentCategoryDB: "",
      currentCategory: ""
    };
  },
  props: {
    categoryNameProps: String,
    categoryIdProps: Number
  },
  methods: {
    toggleEdit() {
      if (this.showEditCategory) {
        this.showEditCategory = false;
      } else {
        this.showEditCategory = true;
      }
    },
    showModalDelete() {
      this.showModal = true;
    },
    hideModalDelete() {
      this.showModal = false;
    },
    editCategory() {
      this.error = "";
      axios({
        method: "put",
        url: `https://thawing-spire-40854.herokuapp.com/categories/${this.categoryIdProps}`,
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.currentCategory
        }
      })
        .then(response => {
          this.currentCategoryDB = this.currentCategory;
          this.toggleEdit();
        })
        .catch(error => {
          console.log(error.response.data.error);
          this.currentCategory = this.currentCategoryDB;
          this.error = error.response.data.error[0];
        });
    },
    deleteCategory() {
      axios({
        method: "delete",
        url: `https://thawing-spire-40854.herokuapp.com/categories/${this.categoryIdProps}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.showModal = false;
          this.$emit("fetchData");
        })
        .catch(error => {
          console.log(error.response.data.error);
          this.error = error.response.data.error[0];
        });
    }
  },
  created() {
    this.currentCategoryDB = this.categoryNameProps;
    this.currentCategory = this.currentCategoryDB;
  }
};
</script>
<style>
.trash {
  right: 30px !important;
}
.modal-custom {
  z-index: 999;
  position: absolute;
  top: 0;
}
.modal-body{
  padding: 0
}
.modal-body p {
  padding: 5px 15px;
  margin: 0;
  font-size: 14px
}
</style>
