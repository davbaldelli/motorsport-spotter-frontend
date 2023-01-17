import axios from "axios";
import {API_URL} from "@/_services/config";

export const eventsService = {
  getAll,
  getIncoming,
  pushEvent,
  updateEvent,
}

function getAll(){
  return axios.get(`${API_URL}/events`,{})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}

function getIncoming(){
  return axios.get(`${API_URL}/events/incoming`,{})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}

function pushEvent(event){
  return axios
    .post(`${API_URL}/events/add`, event, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function updateEvent(event){
  return axios
    .post(`${API_URL}/events/update`, event, {})
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
