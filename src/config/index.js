import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://obscure-lowlands-88720.herokuapp.com/'
})

export default instance