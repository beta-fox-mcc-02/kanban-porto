import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://thawing-shore-39010.herokuapp.com'
})

export default instance