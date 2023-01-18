import axios from "axios";
import {API_URL} from "@/_services/config";

export const nationsService = {
  getAll,
}

function getAll(){
  return axios.get(`${API_URL}/nations`, {})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}
