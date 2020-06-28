export default class HttpError extends Error {
    public statusCode: number;

    public statusMessage: string;

    public details: any;

    public constructor(statusCode: number, statusMessage: string, details?: any) {
        super(`HTTP request error: ${statusMessage}`);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.details = details;
    }
}
