import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { AppErrorCode, createAppError } from '../../../core/errors/AppError';
import ErrorView from '../ErrorView/ErrorView';

describe('ErrorView', () => {
    it('traduce el código de error a un mensaje amigable', () => {
        render(<ErrorView error={createAppError(AppErrorCode.Network)} onRetry={() => { }} />);
        expect(screen.getByText('Sin conexión, revisa tu internet')).toBeTruthy();
    });

    it('permite reintentar', () => {
        const onRetry = jest.fn();
        render(<ErrorView error={createAppError(AppErrorCode.Timeout)} onRetry={onRetry} />);
        fireEvent.press(screen.getByText('Reintentar'));
        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});