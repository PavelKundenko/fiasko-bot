import {Telegraf, MiddlewareFn, NarrowedContext, } from 'telegraf';
import { IBotContext } from '@context/context.interface';

type TCommandMiddleware = Parameters<Telegraf<IBotContext>['command']>[1];

export type TCommandContext =  NarrowedContext<IBotContext, { message: Update.New & Update.NonChannel & Message.TextMessage, update_id: number}>
