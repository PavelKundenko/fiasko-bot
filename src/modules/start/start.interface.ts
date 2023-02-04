import { TCommandContext } from '@typings/telegraf';

export interface IStartService {
  start(ctx: TCommandContext): void;

  help(ctx: TCommandContext): void;
}
