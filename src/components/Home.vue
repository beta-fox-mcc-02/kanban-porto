<template>
  <div class="kanbanBoard">
    <CategoryCard
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @editTask="editTask"
      @currentPage="currentPage"
      @updateStatus="updateStatus"
    ></CategoryCard>
  </div>
</template>

<script>
import CategoryCard from "./CategoryCard";
export default {
  name: "Home",
  data: () => {
    return {
      categories: []
    };
  },
  components: {
    CategoryCard
  },
  methods: {
    fetchCategories() {
      axios({
        method: "GET",
        url: "https://guarded-depths-33701.herokuapp.com/categories",
        headers: { token: localStorage.token }
      })
        .then(response => {
          console.log(response.data, "============");
          this.categories = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showEditTask() {
      this.$emit("showEditTask", "editTask");
    },
    editTask(data) {
      this.$emit('ubahTask', data)
    },
    currentPage(page) {
      this.$emit('thisPage', 'editTask')
    },
    updateStatus() {
      this.categories = [];
      this.fetchCategories();
    }
  },
  created() {
    this.categories = [];
    this.fetchCategories();
  }
};
</script>

<style>
</style>