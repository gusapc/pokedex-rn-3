import { AppErrorCode, createAppError, isAppError } from 'pokedex-rn-3/src/core/errors/AppError';

const DEFAULT_TIMEOUT_MS = 8000;

export const httpGet = async <T>(url: string, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<T> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            const code = response.status === 404 ? AppErrorCode.NotFound : AppErrorCode.Server;
            throw createAppError(code, `HTTP ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error) {
        if (isAppError(error)) throw error;
        if (error instanceof Error && error.name === 'AbortError') throw createAppError(AppErrorCode.Timeout);
        throw createAppError(AppErrorCode.Network, error instanceof Error ? error.message : undefined);
    } finally {
        clearTimeout(timer);
    }
};