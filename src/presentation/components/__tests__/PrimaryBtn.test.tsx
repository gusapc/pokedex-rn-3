import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';

describe('PrimaryBtn', () => {
    it('dispara onPress al tocarlo', () => {
        const onPress = jest.fn();
        render(<PrimaryBtn text="Entrar" onPress={onPress} />);
        fireEvent.press(screen.getByText('Entrar'));
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('no dispara onPress cuando está deshabilitado', () => {
        const onPress = jest.fn();
        render(<PrimaryBtn text="Entrar" onPress={onPress} disabled />);
        fireEvent.press(screen.getByText('Entrar'));
        expect(onPress).not.toHaveBeenCalled();
    });
});