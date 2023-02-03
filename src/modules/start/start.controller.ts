import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';
import { IController } from '@abstracts/controller.interface';
import { BINDINGS, START_BINDINGS } from '@typings/global.bindings';
import { BotProvider } from '@providers/bot.provider';
import { IStartService } from '@modules/start/start.interface';
import 'reflect-metadata';

@injectable()
export class StartController implements IController {
  private readonly bot: Telegraf<IBotContext>;

  constructor(
    @inject(BINDINGS.BotProvider) private provider: BotProvider,
    @inject(START_BINDINGS.IStartService) private startService: IStartService,
  ) {
    this.bot = provider.getBot();
  }

  register(): void {
    this.bot.start(this.startService.start);
  }
}
