import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const setToken = (token) => {
  client.defaults.headers.Authorization = token;
};

export default client;
