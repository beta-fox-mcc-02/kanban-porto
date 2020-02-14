<template>

  <div class="row newpost">
      <div class="col">
          <h1>Add New Kanban</h1>
      </div>
      <div class="col-12">
          <div class="card-text-center">
              <div class="card-header">Add New Kanban</div>
              <div class="card-body">
                  <div class="cardcontent nopadding">
                      <form method="post" v-on:submit.prevent="addKanban">
                          <div class="row">
                              <div class="col">
                                  <input
                                    v-model="title"
                                    type="text"
                                    style="width: 100%;"
                                    placeholder="Pleace enter the title here"
                                    >
                              </div>
                          </div>
                          <div class="row">
                              <div class="col">
                                  <input
                                    v-model="title"
                                    type="text"
                                    style="width: 100%;"
                                    placeholder="Pleace enter the title here"
                                    >
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return{
            
        }
    }
}
</script>

<style>

</style>