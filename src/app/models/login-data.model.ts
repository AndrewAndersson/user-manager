export interface LoginRequestData {
    email: string;
    password: string;
}

export interface LoginResponseData {
    code: string;
    status: string;
    message: string;
    result: TokenData;
}

export interface TokenData {
    token: string;
    expiredAt: number;
}