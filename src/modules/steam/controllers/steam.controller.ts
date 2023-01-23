import { Telegraf } from 'telegraf';
import { Command } from '@commands/command.abstract';
import { IBotContext } from '@context/context.interface';
import { ESteamCommand } from '@modules/steam/controllers/steam.commands';

export class SteamController extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  register(): void {
    this.bot.command(ESteamCommand.SubscribeSales, (ctx) => {
      if (!ctx.session.steamStoreSubscribed) {
        ctx.session.steamStoreSubscribed = true;

        ctx.reply('Subscribed to Steam Sales!');
      } else {
        ctx.reply('You are already subscribed');
      }
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
