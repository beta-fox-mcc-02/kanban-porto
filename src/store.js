import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        boards: [],
        token: localStorage.getItem('token') || '',
        lists: []
    },
    mutations: {
        updateBoards(state, boards) {
            state.boards = boards
        },
        newBoard(state, board) {
            state.boards.push(board)
        },
        updateLists(state, lists) {
            state.lists = lists
        },
        newList(state, list) {
            state.lists.push(list)
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
        auth(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        logout(state) {
            state.token = ''
            localStorage.clear('token')
        },
        removeBoard(state, id) {
            state.boards = this.state.boards.filter(i => i.id !== id)
        },
        removeList(state, id) {
            state.lists = this.state.lists.filter(i => i.id !== id)
        }
    },
    actions: {
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
        async removeBoard({ commit }, id) {
            try {
                await axios.delete(`http://localhost:3000/boards/${id}`)
                commit('removeBoard', id)
            } catch (e) {
                console.log(e)
            }
        },
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
        async removeList({ commit }, id) {
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
        async newCard({ commit }, data) {
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
        }
    },
    getters: {
        isAuthenticated: function(state) {
            return !!state.token || false
        },
        token: function(state) {
            return state.token
        }
    }
})
