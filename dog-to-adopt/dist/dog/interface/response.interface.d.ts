declare class ResponseInterface {
    results?: {};
    error?: boolean;
    message: string;
    status: number;
}
export declare class ResponseSuccessInterface extends ResponseInterface {
    results?: {};
}
export declare class ResponseErrorInterface extends ResponseInterface {
    error?: boolean;
}
export {};
