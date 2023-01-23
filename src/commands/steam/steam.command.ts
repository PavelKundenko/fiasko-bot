import { Telegraf } from 'telegraf';
import { Command } from '../command.abstract';
import { IBotContext } from '../../context/context.interface';

export class SteamCommand extends Command {
  constructor(public bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('/subscribe_sales', (ctx) => {
      ctx.session.steamStoreSubscribed = true;

      ctx.reply('Subscribed to Steam Sales!');
    });

    this.bot.command('/unsubscribe_sales', (ctx) => {
      ctx.session.steamStoreSubscribed = false;

      ctx.reply('Unsubscribed from Steam Sales');
    });
  }
}
