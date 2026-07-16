export enum AppErrorCode {
    Network = 'network',
    Timeout = 'timeout',
    Server = 'server',
    NotFound = 'not_found',
    Validation = 'validation',
    Unknown = 'unknown',
}

export interface AppError extends Error {
    code: AppErrorCode;
}

const APP_ERROR_NAME = 'AppError';

export const createAppError = (code: AppErrorCode, message?: string): AppError =>
    Object.assign(new Error(message ?? code), { name: APP_ERROR_NAME, code });

export const isAppError = (error: unknown): error is AppError =>
    error instanceof Error && error.name === APP_ERROR_NAME;

export const toAppError = (error: unknown): AppError => {
    if (isAppError(error)) return error;
    if (error instanceof Error && error.name === 'AbortError') return createAppError(AppErrorCode.Timeout);
    return createAppError(AppErrorCode.Unknown, error instanceof Error ? error.message : undefined);
};