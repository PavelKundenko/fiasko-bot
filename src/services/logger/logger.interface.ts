import { Logger } from 'tslog';

export interface ILogger {
  logger: Logger<{}>;

  log(args: unknown | unknown[]): void;
  error(args: unknown | unknown[]): void;
  warn (args: unknown | unknown[]): void;
}
