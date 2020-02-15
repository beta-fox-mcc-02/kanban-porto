import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fathomless-bastion-72476.herokuapp.com'
})

export default instance