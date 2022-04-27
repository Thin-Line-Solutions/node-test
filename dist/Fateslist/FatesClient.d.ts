/// <reference types="node" />
import { EventEmitter } from 'events';
import { Snowflake, BotStats } from '../typings/index';
interface FL_Options {
    authToken?: string;
}
/**
 * FATE LIST CLIENT EXPORT
 */
export declare class FatesListClient extends EventEmitter {
    private options;
    constructor(auth: string, options?: FL_Options);
    /**
     * BASE REQUEST HANDLER
     */
    private _request;
    /**
     * POST BOT STATISTICS (SERVERS AND SHARDS)
     */
    postStats(stats: BotStats, botID: Snowflake): Promise<BotStats>;
}
export {};
