export type Snowflake = string;

export interface BotInfo {

}

export interface BotStats {
    user_count?: number,
    guild_count?: number,
    shard_count?: number,
    shards?: number
}

export interface WebhookPayload {
    id: Snowflake,
    votes: number,
    test: boolean,
    mode: string,
    payload: string,
    timestamp: string,
    query:
    |{
        [key: string]: string;
    }| string; 
}

declare module 'express' {
    export interface Request {
        votes?: WebhookPayload;
    }
}