<template>
    <section class="section">
        <h1 class="title">
            The Lists
            <button class="button is-primary" @click="prompt">
                + New List
            </button>
        </h1>
        <div class="card-container">
            <List
                v-for="list in $store.state.lists"
                :key="list.id"
                :list="list"
            />
        </div>
    </section>
</template>

<script>
import List from './List'

export default {
    created: async function() {
        this.$store
            .dispatch('getLists', this.$route.params.id)
            .then(lists => {
                console.log('selesai loading')
            })
            .catch(e => {
                console.log(e)
            })
    },
    methods: {
        prompt() {
            this.$buefy.dialog.prompt({
                message: `Type your new list`,
                inputAttrs: {
                    placeholder: 'e.g. Register',
                    maxlength: 20
                },
                trapFocus: true,
                onConfirm: value => {
                    const task = {
                        title: value,
                        BoardId: this.$route.params.id
                    }
                    this.$store.dispatch('newList', task)
                }
            })
        },
        deleteList(id) {
            this.$store.dispatch('removeList', id)
        }
    },
    components: {
        List
    }
}
</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 0.5em;
}
</style>
