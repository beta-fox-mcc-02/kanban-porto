<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
         <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
               <div>
                  <li class="nav-item"><a class="nav-link" href="#" @click.prevent="changePage('home')">Home</a></li>
               </div>
               <div v-if="!isLogin" class="flex">
                  <li class="nav-item"><a class="nav-link" href="#" @click.prevent="changePage('login')">Log In</a></li>
                  <li class="nav-item"><a class="nav-link" href="#" @click.prevent="changePage('register')">Register</a></li>
               </div>
               <div v-else class="flex">
                  <li class="nav-item"><a class="nav-link" href="#" @click.prevent="changePage('board')">Board</a></li>
                  <li class="nav-item"><a class="nav-link" href="#" @click.prevent="changePage('logout')">Log Out</a></li>                  
               </div>
            </ul>
         </div>
      </nav>
   </div>
</template>

<script>
export default {
   props : {
      isLogin : Boolean
   },
   methods : {
      changePage(page) {
         if(page === 'logout') {
            localStorage.clear()
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            // console.log('User signed out.');
            })
            this.$emit('changePage', 'home', false)
         } else {
            this.$emit('changePage', page, this.isLogin)
         }
      }
   }
}
</script>

<style scoped>
   .inline {
      display: inline
   }

   .flex {
      display:flex
   }
</style>