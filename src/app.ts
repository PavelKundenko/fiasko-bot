import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { IConfigService } from './services/config/config.interface';
import { ConfigService } from './services/config/config.service';
import { IBotContext } from './context/context.interface';
import { Command } from './commands/command.class';
import {StartCommand} from './commands/start.command';

class Bot {
  bot: Telegraf<IBotContext>;

  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<any>(this.configService.get('TELEGRAM_TOKEN'));

    const session = new LocalSession({ database: 'sessions.json' });

    this.bot.use(session.middleware());
  }

  init() {
    this.commands = [
      new StartCommand(this.bot),
    ];

    this.commands.forEach((command) => command.handle());

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());

bot.init();
