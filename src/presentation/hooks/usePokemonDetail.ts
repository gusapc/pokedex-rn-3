import { useQuery } from '@tanstack/react-query';
import { toAppError } from '../../core/errors/AppError';
import { getContainer } from '../../core/di/container';

export function usePokemonDetail(id: string) {
    const query = useQuery({
        queryKey: ['pokemon', 'detail', id],
        queryFn: () => getContainer().getPokemonDetail(id),
    });

    return {
        detail: query.data ?? null,
        isLoading: query.isPending,
        error: query.error ? toAppError(query.error) : null,
        retry: query.refetch,
    };
}