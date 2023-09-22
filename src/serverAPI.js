import Axios from "axios";

const serverAPI = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default serverAPI;
