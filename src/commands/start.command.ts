import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IBotContext } from '../services/context/context.interface';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply('Hello, I\'m Team Fiasko Bot!');
    });
  }
}
