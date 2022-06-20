import { fireEvent, render, screen } from '@testing-library/react';
import { Calculator } from './Calculator';

// const dummyHandleClick = jest.fn();

describe('GIVEN Calculator', () => {
    describe('WHEN is rendered', () => {
        it('THEN displays Calculator', () => {
            render(
                <Calculator />
            );
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });
    });
});


