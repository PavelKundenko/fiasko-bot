import { Context } from 'telegraf';

export interface ISessionData {
  steamStoreSubscribed: boolean;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
