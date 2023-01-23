import axios, { AxiosRequestConfig } from 'axios';
import { IApiService } from './api.interface';

export class ApiService implements IApiService {
  async get<TData extends unknown, TParams extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    params?: TParams,
  ): Promise<TData> {
    try {
      const response = await axios.get<TData>(url, params);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
