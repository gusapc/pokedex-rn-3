import { makeGetPokemonPage, PAGE_SIZE } from '../GetPokemonPage';
import { PokemonRepository } from '../../repositories/PokemonRepository';

const repositoryMock: jest.Mocked<PokemonRepository> = {
    getPage: jest.fn(),
    getDetail: jest.fn(),
    getByRegion: jest.fn(),
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