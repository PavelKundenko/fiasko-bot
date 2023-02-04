import { injectable } from 'inversify';
import { TCommandContext } from '@typings/telegraf';
import { ESteamCommand } from '@modules/steam/steam.commands';
import { IStartService } from './start.interface';

@injectable()
export class StartService implements IStartService {
  start = (ctx: TCommandContext) => {
    ctx.reply('Hello, I\'m Team Fiasko bot');
    ctx.reply(this.getHelpText());
  };

  help = (ctx: TCommandContext) => {
    ctx.reply(this.getHelpText());
  };

  private getHelpText = () => {
    const commands = [
      `${ESteamCommand.Sales} - get current steam top 10 sales`,
      `${ESteamCommand.SubscribeSales} - subscribe to daily steam sales update`,
      `${ESteamCommand.UnsubscribeSales} - unsubscribe from steam sales`,
    ];

    return `Available commands:\n${commands.join('\n')}`;
  };
}
