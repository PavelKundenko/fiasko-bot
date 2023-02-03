import { inject, injectable } from 'inversify';
import cron, { ScheduledTask } from 'node-cron';
import { format } from 'date-fns';
import { TCommandContext } from '@typings/telegraf';
import { IApiService } from '@services/api';
import { BINDINGS } from '@typings/global.bindings';
import { cleanExtraSpaces } from '@shared/helpers';
import { IFeaturedCategoriesResponse } from './typings';
import { ISteamService } from './steam.interface';
import 'reflect-metadata';

@injectable()
export class SteamService implements ISteamService {
  private cronTask: ScheduledTask | null = null;

  constructor(
    @inject(BINDINGS.IApiService) private readonly apiService: IApiService,
  ) {}

  subscribe = async (ctx: TCommandContext) => {
    if (!ctx.session.isSubscribedSales) {
      ctx.session.isSubscribedSales = true;

      this.scheduleSteamSalesMessage(ctx);
      this.getSales(ctx);

      ctx.reply('Subscribed to Steam Sales! You will receive sales updates on daily basis.');
    } else {
      ctx.reply('You are already subscribed');
    }
  };

  unsubscribe = (ctx: TCommandContext) => {
    if (ctx.session.isSubscribedSales) {
      ctx.session.isSubscribedSales = false;

      this.cronTask?.stop();

      ctx.reply('Unsubscribed from Steam Sales');
    } else {
      ctx.reply('You are not subscribed');
    }
  };

  getSales = async (ctx: TCommandContext) => {
    const message = await this.getSalesCollection();

    ctx.reply(message, { parse_mode: 'HTML' });
  };

  private getSalesCollection = async () => {
    const data = await this.apiService.get<IFeaturedCategoriesResponse>('https://store.steampowered.com/api/featuredcategories/?l=ukrainian');

    const result = data.specials.items.map((item, index) => {
      const priceOriginal = item.original_price.toString().slice(0, -2);
      const priceActual = item.final_price.toString().slice(0, -2);

      return cleanExtraSpaces(`
        ${index + 1}.
        <a href="https://store.steampowered.com/app/${item.id}">${item.name}</a>
        <s>${priceOriginal}</s>
        <b>${priceActual}</b>₴
      `);
    }).join('\n\n');

    return `Current Sales on ${format(new Date(), 'do')} of ${format(new Date(), 'LLLL')}:\n\n${result}`;
  };

  private scheduleSteamSalesMessage = (ctx: TCommandContext) => {
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();

    this.cronTask = cron.schedule(`${minutes} ${hours} * * *`, async () => {
      const message = await this.getSalesCollection();

      ctx.reply(message, { parse_mode: 'HTML' });
    });
  };
}
