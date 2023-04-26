import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getAccesTokenLST, setAccesTokenLST } from "./Token";
import { PATH_API } from "./path";

class Http {
  instance: AxiosInstance;
  private accesToken: string;
  constructor() {
    this.accesToken = getAccesTokenLST();
    this.instance = axios.create({
      baseURL: "http://api.training.div3.pgtest.co/api/v1/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accesToken && config.headers) {
          // config.headers.Authorization = "Bearer" + " " + this.accesToken;
          config.headers.Authorization = this.accesToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { url } = response.config;
        if (url === PATH_API.login) {
          this.accesToken = response.data.data.token;
          setAccesTokenLST(this.accesToken);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
