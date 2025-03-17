import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_services/auth-header";

export const sessionsService = {
  getAll,
  push,
  update,
  deleteSession
}

function getAll(){
  return axios.get(`${API_URL}/sessions`,{ headers: authHeader() })
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}

function push(event){
  return axios
    .post(`${API_URL}/sessions/add`, event, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function update(event){
  return axios
    .post(`${API_URL}/sessions/update`, event, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function deleteSession(id){
  return axios
    .post(`${API_URL}/sessions/delete`, {id}, { headers: authHeader()})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
