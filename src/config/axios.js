import axios from 'axios'

const instance = axios.create({
   baseURL: 'https://serene-bayou-14190.herokuapp.com'
})
export default instance