declare class ResponseInterface {
    results?: any;
    error?: boolean;
    message: string;
    status: number;
}
export declare class ResponseSuccessInterface extends ResponseInterface {
    results?: any;
}
export declare class ResponseErrorInterface extends ResponseInterface {
    error?: boolean;
}
export {};
