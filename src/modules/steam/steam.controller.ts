import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { BotProvider } from '@providers/bot.provider';
import { IController } from '@abstracts/controller.interface';
import { IBotContext } from '@context/context.interface';
import {
  BINDINGS,
  STEAM_BINDINGS,
} from '@typings/global.bindings';
import { ISteamService } from './steam.interface';
import { ESteamCommand } from './steam.commands';
import 'reflect-metadata';

@injectable()
export class SteamController implements IController {
  private readonly bot: Telegraf<IBotContext>;

  constructor(
    @inject(BINDINGS.BotProvider) private readonly provider: BotProvider,
    @inject(STEAM_BINDINGS.ISteamService) private readonly steamService: ISteamService,
  ) {
    this.bot = provider.getBot();
  }

  register = () => {
    this.bot.command(ESteamCommand.SubscribeSales, this.steamService.subscribe);

    this.bot.command(ESteamCommand.UnsubscribeSales, this.steamService.unsubscribe);
  };
}
