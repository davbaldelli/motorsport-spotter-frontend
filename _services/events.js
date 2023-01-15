import axios from "axios";

export const eventsService = {
  getAll
}

function getAll(){
  return axios.get('/events/all',{})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response ? error.response : error))
}
