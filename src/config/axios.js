import axios from 'axios';

const heroku = 'https://peaceful-atoll-92410.herokuapp.com/';
const localhost = 'http://localhost:3000';

const instance = axios.create({
  baseURL: heroku
});

export default instance