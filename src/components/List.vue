<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ list.title }}
            </p>

            <a class="card-header-icon" aria-label="more options">
                + Add Card
            </a>

            <!-- <router-link
                :to="{ path: `/lists/${list.id}` }"
                class="card-header-icon"
                aria-label="more options"
            >
                Show
            </router-link> -->
        </header>
        <footer class="card-footer">
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item" @click="deleteList(list.id)">
                Delete
            </a>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: {
        list: Object
    },
    methods: {
        deleteList(id) {
            this.$store.dispatch('removeList', id)
        },
        prompt() {
            this.$buefy.dialog.prompt({
                message: `Type your new card`,
                inputAttrs: {
                    placeholder: 'e.g. Authentication',
                    maxlength: 20
                },
                trapFocus: true,
                onConfirm: value => {
                    const task = {
                        title: value,
                        BoardId: this.$route.params.id
                    }
                    this.$store.dispatch('newList', task)
                    // this.$buefy.toast.open(`Your name is: ${value}`)
                }
            })
        }
    }
}
</script>
