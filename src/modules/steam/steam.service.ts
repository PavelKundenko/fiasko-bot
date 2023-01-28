import { injectable } from 'inversify';
import { TCommandContext } from '@typings/telegraf';
import { ISteamService } from './steam.interface';
import 'reflect-metadata';

@injectable()
export class SteamService implements ISteamService {
  public subscribe(ctx: TCommandContext) {
    if (!ctx.session.steamStoreSubscribed) {
      ctx.session.steamStoreSubscribed = true;

      ctx.reply('Subscribed to Steam Sales!');
    } else {
      ctx.reply('You are already subscribed');
    }
  }

  public unsubscribe(ctx: TCommandContext) {
    if (ctx.session.steamStoreSubscribed) {
      ctx.session.steamStoreSubscribed = false;

      ctx.reply('Unsubscribed from Steam Sales');
    } else {
      ctx.reply('You are not subscribed');
    }
  }
}
