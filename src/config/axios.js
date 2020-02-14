import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://blooming-wildwood-39867.herokuapp.com/categories'
});

export default instance