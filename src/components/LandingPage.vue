<template>
<div class="landing-page">
  <div class="fixed-top">
  <nav class="navbar py-3 bg-transparent" data-track-group="Global Header">
    <h3 class="text-white">Kanban</h3>
    <div class="d-none d-md-block recommend">
    </div> <div class="float-right buttons">
      <a @click="changePage('sign-in')" class="btn btn-sm btn-link text-white">Sign In</a>
      <a @click="changePage('sign-up')" class="btn btn-sm bg-white font-weight-bold">Sign Up</a>
    </div>
  </nav>
</div>
  <b-container fluid="sm">
  <b-row>
    <div class="col-lg-5 text-white text-left">
      <h1>
        Kanban lets you work more collaboratively and get more done.
      </h1>
      <p>
        Kanban’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.
      </p>
    </div>
    <div class="col-lg-6">
      <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" alt="Kanban">
    </div>
  </b-row>
  </b-container>

</div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}
</style>