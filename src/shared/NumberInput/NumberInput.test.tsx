import { render, screen } from '@testing-library/react';
import { NumberInput } from './NumberInput';

const dummyValue = '123123 + qq1';
const dummyHandleClick = jest.fn();

describe('GIVEN NumpadInput', () => {
    describe('WHEN component is mounted', () => {
        it('THEN renders the component', () => {
            render(<NumberInput value={dummyValue} onChange={dummyHandleClick} onKeyDown={dummyHandleClick} />);
            expect(screen.getByDisplayValue(dummyValue)).toBeInTheDocument();
        })
    });
});


