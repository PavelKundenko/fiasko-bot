import { Container, ContainerModule } from 'inversify';
import { ConfigService, IConfigService } from '@services/config';
import { BINDINGS } from '@typings/globalBindings';
import { ILogger, LoggerService } from '@services/logger';
import { ApiService, IApiService } from '@services/api';
import { Bot } from './app';

const start = () => {
  const appContainer = new Container();

  const appBindings = new ContainerModule((bind) => {
    bind<Bot>(BINDINGS.Bot).to(Bot).inSingletonScope();
    bind<IConfigService>(BINDINGS.IConfigService).to(ConfigService).inSingletonScope();
    bind<ILogger>(BINDINGS.ILogger).to(LoggerService).inSingletonScope();
    bind<IApiService>(BINDINGS.IApiService).to(ApiService).inSingletonScope();
  });

  appContainer.load(appBindings);

  const bot = appContainer.get<Bot>(BINDINGS.Bot);

  bot.init();

  process.on('SIGINT', () => bot.stop('SIGINT'));
  process.on('SIGTERM', () => bot.stop('SIGTERM'));
};

start();
