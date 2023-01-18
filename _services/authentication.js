import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_services/auth-header";

export const userService = {
  login,
  signIn,
  logout,
}

function login (username, password) {
  return axios.post(`${API_URL}/login`, {
    username,
    password
  }, { validateStatus: status => status === 202 })
    .then(response => {
      const user = response.data
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        console.log('no token amigo')
      }
      return Promise.resolve(user)
    }).catch(error => Promise.reject(error.response ? error.response : error))
}

function signIn (username, password, role) {
  return axios.post(`${API_URL}/signin`, {
    username,
    password,
    role
  }, { validateStatus: status => status === 202 , headers: authHeader()}, )
    .then(response => {
      const user = response.data
      return Promise.resolve(user)
    }).catch(error => Promise.reject(error.response ? error.response : error))
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}
