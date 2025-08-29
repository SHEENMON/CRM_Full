import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');


  if (token && !config.url.includes('login') && !config.url.includes('register')) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
});


export default API;
