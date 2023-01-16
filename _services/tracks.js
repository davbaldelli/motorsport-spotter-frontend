import axios from "axios";
import {API_URL} from "@/_services/config";

export const tracksService = {
  getAll,
  pushTrack,
  updateTrack
}

function getAll(){
  return axios.get(`${API_URL}/api/tracks`, {})
    .then(res => res.data)
    .catch(error => Promise.reject(error.response))
}

function pushTrack(track){
  return axios
    .post(`${API_URL}/api/tracks/add`, track, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function updateTrack(track){
  return axios
    .post(`${API_URL}/api/tracks/update`, track, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
