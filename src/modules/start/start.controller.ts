import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';
import { Controller } from '@abstracts/controller.abstract';

export class StartController extends Controller {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  register(): void {
    this.bot.start((ctx) => {
      ctx.reply('Hello, I\'m Team Fiasko Bot!');
    });
  }
}
