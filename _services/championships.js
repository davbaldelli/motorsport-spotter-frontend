import axios from "axios";
import {API_URL} from "@/_services/config";

export const championshipsService = {
  getAll,
  pushChampionship,
  updateChampionship,
}

function getAll(){
  return axios.get(`${API_URL}/api/championships`, {})
    .then(response => response.data)
    .catch(error => Promise.reject(error.response ? error.response : error))
}

function pushChampionship(championship){
  return axios
    .post(`${API_URL}/api/championships/add`, championship, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function updateChampionship(championship){
  return axios
    .post(`${API_URL}/api/championships/update`, championship, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
