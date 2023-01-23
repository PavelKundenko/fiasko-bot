import { Container } from 'inversify';
import { ConfigService, IConfigService } from '@services/config';
import { BINDINGS } from '@typings/bindings';
import { ILogger, LoggerService } from '@services/logger';
import { Bot } from './app';

const appContainer = new Container();

appContainer.bind<IConfigService>(BINDINGS.IConfigService).to(ConfigService);
appContainer.bind<ILogger>(BINDINGS.ILogger).to(LoggerService);

const bot = appContainer.get<Bot>(BINDINGS.Bot);

bot.init();

export { bot, appContainer };
