<template>
    <nav class="panel">
        <p class="panel-heading">
            {{ list.title }}
        </p>

        <Card v-for="card in list.Cards" :key="card.id" :card="card"></Card>
        <form @submit.prevent="addCard">
            <label class="panel-block">
                <input type="text" v-model="title" class="input" />
            </label>
            <div class="panel-block">
                <div class="buttons">
                    <button class="button is-link">
                        + New Card
                    </button>
                </div>
            </div>
        </form>
    </nav>
</template>

<script>
import Card from './Card'

export default {
    name: 'List',
    data: function() {
        return { title: null }
    },
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
                }
            })
        },
        addCard: function() {
            let data = {
                title: this.title,
                ListId: this.list.id
            }
            this.$store
                .dispatch('newCard', data)
                .then(result => {
                    this.$buefy.toast.open(`Success adding new card.`)
                    this.title = ''
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    components: {
        Card
    }
}
</script>

<style scoped>
.card-container {
    margin: 5px;
}
</style>
