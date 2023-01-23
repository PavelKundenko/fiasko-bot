import { AxiosRequestConfig } from 'axios';
import { ILogger } from '@services/logger/logger.interface';

export interface IApiService {

  logger: ILogger;

  get<TData extends unknown, TParams extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    params?: TParams,
  ): Promise<TData>;
}
