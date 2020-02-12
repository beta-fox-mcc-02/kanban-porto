import axios from 'axios'

const isAuthenticated = () => {
  return axios({
    method: 'GET',
    url: 'http://localhost:3000/users',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
}

export default isAuthenticated