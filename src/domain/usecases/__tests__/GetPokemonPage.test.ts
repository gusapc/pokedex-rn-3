/// <reference types="jest" />

import { makeGetPokemonPage, PAGE_SIZE } from 'pokedex-rn-3/src/domain/usecases/GetPokemonPage';
import { PokemonRepository } from 'pokedex-rn-3/src/domain/repositories/PokemonRepository';

const repositoryMock: jest.Mocked<PokemonRepository> = {
    getPage: jest.fn(),
};

describe('getPokemonPage', () => {
    beforeEach(() => jest.clearAllMocks());

    it('pide la primera página de 20 por defecto', async () => {
        repositoryMock.getPage.mockResolvedValue({ items: [], nextOffset: 20 });
        await makeGetPokemonPage(repositoryMock)();
        expect(repositoryMock.getPage).toHaveBeenCalledWith(0, PAGE_SIZE);
    });

    it('respeta el offset recibido', async () => {
        repositoryMock.getPage.mockResolvedValue({ items: [], nextOffset: null });
        await makeGetPokemonPage(repositoryMock)(40);
        expect(repositoryMock.getPage).toHaveBeenCalledWith(40, PAGE_SIZE);
    });
});