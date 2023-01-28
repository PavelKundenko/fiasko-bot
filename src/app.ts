import { Telegraf } from 'telegraf';
import { inject, injectable } from 'inversify';
import LocalSession from 'telegraf-session-local';
import { IBotContext } from '@context/context.interface';
import { BINDINGS } from '@typings/globalBindings';
import { StartController } from '@modules/start';
import { SteamController } from '@modules/steam';
import { Controller } from '@abstracts/controller.abstract';
import { IConfigService } from '@services/config';
import { ILogger } from '@services/logger';
import 'reflect-metadata';

@injectable()
export class Bot {
  protected readonly bot: Telegraf<IBotContext>;

  private controllers: Controller[] = [];

  constructor(
    @inject(BINDINGS.IConfigService) private readonly configService: IConfigService,
    @inject(BINDINGS.ILogger) private readonly logger: ILogger,
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));

    const session = new LocalSession({ database: 'sessions.json' });

    this.bot.use(session.middleware());
  }

  init() {
    this.controllers = [
      new StartController(this.bot),
      // @ts-ignore
      new SteamController(this.bot),
    ];

    this.controllers.forEach((command) => command.register());

    this.bot.launch({ dropPendingUpdates: true }).then(() => {
      this.logger.log('Bot started!');
    });
  }

  stop(reason?: string) {
    this.bot.stop(reason);
  }
}
