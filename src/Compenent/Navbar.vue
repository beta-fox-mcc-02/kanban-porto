<template>
      <nav class="orange accent-3">
        <div class="nav-wrapper">
            <a href="#" class="brand-logo center">KANBAN-DESU</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="" v-on:click.prevent="Logout('login')">Logout</a></li>
              <button class="btn waves-effect waves-light btn-small" type="submit" name="action" v-on:click="add('addPage')">Add
            </button>
            </ul>
          </div>
    </nav>
</template>

<script>
export default {
    props : {
        currentPage : String
    },
    data : () => {
        return {
            
        }
    },
    methods : {
        Logout(event){
            localStorage.clear()
            this.$emit('changePage',event)
        },
        add(event){
            console.log(event)
            this.$emit('changePage',event)
        }
    }
}
</script>

<style>

</style>