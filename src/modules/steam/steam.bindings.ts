import { ContainerModule } from 'inversify';
import { BINDINGS, STEAM_BINDINGS } from '@typings/global.bindings';
import { ISteamService } from '@modules/steam/steam.interface';
import { SteamService } from '@modules/steam/steam.service';
import { SteamController } from '@modules/steam/steam.controller';
import { IController } from '@abstracts/controller.interface';

export const steamBindings = new ContainerModule((bind) => {
  bind<IController>(BINDINGS.Controllers).to(SteamController);
  bind<ISteamService>(STEAM_BINDINGS.ISteamService).to(SteamService);
});
