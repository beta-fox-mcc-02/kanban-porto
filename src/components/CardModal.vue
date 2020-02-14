<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ title }}</p>
        </header>
        <section class="modal-card-body">
            <!-- disini ada description sama toggle edit  -->

            <h1 class="subtitle">
                Description
                <button
                    v-if="!formDescription"
                    class="button is-outlined is-primary"
                    @click="toggleDescription(true)"
                >
                    {{ true ? 'Edit' : 'Add description' }}
                </button>
            </h1>

            <div class="columns">
                <div class="column is-half">
                    <div v-if="!formDescription">
                        <h2 v-if="description" class="subtitle">
                            {{ description }}
                        </h2>
                    </div>
                    <!-- Kasih form disini -->
                    <div v-if="formDescription">
                        <form>
                            <b-field>
                                <b-input
                                    maxlength="200"
                                    v-model="description"
                                    type="textarea"
                                ></b-input>
                            </b-field>
                            <button
                                class="button is-primary"
                                @click="updateCard"
                            >
                                Save
                            </button>
                            <button
                                class="button is-outlined"
                                @click="toggleDescription(false)"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>

                    <table
                        class="table table is-striped is-narrow is-hoverable is-fullwidth"
                    >
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cardData.items" :key="item.id">
                                <td>
                                    <div class="field">
                                        <input
                                            type="checkbox"
                                            v-model="item.status"
                                            @change="
                                                updateItem($event, item.id)
                                            "
                                        />
                                    </div>
                                </td>
                                <td>{{ item.title }}</td>
                                <td>
                                    <a>
                                        <i
                                            class="mdi mdi-trash-can-outline is-pulled-right"
                                            @click="deleteItem($event, item.id)"
                                        ></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <form @submit.prevent="addItem">
                        <div class="field">
                            <div class="control">
                                <input
                                    type="text"
                                    v-model="item_title"
                                    class="input"
                                    placeholder="Item title"
                                />
                            </div>
                        </div>
                        <div class="field">
                            <button class="button is-link">
                                + New Item
                            </button>
                        </div>
                    </form>
                </div>
                <div class="column is-half">
                    <h1 class="subtitle">Percentage:</h1>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="buttons">
                <button class="button" type="button" @click="$parent.close()">
                    Close
                </button>
                <button
                    class="button is-danger"
                    type="button"
                    @click="deleteCard"
                >
                    Delete Card
                </button>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'CardModal',
    props: {
        card: Object
    },
    data: function() {
        return {
            formDescription: false,
            item_title: null
        }
    },
    created: function() {
        this.$store
            .dispatch('getOneCard', this.card.id)
            .then(result => {
                console.log(result)
            })
            .catch(e => {
                console.log(e)
            })
    },
    computed: {
        ...mapGetters(['cardData']),
        description: {
            set(description) {
                this.$store.commit('SET_DESCRIPTION', description)
            },
            get() {
                return this.cardData.description
            }
        },
        title: {
            get() {
                return this.cardData.title
            }
        }
    },
    methods: {
        toggleDescription: function(status) {
            this.formDescription = status
        },
        addItem: function() {
            let data = {
                title: this.item_title,
                CardId: this.card.id
            }
            this.$store
                .dispatch('newItem', data)
                .then(result => {
                    this.$buefy.toast.open(`Success adding new item.`)
                    this.item_title = ''
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteCard: function() {
            this.$store
                .dispatch('deleteCard', this.card.id)
                .then(result => {
                    this.$buefy.toast.open(`Success deleting item.`)
                    this.$parent.close()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateCard: function(e) {
            e.preventDefault()

            const data = {
                id: this.card.id,
                description: this.description
            }

            this.$store
                .dispatch('updateCard', data)
                .then(result => {
                    this.toggleDescription(false)
                    this.$buefy.toast.open(`Success updating card.`)
                })
                .catch(err => {
                    console.log(err)
                })

            console.log('triggered')
        },
        deleteItem: function(e, id) {
            this.$store
                .dispatch('deleteItem', id)
                .then(result => {
                    this.$buefy.toast.open(`Success deleting item.`)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateItem: function(e, id) {
            e.preventDefault()

            this.$store
                .dispatch('updateItem', id)
                .then(result => {
                    this.$buefy.toast.open(`Success updating item.`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>
