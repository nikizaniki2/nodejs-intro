import axios from 'axios';
import { getCsrfToken } from './csrf';

const instance = axios.create();

instance.interceptors.request.use(
  async config => {
    config.headers = {
      'X-CSRFToken': await getCsrfToken(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    config.withCredentials = true;
    return config;
  },
  error => {
    Promise.reject(error);
  });

export default instance;