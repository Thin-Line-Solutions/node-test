import fetch, { Headers } from 'node-fetch';
import FL_Error from '../Errors/ErrHandler';
import { EventEmitter } from 'events';
import { Snowflake, BotStats, BotInfo } from '../typings/index';
import e from 'express';

interface FL_Options {
    authToken?: string;
}

/**
 * FATE LIST CLIENT EXPORT
 */
export class FatesListClient extends EventEmitter {

    private options: FL_Options;

    constructor(auth: string, options: FL_Options = {}) {

        super();

        this.options = {
            authToken: auth,
            ...options
        };
    }

    /**
     * BASE REQUEST HANDLER
     */
     private async _request(method: string, path: string, body?: Record<string, any>): Promise<any> {

        const headers = new Headers();

        if (this.options.authToken) headers.set('authorization', this.options.authToken);
        if (method !== "GET") headers.set('Content-Type', 'application/json');

        let url = `https://api.infinitybotlist.com/${path}`

        if (body && method === "GET") url += `${new URLSearchParams(body)}`;

        const response = await fetch(url, {
            method,
            headers,
            body: body && method !== "GET" ? JSON.stringify(body) : undefined,
        });

        let responseBody;

        if (response.headers.get('Content-Type')?.startsWith("application/json")) {

            responseBody = await response.json();

        } else {

            responseBody = await response.text()

        }

        if (!response.ok) {
            throw new FL_Error(response.status, response.statusText, response);
        }

        return responseBody;
    }

    /**
     * POST BOT STATISTICS (SERVERS AND SHARDS)
     */
     public async postStats(stats: BotStats, botID: Snowflake): Promise<BotStats> {

        if (!stats) throw new Error(`[Fates API] You didn\'t provide any stats to post.`);
        if (stats.guild_count && !isNaN(stats.guild_count)) throw new Error(`[Fates API] No Server Count Provided or Server Count is not a Valid Integer`);

        /* eslint-disable camelcase */
        await this._request('POST', `bots/${botID}/stats`, {
            guild_count: stats.guild_count,
            shard_count: stats.shard_count,
            user_count: stats.user_count,
            shards: stats.shards
        });

        /* eslint-enable camelcase */

        return stats;
    }
}

