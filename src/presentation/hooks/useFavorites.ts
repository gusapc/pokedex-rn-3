import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pokemon } from '../../domain/entities/Pokemon';
import { getContainer } from '../../core/di/container';

const FAVORITES_KEY = ['favorites'];

export function useFavorites() {
    const query = useQuery({
        queryKey: FAVORITES_KEY,
        queryFn: () => getContainer().getFavorites(),
    });
    return { favorites: query.data ?? [], isLoading: query.isPending };
}

export function useToggleFavorite() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pokemon: Pokemon) => getContainer().toggleFavorite(pokemon),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: FAVORITES_KEY }),
    });
}