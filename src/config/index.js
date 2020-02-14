import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://guarded-thicket-00309.herokuapp.com'
})

export default instance