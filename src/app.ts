import { Telegraf } from 'telegraf';
import { inject, injectable } from 'inversify';
import LocalSession from 'telegraf-session-local';
import { IBotContext } from '@context/context.interface';
import { BINDINGS } from '@typings/bindings';
import { StartController } from '@modules/start';
import { SteamController } from '@modules/steam';
import { Command } from '@abstracts/command.abstract';
import { IConfigService } from '@services/config';
import 'reflect-metadata';

@injectable()
export class Bot {
  private readonly bot: Telegraf<IBotContext>;

  private commands: Command[] = [];

  constructor(
    @inject(BINDINGS.IConfigService) private readonly configService: IConfigService,
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));

    const session = new LocalSession({ database: 'sessions.json' });

    this.bot.use(session.middleware());
  }

  init() {
    this.commands = [
      new StartController(this.bot),
      new SteamController(this.bot),
    ];

    this.commands.forEach((command) => command.register());

    return this.bot.launch();
  }
}
