<template>
    <section class="section">
        <h1 class="title">
            Your Boards
            <button class="button is-primary" @click="prompt">+ New</button>
        </h1>
        <!-- <h2 class="subtitle">Subtitle</h2> -->
        <div class="card-container">
            <div
                class="card"
                v-for="board in $store.state.boards"
                :key="board.id"
            >
                <header class="card-header">
                    <p class="card-header-title">
                        {{ board.title }}
                    </p>
                    <router-link
                        :to="{ path: `/board/${board.id}` }"
                        class="card-header-icon"
                        aria-label="more options"
                    >
                        Show
                    </router-link>
                </header>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Collaborator</a>
                    <a
                        href="#"
                        class="card-footer-item"
                        @click="deleteBoard($event, board.id)"
                    >
                        Delete
                    </a>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    created: async function() {
        this.$store.dispatch('getBoards')
    },
    methods: {
        prompt() {
            this.$buefy.dialog.prompt({
                message: `Type your new board`,
                inputAttrs: {
                    placeholder: 'e.g. Bugs',
                    maxlength: 20
                },
                trapFocus: true,
                onConfirm: value => {
                    this.$store.dispatch('newBoard', value)
                }
            })
        },
        deleteBoard(e, id) {
            e.preventDefault()
            this.$store
                .dispatch('removeBoard', id)
                .then(result => {
                    this.$buefy.toast.open(`Success deleting board.`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
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
