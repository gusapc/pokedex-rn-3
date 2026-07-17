import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PokeItem from '../PokeItem/PokeItem';

describe('PokeItem', () => {
    it('muestra el nombre y el número de pokedex', () => {
        render(<PokeItem id="25" name="Pikachu" imageUrl="https://example.com/25.png" />);
        expect(screen.getByText('Pikachu')).toBeTruthy();
        expect(screen.getByText('#25')).toBeTruthy();
    });
});