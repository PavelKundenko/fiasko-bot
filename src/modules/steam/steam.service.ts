import { inject, injectable } from 'inversify';
import { TCommandContext } from '@typings/telegraf';
import { IApiService } from '@services/api';
import { BINDINGS } from '@typings/global.bindings';
import { IFeaturedCategoriesResponse } from './typings';
import { ISteamService } from './steam.interface';
import 'reflect-metadata';

@injectable()
export class SteamService implements ISteamService {
  constructor(
    @inject(BINDINGS.IApiService) private readonly apiService: IApiService,
  ) {}

  subscribe = (ctx: TCommandContext) => {
    this.getSales();

    if (!ctx.session.steamStoreSubscribed) {
      ctx.session.steamStoreSubscribed = true;

      ctx.reply('Subscribed to Steam Sales!');
    } else {
      ctx.reply('You are already subscribed');
    }
  };

  unsubscribe = (ctx: TCommandContext) => {
    if (ctx.session.steamStoreSubscribed) {
      ctx.session.steamStoreSubscribed = false;

      ctx.reply('Unsubscribed from Steam Sales');
    } else {
      ctx.reply('You are not subscribed');
    }
  };

  private getSales = async () => {
    const resp = await this.apiService.get<IFeaturedCategoriesResponse>('https://store.steampowered.com/api/featuredcategories/?l=ukrainian');

    console.log(resp.specials.items);
  };
}
