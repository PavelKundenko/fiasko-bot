import { DotenvParseOutput, config } from 'dotenv';
import { injectable } from 'inversify';
import { IConfigService } from './config.interface';

@injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;

  constructor() {
    const { parsed, error } = config();

    if (error) {
      throw new Error('config not found');
    }

    if (!parsed) {
      throw new Error('config is empty');
    }

    this.config = parsed;
  }

  get(name: string): string {
    const key = this.config[name];

    if (!key) {
      throw new Error(`No '${name}' key was found`);
    }

    return key;
  }
}
