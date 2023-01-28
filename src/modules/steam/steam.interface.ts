import { TCommandContext } from '@typings/telegraf';

export interface ISteamService {
  subscribe: (ctx: TCommandContext) => void;

  unsubscribe: (ctx: TCommandContext) => void;
}
