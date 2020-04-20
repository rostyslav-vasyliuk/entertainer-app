import axios from 'axios';

const BASE_URL: string = 'http://192.168.1.8:3030/api';

export const Axios = axios.create({
  baseURL: BASE_URL
});
