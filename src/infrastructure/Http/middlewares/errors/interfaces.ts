/** Standard error body signature */
export interface IErrorBody<T = {}> {
    /** HTTP Status code */
    statusCode: number;
    /** HTTP Status message */
    statusMessage: string;
    /** Error's message */
    message: string;
    /** Additional data (not necessary) */
    details?: T
}

/** Any error in application which can be transformed into "IErrorBody<T>" interface */
export interface ITransformableError<T = {}> extends Error {
    /** Returns JSON response body for error (without status message) */
    getBody(): Pick<IErrorBody<T>, 'statusCode' | 'message' | 'details'>
}
