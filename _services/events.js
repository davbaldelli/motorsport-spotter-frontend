import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_services/auth-header";

export const eventsService = {
  getAll,
  getIncoming,
  pushEvent,
  updateEvent,
}

function getAll(){
  return axios.get(`${API_URL}/events`,{ headers: authHeader() })
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}

function getIncoming(){
  return axios.get(`${API_URL}/events/incoming`,{ headers: authHeader() })
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}

function pushEvent(event){
  return axios
    .post(`${API_URL}/events/add`, event, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}

function updateEvent(event){
  return axios
    .post(`${API_URL}/events/update`, event, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => {
      return Promise.reject(error.response)
    })
}
