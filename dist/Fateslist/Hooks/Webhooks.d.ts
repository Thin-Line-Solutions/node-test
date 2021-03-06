import { Request, Response, NextFunction } from 'express';
import { WebhookPayload } from '../../typings';
export interface WebhookOptions {
    error?: (error: Error) => void | Promise<void>;
}
export declare class Webhook {
    private token?;
    options: WebhookOptions;
    constructor(token?: string | undefined, options?: WebhookOptions);
    private _formatIncoming;
    private _parseRequest;
    hookListener(fn: (payload: WebhookPayload, req?: Request, res?: Response, next?: NextFunction) => void | Promise<void>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    middleware(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
