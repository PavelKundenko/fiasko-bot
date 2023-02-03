import { injectable } from 'inversify';
import { TCommandContext } from '@typings/telegraf';
import { IStartService } from './start.interface';

@injectable()
export class StartService implements IStartService {
  start(ctx: TCommandContext) {
    ctx.reply('Hello, I\'m Team Fiasko bot');
  }
}
