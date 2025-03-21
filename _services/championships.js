import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_services/auth-header";

export const championshipsService = {
  getAll,
  pushChampionship,
  updateChampionship,
  archiveChampionship
}

function getAll(){
  return axios.get(`${API_URL}/championships`, { headers: authHeader() })
    .then(response => response.data)
    .catch(error => Promise.reject(error.response))
}

function pushChampionship(championship){
  return axios
    .post(`${API_URL}/championships/add`, championship, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function updateChampionship(championship){
  return axios
    .post(`${API_URL}/championships/update`, championship, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function archiveChampionship(id){
  return axios
    .post(`${API_URL}/championships/archive`, {id}, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      window.console.log(error.response)
      return Promise.reject(error.response)
    })
}
