import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';

export abstract class Controller {
  protected constructor(protected bot: Telegraf<IBotContext>) {}

  abstract register(): void;
}
