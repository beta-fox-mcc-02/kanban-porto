<template>
  <Fragment>
    <Profile :user="user" :is-login="isLogin"></Profile>
    <main role="main">
      <div class="board-container">
        <p>Hansin</p>
      </div>
    </main>
  </Fragment>
</template>

<script>
import Profile from "../components/Profile";
import isAuthenticated from "../helpers/isAuthenticated";
import { Fragment } from "vue-fragment";
export default {
  name: "Board",
  components: {
    Profile,
    Fragment
  },
  data() {
    return {
      user: null,
      isLogin: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (localStorage.token) {
        isAuthenticated()
          .then(response => {
            const user = response.data;
            vm.isLogin = true;
            vm.user = user;
            next();
          })
          .catch(err => {
            next("/login");
          });
      } else {
        next("/login");
      }
    });
  }
};
</script>