import axios from 'axios'

export const Authios = () => {
  const token = JSON.parse(localStorage.getItem('authkey'))

  return axios.create({
    baseURL: `http://localhost:5000`,
    headers: {
      Authorization: token
    }
  })
}