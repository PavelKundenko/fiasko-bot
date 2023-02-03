import { Context } from 'telegraf';

export interface ISessionData {
  isSubscribedSales: boolean;
  dateSubscribed: string | null;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
