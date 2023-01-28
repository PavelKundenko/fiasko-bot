import { Telegraf } from 'telegraf';
import { Controller } from '@abstracts/controller.abstract';
import { IBotContext } from '@context/context.interface';
import { ESteamCommand } from './steam.commands';

export class SteamController extends Controller {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  register(): void {
    this.bot.command(ESteamCommand.SubscribeSales, (ctx) => {

    });

    this.bot.command(ESteamCommand.UnsubscribeSales, (ctx) => {
      if (ctx.session.steamStoreSubscribed) {
        ctx.session.steamStoreSubscribed = false;

        ctx.reply('Unsubscribed from Steam Sales');
      } else {
        ctx.reply('You are not subscribed');
      }
    });
  }
}
