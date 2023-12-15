import axios from 'axios';

const axiosInstance = axios.create({
	                                   baseURL: 'https://transport-app-backend.onrender.com/api/v1',
	                                   timeout: 15000,
	                                   withCredentials: true
	                                   // headers: {'X-Custom-Header': 'foobar'}
                                   });

export default axiosInstance;
