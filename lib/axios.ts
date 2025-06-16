import axios from 'axios';
import type { AxiosInstance as AxiosInstanceType, AxiosRequestConfig } from 'axios'; // `type` sifatida import qilyapmiz

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export class APICLient <T> {
  endpoint:string
  constructor(endpoit:string){
    this.endpoint = endpoit
  }
 getAll = async (config:AxiosRequestConfig) =>{
  return await AxiosInstance.get<T>(this.endpoint,config).then(res => res.data)
 }
 get = async (slug:string,config?:AxiosRequestConfig) =>{
  return await AxiosInstance.get<T>(this.endpoint  + slug + "/",config).then
  ((res) => res.data)
 }
}

AxiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
