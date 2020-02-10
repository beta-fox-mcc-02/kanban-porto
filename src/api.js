function findAll() {
  return axios({
    method: 'get',
    url: 'https://peaceful-atoll-92410.herokuapp.com/dummy'
  })
}