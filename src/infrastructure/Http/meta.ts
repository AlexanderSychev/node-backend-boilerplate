export const Server = Symbol('Server');

export interface IServer {
    start(): Promise<void>;
}
