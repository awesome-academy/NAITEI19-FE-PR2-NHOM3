import Axios from "axios";

const serverAPI = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const createOrder = async (orderData) => {
  try {
    const response = await serverAPI.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default serverAPI;
