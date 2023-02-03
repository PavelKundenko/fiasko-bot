import { Container, ContainerModule } from 'inversify';
import { ConfigService, IConfigService } from '@services/config';
import { BINDINGS } from '@typings/global.bindings';
import { ILogger, LoggerService } from '@services/logger';
import { ApiService, IApiService } from '@services/api';
import { steamBindings } from '@modules/steam/steam.bindings';
import { startBindings } from '@modules/start/start.bindings';
import { BotProvider } from '@providers/bot.provider';
import { App } from './app';

const start = () => {
  const appContainer = new Container();

  appContainer.bind<BotProvider>(BINDINGS.BotProvider).to(BotProvider).inSingletonScope();

  const appBindings = new ContainerModule((bind) => {
    bind<App>(BINDINGS.App).to(App).inSingletonScope();
    bind<IConfigService>(BINDINGS.IConfigService).to(ConfigService).inSingletonScope();
    bind<ILogger>(BINDINGS.ILogger).to(LoggerService).inSingletonScope();
    bind<IApiService>(BINDINGS.IApiService).to(ApiService).inSingletonScope();
  });

  appContainer.load(appBindings);
  appContainer.load(startBindings);
  appContainer.load(steamBindings);

  const app = appContainer.get<App>(BINDINGS.App);

  app.init();

  process.on('SIGINT', () => app.stop('SIGINT'));
  process.on('SIGTERM', () => app.stop('SIGTERM'));
};

start();
