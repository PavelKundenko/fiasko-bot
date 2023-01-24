import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';
import { Command } from '@abstracts/command.abstract';

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
