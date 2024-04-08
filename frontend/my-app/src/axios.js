import axios from 'axios';
// import getApiDomain from './config';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('mytoken')}` }
});

export default instance;
