import { Container, ContainerModule } from 'inversify';
import { ConfigService, IConfigService } from '@services/config';
import { BINDINGS } from '@typings/bindings';
import { ILogger, LoggerService } from '@services/logger';
import { ApiService, IApiService } from '@services/api';
import { Bot } from './app';

const start = () => {
  const appContainer = new Container();

  const appBindings = new ContainerModule((bind) => {
    bind<Bot>(BINDINGS.Bot).to(Bot);
    bind<IConfigService>(BINDINGS.IConfigService).to(ConfigService);
    bind<ILogger>(BINDINGS.ILogger).to(LoggerService);
    bind<IApiService>(BINDINGS.IApiService).to(ApiService);
  });

  appContainer.load(appBindings);

  const bot = appContainer.get<Bot>(BINDINGS.Bot);

  bot.init();
};

start();
