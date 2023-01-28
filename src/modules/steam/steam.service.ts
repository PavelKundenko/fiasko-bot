import { TCommandContext } from '@typings/telegraf';

export class SteamService {
  subscribe(ctx: TCommandContext) {
    if (!ctx.session.steamStoreSubscribed) {
      ctx.session.steamStoreSubscribed = true;

      ctx.reply('Subscribed to Steam Sales!');
    } else {
      ctx.reply('You are already subscribed');
    }
  };

  unsubscribe(ctx: TCommandContext) {}
}
