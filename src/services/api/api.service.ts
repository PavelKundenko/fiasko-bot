import axios, { AxiosRequestConfig } from 'axios';
import { ILogger } from '@services/logger/logger.interface';
import { inject, injectable } from 'inversify';
import { BINDINGS } from '@typings/globalBindings';
import { IApiService } from './api.interface';
import 'reflect-metadata';

@injectable()
export class ApiService implements IApiService {
  constructor(@inject(BINDINGS.ILogger) private logger: ILogger) {}

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
