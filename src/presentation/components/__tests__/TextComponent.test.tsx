import React from 'react';
import { render, screen } from '@testing-library/react-native';
import TextComponent from '../TextComponent/TextComponent';

describe('TextComponent', () => {
    it('renderiza el texto recibido', () => {
        render(<TextComponent text="Pikachu" />);
        expect(screen.getByText('Pikachu')).toBeTruthy();
    });

    it('mantiene el snapshot con variantes', () => {
        const tree = render(<TextComponent text="Snapshot" size="title" weight="bold" align="center" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});