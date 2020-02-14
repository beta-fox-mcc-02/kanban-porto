import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        boards: [],
        token: localStorage.getItem('token') || '',
        lists: [],
        card: {} // card ini ada ketika modal card dibuka
    },
    mutations: {
        // BOARDS
        updateBoards(state, boards) {
            state.boards = boards
        },
        newBoard(state, board) {
            state.boards.push(board)
        },

        removeBoard(state, id) {
            state.boards = this.state.boards.filter(i => i.id !== id)
        },

        // END OF BOARDS

        // LISTS

        updateLists(state, lists) {
            state.lists = lists
        },
        newList(state, list) {
            state.lists.push(list)
        },
        removeList(state, id) {
            state.lists = this.state.lists.filter(i => i.id !== id)
        },

        newCard(state, card) {
            state.lists.forEach(el => {
                if (el.id == card.ListId) {
                    if (el.Cards) {
                        el.Cards.push(card)
                    } else {
                        el.Cards = []
                        el.Cards.push(card)
                    }
                }
            })
        },

        // END OF LISTS

        // CARD

        SET_CARD(state, card) {
            state.card = card
        },
        DELETE_CARD(state, id) {
            state.lists.forEach(el => {
                el.Cards = el.Cards.filter(i => i.id !== id)
            })
        },
        SET_DESCRIPTION(state, description) {
            state.card.description = description
        },
        UPDATE_CARD(state, card) {
            state.card = card
        },

        // END OF CARD

        // AUTH
        auth(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        logout(state) {
            state.token = ''
            localStorage.clear('token')
        },

        // END OF AUTH

        SET_ITEM(state, item) {
            state.card.Items.push(item)
        },
        UPDATE_ITEM(state, item) {
            state.card.Items.forEach(el => {
                if (el.id === item.id) {
                    el = item
                }
            })
        },
        DELETE_ITEM(state, id) {
            state.card.Items = this.state.card.Items.filter(i => i.id !== id)
        }
    },
    actions: {
        // BOARDS
        async getBoards({ commit }) {
            try {
                let response = await axios.get('http://localhost:3000/boards')
                commit('updateBoards', response.data.data)
            } catch (e) {
                console.log(e)
            }
        },
        async newBoard({ commit }, title) {
            try {
                const response = await axios.post(
                    'http://localhost:3000/boards',
                    {
                        title
                    }
                )
                commit('newBoard', response.data.data)
            } catch (e) {
                console.log(e)
            }
        },
        async getBoard({ commit }, id) {
            try {
                return axios.get(`http://localhost:3000/boards/${id}`)
            } catch (e) {
                console.log(e)
            }
        },
        removeBoard({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`http://localhost:3000/boards/${id}`)
                    .then(response => {
                        commit('removeBoard', id)
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })
        },

        // END OF BOARDS

        // AUTH

        async register({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:3000/users/register', data)
                    .then(response => {
                        commit('auth', response.data.token)
                        resolve('/')
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:3000/users/login', data)
                    .then(response => {
                        commit('auth', response.data.token)
                        resolve('/')
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                resolve()
            })
        },
        loginWithGoogle({ commit }, id_token) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:3000/users/gSignIn', { id_token })
                    .then(response => {
                        commit('auth', response.data.token)
                        resolve('/')
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },

        // END OF AUTH

        // LISTS

        getLists({ commit }, BoardId) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`http://localhost:3000/lists?BoardId=${BoardId}`)
                    .then(response => {
                        console.log(response)
                        commit('updateLists', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        newList({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:3000/lists', data)
                    .then(response => {
                        commit('newList', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        removeList({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`http://localhost:3000/lists/${id}`)
                    .then(response => {
                        commit('removeList', id)
                        resolve()
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        newCard({ commit }, data) {
            // cari ListId, terus push ya ke Cardnya
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:3000/cards', data)
                    .then(response => {
                        commit('newCard', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },

        // END OF LISTS

        // CARD

        updateCard({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios
                    .patch(`http://localhost:3000/cards/${data.id}`, data)
                    .then(response => {
                        console.log(response)
                        commit('UPDATE_CARD', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },

        getOneCard({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`http://localhost:3000/cards/${id}`)
                    .then(response => {
                        commit('SET_CARD', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        deleteCard({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`http://localhost:3000/cards/${id}`)
                    .then(response => {
                        commit('DELETE_CARD', id)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },

        // END OF CARD

        // ITEMS
        newItem({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`http://localhost:3000/items`, data)
                    .then(response => {
                        commit('SET_ITEM', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },

        updateItem({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .patch(`http://localhost:3000/items/${id}`)
                    .then(response => {
                        commit('UPDATE_ITEM', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        deleteItem({ commit }, id) {
            console.log(id)
            return new Promise((resolve, reject) => {
                axios
                    .delete(`http://localhost:3000/items/${id}`)
                    .then(response => {
                        commit('DELETE_ITEM', id)
                        resolve(response.data.data)
                    })
                    .catch(e => {
                        reject(e)
                    })
            })
        }

        // END OF ITEMS
    },
    getters: {
        // AUTH
        isAuthenticated: function(state) {
            return !!state.token || false
        },
        token: function(state) {
            return state.token
        },
        // END OF AUTH

        // CARD

        // items: function(state) {
        //     return state.card.Items
        // },

        // description: function(state) {
        //     return state.card.description
        // },
        // title: function(state) {
        //     return state.card.title
        // },
        cardData: function(state) {
            return state.card
        }

        // END OF CARD
    }
})
