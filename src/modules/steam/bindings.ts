import { Container, ContainerModule } from 'inversify';
import { ISteamService } from '@modules/steam/steam.interface';
import { SteamService } from '@modules/steam/steam.service';
import { SteamController } from '@modules/steam/steam.controller';

export const STEAM_BINDINGS = {
  SteamController: Symbol.for('SteamController'),
  ISteamService: Symbol.for('ISteamService'),
};

const steamBindings = new ContainerModule((bind) => {
  bind<SteamController>(STEAM_BINDINGS.SteamController).to(SteamController);
  bind<ISteamService>(STEAM_BINDINGS.ISteamService).to(SteamService);
});

const steamContainer = new Container();

steamContainer.load(steamBindings);

export { steamContainer };
