<template>
  <Navbar :user="user" :is-login="isLogin"></Navbar>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Profile",
  components: {
    Navbar
  },
  props: ["isLogin", "user"]
};
</script>