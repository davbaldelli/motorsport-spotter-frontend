import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_services/auth-header";

export const nationsService = {
  getAll,
}

function getAll(){
  return axios.get(`${API_URL}/nations`, { headers: authHeader() })
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response))
}
