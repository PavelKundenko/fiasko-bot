import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from '@services/logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
  logger: Logger<{}>;

  constructor() {
    this.logger = new Logger();
  }

  log(args: unknown | unknown[]): void {
    if (Array.isArray(args)) {
      this.logger.info(...args);
    } else {
      this.logger.info(args);
    }
  }

  error(args: unknown | unknown[]): void {
    if (Array.isArray(args)) {
      this.logger.error(...args);
    } else {
      this.logger.error(args);
    }
  }

  warn(args: unknown | unknown[]): void {
    if (Array.isArray(args)) {
      this.logger.warn(...args);
    } else {
      this.logger.warn(args);
    }
  }
}
