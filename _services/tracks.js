import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_services/auth-header";

export const tracksService = {
  getAll,
  pushTrack,
  updateTrack
}

function getAll(){
  return axios.get(`${API_URL}/tracks`, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => Promise.reject(error.response))
}

function pushTrack(track){
  return axios
    .post(`${API_URL}/tracks/add`, track, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function updateTrack(track){
  return axios
    .post(`${API_URL}/tracks/update`, track, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
