import axios from "axios";
import {API_URL} from "@/_services/config";

export const sessionsService = {
  getAll,
  push,
  update
}

function getAll(){
  return axios.get(`${API_URL}/sessions`,{})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}

function push(event){
  return axios
    .post(`${API_URL}/sessions/add`, event, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function update(event){
  return axios
    .post(`${API_URL}/sessions/update`, event, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
