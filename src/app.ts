import { inject, injectable, multiInject } from 'inversify';
import { Telegraf } from 'telegraf';
import { BINDINGS } from '@typings/global.bindings';
import { ILogger } from '@services/logger';
import { BotProvider } from '@providers/bot.provider';
import { IBotContext } from '@context/context.interface';
import { IController } from '@abstracts/controller.interface';
import 'reflect-metadata';

@injectable()
export class App {
  private bot: Telegraf<IBotContext>;

  constructor(
    @inject(BINDINGS.BotProvider) private readonly provider: BotProvider,
    @inject(BINDINGS.ILogger) private readonly logger: ILogger,
    @multiInject(BINDINGS.Controllers) private readonly controllers: IController[],
  ) {
    this.bot = provider.getBot();
  }

  init() {
    this.controllers.forEach((command) => command.register());

    this.bot.launch({ dropPendingUpdates: true }).then(() => {
      this.logger.log('Bot started!');
    });
  }

  stop(reason?: string) {
    this.bot.stop(reason);
  }
}
