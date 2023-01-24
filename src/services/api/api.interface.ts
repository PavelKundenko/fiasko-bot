import { AxiosRequestConfig } from 'axios';

export interface IApiService {
  get<TData extends unknown, TParams extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    params?: TParams,
  ): Promise<TData>;
}
