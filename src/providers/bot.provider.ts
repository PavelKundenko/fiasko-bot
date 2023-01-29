import { inject, injectable } from 'inversify';
import LocalSession from 'telegraf-session-local';
import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';
import { BINDINGS } from '@typings/global.bindings';
import { IConfigService } from '@services/config';
import 'reflect-metadata';

@injectable()
export class BotProvider {
  private readonly bot: Telegraf<IBotContext>;

  constructor(
    @inject(BINDINGS.IConfigService) private readonly configService: IConfigService,
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));

    const session = new LocalSession({ database: 'sessions.json' });

    this.bot.use(session.middleware());
  }

  getBot() {
    return this.bot;
  }
}
