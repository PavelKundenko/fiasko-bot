import { Telegraf } from 'telegraf';
import { inject } from 'inversify';
import { Controller } from '@abstracts/controller.abstract';
import { IBotContext } from '@context/context.interface';
import { STEAM_BINDINGS } from './bindings';
import { ISteamService } from './steam.interface';
import { ESteamCommand } from './steam.commands';
import 'reflect-metadata';
import { SteamService } from '@modules/steam/steam.service';

export class SteamController extends Controller {
  constructor(
    protected bot: Telegraf<IBotContext>,
    @inject(SteamService) private readonly steamService: ISteamService,
  ) {
    super(bot);
  }

  register(): void {
    this.bot.command(ESteamCommand.SubscribeSales, this.steamService.subscribe);

    this.bot.command(ESteamCommand.UnsubscribeSales, this.steamService.unsubscribe);
  }
}
