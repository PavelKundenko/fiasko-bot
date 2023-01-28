import { inject, injectable } from 'inversify';
import { BINDINGS } from '@typings/globalBindings';
import { Controller } from '@abstracts/controller.abstract';
import { ILogger } from '@services/logger';
import { BotProvider } from './botProvider';
import 'reflect-metadata';

@injectable()
export class App {
  private controllers: Controller[] = [];

  constructor(
    @inject(BINDINGS.BotProvider) private readonly provider: BotProvider,
    @inject(BINDINGS.ILogger) private readonly logger: ILogger,
  ) {}

  init() {
    // this.controllers = [
    //   new StartController(this.bot),
    //   new SteamController(this.bot),
    // ];
    //
    // this.controllers.forEach((command) => command.register());

    this.provider.bot.launch({ dropPendingUpdates: true }).then(() => {
      this.logger.log('Bot started!');
    });
  }

  stop(reason?: string) {
    this.provider.bot.stop(reason);
  }
}
