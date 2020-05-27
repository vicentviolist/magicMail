import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 45000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export { api };
