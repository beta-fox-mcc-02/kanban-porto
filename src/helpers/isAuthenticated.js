import axios from 'axios'

const isAuthenticated = () => {
  return axios({
    method: 'GET',
    url: 'https://guarded-thicket-00309.herokuapp.com/users',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  })
}

export default isAuthenticated