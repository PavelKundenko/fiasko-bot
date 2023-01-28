import { inject, injectable } from 'inversify';
import LocalSession from 'telegraf-session-local';
import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';
import { BINDINGS } from '@typings/globalBindings';
import { IConfigService } from '@services/config';
import 'reflect-metadata';

@injectable()
export class BotProvider {
  public bot: Telegraf<IBotContext>;

  constructor(
    @inject(BINDINGS.IConfigService) private readonly configService: IConfigService,
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));

    const session = new LocalSession({ database: 'sessions.json' });

    this.bot.use(session.middleware());
  }
}
