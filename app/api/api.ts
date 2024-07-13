import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inspiring-light-f216c5492b.strapiapp.com/api', // Replace with your Strapi API URL
});

export default api;
