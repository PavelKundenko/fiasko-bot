import { ContainerModule } from 'inversify';
import { BINDINGS, START_BINDINGS } from '@typings/global.bindings';
import { StartController } from '@modules/start/start.controller';
import { StartService } from '@modules/start/start.service';
import { IStartService } from '@modules/start/start.interface';
import { IController } from '@abstracts/controller.interface';

export const startBindings = new ContainerModule((bind) => {
  bind<IController>(BINDINGS.Controllers).to(StartController);
  bind<IStartService>(START_BINDINGS.IStartService).to(StartService).inSingletonScope();
});
