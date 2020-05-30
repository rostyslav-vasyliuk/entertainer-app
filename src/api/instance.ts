import axios from 'axios';

export const BASE_URL: string = 'http://192.168.0.12:3030/api';

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'access-token': ''
  }
});
