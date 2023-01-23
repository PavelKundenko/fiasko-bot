import axios, { AxiosRequestConfig } from 'axios';
import { ILogger } from '@services/logger/logger.interface';
import { IApiService } from './api.interface';

export class ApiService implements IApiService {
  constructor(public logger: ILogger) {
    this.logger = logger;
  }

  async get<TData extends unknown, TParams extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    params?: TParams,
  ): Promise<TData> {
    try {
      const response = await axios.get<TData>(url, params);

      return response.data;
    } catch (error) {
      this.logger.log(error);

      return Promise.reject(error);
    }
  }
}
