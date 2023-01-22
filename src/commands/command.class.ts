import { Telegraf } from 'telegraf';
import { IBotContext } from '../services/context/context.interface';

export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
