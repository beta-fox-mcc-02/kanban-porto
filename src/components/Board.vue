<template>
  <div class="col-12 p-0 d-flex cards-container" v-if="isLogedIn">
      <div class="pl-2 my-1 cards-group">
        <p class="m-0 p-1 categori">Backlog</p>
        <div class="all-cards">

          <!-- looping cards begin -->
          <!-- <div class="my-1 card" v-for="task in tasks">
            <div class="p-1 card-body">
              <div class="title-container">
                <p class="m-0 card-title">{{ task.title }}</p>
              </div>
              <div class="description-container">
                <p class="card-text">{{ task.description }}</p>
              </div>
              <div class="action-container">
                <i class="m-1 fas fa-pencil-alt" v-on:click="editCardForm"></i>
                <i class="m-1 far fa-trash-alt"></i>
              </div>
            </div>
          </div> -->
          <!-- looping cards end -->

        </div>
        <div class="add-card">
          <!-- <p class="icon-add-card" v-on:click="addCardForm"> -->
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add a card
          </p>
        </div>
      </div>
      <div class="pl-2 my-1 cards-group">
        <p class="m-0 p-1 categori">Todo</p>
        <div class="all-cards">

          <!-- looping cards begin -->
          <!-- <div class="my-1 card" v-for="task in tasks">
            <div class="p-1 card-body">
              <div class="title-container">
                <p class="m-0 card-title">{{ task.title }}</p>
              </div>
              <div class="description-container">
                <p class="card-text">{{ task.description }}</p>
              </div>
              <div class="action-container">
                <i class="m-1 fas fa-pencil-alt" v-on:click="editCardForm"></i>
                <i class="m-1 far fa-trash-alt"></i>
              </div>
            </div>
          </div> -->
          <!-- looping cards end -->

        </div>
        <div class="add-card">
          <!-- <p class="icon-add-card" v-on:click="addCardForm"> -->
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add a card
          </p>
        </div>
      </div>
      <div class="pl-2 my-1 cards-group">
        <p class="m-0 p-1 categori">Done</p>
        <div class="all-cards">

          <!-- looping cards begin -->
          <!-- <div class="my-1 card" v-for="task in tasks">
            <div class="p-1 card-body">
              <div class="title-container">
                <p class="m-0 card-title">{{ task.title }}</p>
              </div>
              <div class="description-container">
                <p class="card-text">{{ task.description }}</p>
              </div>
              <div class="action-container">
                <i class="m-1 fas fa-pencil-alt" v-on:click="editCardForm"></i>
                <i class="m-1 far fa-trash-alt"></i>
              </div>
            </div>
          </div> -->
          <!-- looping cards end -->
        
        </div>
        <div class="add-card">
          <!-- <p class="icon-add-card" v-on:click="addCardForm"> -->
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add a card
          </p>
        </div>
      </div>
      <div class="pl-2 my-1 cards-group">
        <p class="m-0 p-1 categori">Complete</p>
        <div class="all-cards">

          <!-- looping cards begin -->
          <!-- <div class="my-1 card" v-for="task in tasks">
            <div class="p-1 card-body">
              <div class="title-container">
                <p class="m-0 card-title">{{ task.title }}</p>
              </div>
              <div class="description-container">
                <p class="card-text">{{ task.description }}</p>
              </div>
              <div class="action-container">
                <i class="m-1 fas fa-pencil-alt" v-on:click="editCardForm"></i>
                <i class="m-1 far fa-trash-alt"></i>
              </div>
            </div>
          </div> -->
          <!-- looping cards end -->

        </div>
        <div class="add-card">
          <!-- <p class="icon-add-card" v-on:click="addCardForm"> -->
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add a card
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Board',
    props: {
        isLogedIn: Boolean
    },
    data() {
        return {

        }
    },
}
</script>

<style>

</style>