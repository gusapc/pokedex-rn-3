import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { toAppError } from '../../core/errors/AppError';
import { Pokemon } from '../../domain/entities/Pokemon';
import { Region } from '../../domain/entities/Region';
import { getContainer } from '../../core/di/container';

export function usePokemonList(region: Region) {
    const isNational = region === Region.National;

    const national = useInfiniteQuery({
        queryKey: ['pokemon', 'national'],
        queryFn: ({ pageParam }) => getContainer().getPokemonPage(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
        enabled: isNational,
    });

    const regional = useQuery({
        queryKey: ['pokemon', 'region', region],
        queryFn: () => getContainer().getPokemonByRegion(region),
        enabled: !isNational,
    });

    const items: Pokemon[] = isNational
        ? (national.data?.pages.flatMap((page) => page.items) ?? [])
        : (regional.data ?? []);

    const isLoading = isNational ? national.isPending : regional.isPending;
    const rawError = isNational ? national.error : regional.error;

    const loadMore = () => {
        if (isNational && national.hasNextPage && !national.isFetchingNextPage) national.fetchNextPage();
    };

    return {
        items,
        isLoading,
        error: rawError ? toAppError(rawError) : null,
        isLoadingMore: isNational && national.isFetchingNextPage,
        retry: isNational ? national.refetch : regional.refetch,
        loadMore,
    };
}