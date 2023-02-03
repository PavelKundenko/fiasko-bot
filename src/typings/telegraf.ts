import { Telegraf } from 'telegraf';
import { IBotContext } from '@context/context.interface';

type TCommandMiddleware = Parameters<Telegraf<IBotContext>['command']>[1];

// @ts-ignore
export type TCommandContext = Parameters<TCommandMiddleware>[0];
