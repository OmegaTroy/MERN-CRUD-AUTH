import axios from 'axios'

const intancia = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})


export default intancia