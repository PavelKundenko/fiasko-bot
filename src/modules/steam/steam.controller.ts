import { Telegraf } from 'telegraf';
import { inject, injectable, unmanaged } from 'inversify';
import { Controller } from '@abstracts/controller.abstract';
import { IBotContext } from '@context/context.interface';
import { ISteamService } from './steam.interface';
import { ESteamCommand } from './steam.commands';
import { SteamService } from './steam.service';
import 'reflect-metadata';

@injectable()
export class SteamController extends Controller {
  constructor(
    protected bot: Telegraf<IBotContext>,
    @inject(SteamService) private readonly steamService: ISteamService,
  ) {
    super(bot);
    console.log(steamService);
  }

  register(): void {
    this.bot.command(ESteamCommand.SubscribeSales, this.steamService.subscribe);

    this.bot.command(ESteamCommand.UnsubscribeSales, this.steamService.unsubscribe);
  }
}
