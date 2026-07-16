export enum AppErrorCode {
    Network = 'network',
    Timeout = 'timeout',
    Server = 'server',
    NotFound = 'not_found',
    Validation = 'validation',
    Unknown = 'unknown',
}

export class AppError extends Error {
    constructor(
        public readonly code: AppErrorCode,
        message?: string,
    ) {
        super(message ?? code);
        this.name = 'AppError';
    }

    static from(error: unknown): AppError {
        if (error instanceof AppError) return error;
        if (error instanceof Error && error.name === 'AbortError') return new AppError(AppErrorCode.Timeout);
        return new AppError(AppErrorCode.Unknown, error instanceof Error ? error.message : undefined);
    }
}