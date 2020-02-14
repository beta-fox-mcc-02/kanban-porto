<template>
  <div class="container-edit">
    <div class="edit-content">
      <center>
        <b>Edit</b>
        <hr width="20%" color="steelblue" />
        <form v-on:submit.prevent="editTask" method="post">
          <input
            type="text"
            name="title-edit"
            id="title-edit"
            placeholder="your title update...."
            class="input-text"
            v-model="title"
          />
          <span>{{ editId }}</span>
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
export default {
  name: "UpdateForm",
  data() {
    return {
      title: ""
    };
  },
  props: {
    editId: String
  },
  methods: {
    findOne(editId) {
      console.log(editId);
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "get",
        url: `http://localhost:3000/update/${id}`,
        headers: {
          access_token
        }
      })
        .then(response => {
          console.log(response);
          //   this.title = "kanban";
        })
        .catch(err => {
          console.log(err);
        });
    },
    editTask(id) {
      const title = this.task.title;
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "put",
        url: `http://localhost:3000/update/${id}`,
        data: {
          title: title,
          CategoryId: 1
        },
        headers: {
          access_token
        }
      })
        .then(response => {
          console.log(response);
          console.log("Backlog edited");
          this.page = "kanban";
        })
        .catch(err => {
          console.log(err);
        });
    },
    kanban() {
      this.$emit("changePage", "kanban");
    }
  },
  created() {
    if (localStorage) {
      this.findOne();
    } else {
      this.$emit("changePage", "login");
    }
  }
};
</script>

<style></style>
