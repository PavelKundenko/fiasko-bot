import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { IConfigService } from '@services/config/config.interface';
import { ConfigService } from '@services/config/config.service';
import { IBotContext } from '@context/context.interface';
import { StartCommand } from '@modules/start';
import { SteamCommand } from '@modules/steam';
import { Command } from '@commands/command.abstract';

class Bot {
  bot: Telegraf<IBotContext>;

  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));

    const session = new LocalSession({ database: 'sessions.json' });

    this.bot.use(session.middleware());
  }

  init() {
    this.commands = [
      new StartCommand(this.bot),
      new SteamCommand(this.bot),
    ];

    this.commands.forEach((command) => command.handle());

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());

bot.init();
