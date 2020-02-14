import axios from 'axios'

const instance = axios.create({
    // baseURL: 'https://fierce-ridge-24187.herokuapp.com'
    baseURL: 'https://fathomless-hamlet-44488.herokuapp.com'
    // baseURL: 'http://localhost:3000'
})

export default instance