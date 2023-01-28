import { Container, ContainerModule } from 'inversify';
import { ConfigService, IConfigService } from '@services/config';
import { BINDINGS } from '@typings/globalBindings';
import { ILogger, LoggerService } from '@services/logger';
import { ApiService, IApiService } from '@services/api';
import { steamBindings } from '@modules/steam/bindings';
import { App } from './app';
import { BotProvider } from './botProvider';

const start = () => {
  const appContainer = new Container();

  const appBindings = new ContainerModule((bind) => {
    bind<App>(BINDINGS.App).to(App).inSingletonScope();
    bind<BotProvider>(BINDINGS.BotProvider).to(BotProvider).inSingletonScope();
    bind<IConfigService>(BINDINGS.IConfigService).to(ConfigService).inSingletonScope();
    bind<ILogger>(BINDINGS.ILogger).to(LoggerService).inSingletonScope();
    bind<IApiService>(BINDINGS.IApiService).to(ApiService).inSingletonScope();
  });

  appContainer.load(appBindings);
  appContainer.load(steamBindings);

  const app = appContainer.get<App>(BINDINGS.App);

  app.init();

  process.on('SIGINT', () => app.stop('SIGINT'));
  process.on('SIGTERM', () => app.stop('SIGTERM'));
};

start();
