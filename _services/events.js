import axios from "axios";
import {API_URL} from "@/_services/config";

export const eventsService = {
  getAll
}

function getAll(){
  return axios.get(`${API_URL}/api/events`,{})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response ? error.response : error))
}
