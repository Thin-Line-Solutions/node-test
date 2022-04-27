export default class FL_Error extends Error {
    response?: Response;
    constructor(status: number, message: string, response: Response);
}
