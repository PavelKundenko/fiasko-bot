import { Telegraf } from 'telegraf';
import { Command } from '@commands/command.abstract';
import { IBotContext } from '@context/context.interface';

export class StartController extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  register(): void {
    this.bot.start((ctx) => {
      ctx.reply('Hello, I\'m Team Fiasko Bot!');
    });
  }
}
