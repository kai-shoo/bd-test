import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { renderIntoDocument } from 'react-dom/test-utils';
import { NumpadButtonThemes } from '../../shared/NumpadButton';
import { ActionKind } from '../../widgets/Calculator/Calculator.types';
import { Key, Numpad } from './Numpad';

const dummyKeyboard: Key[][] = [
    ['j', '√', '%', '/'],
    ['7', '8', '9', { key: '×', synonyms: ['*'] }],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['00', '0', { key: ',', synonyms: ['.'] }, { key: '=', theme: NumpadButtonThemes.action, actionType: ActionKind.result, synonyms: ['Enter'] }]
];
const dummyHandleClick = jest.fn();

describe('GIVEN Numpad', () => {
    describe('WHEN component is mounted', () => {
        it('THEN renders the component', () => {
            render(<Numpad keyboard={dummyKeyboard} dispatch={dummyHandleClick} />);
            dummyKeyboard.flat().forEach(cell => {
                const key = typeof cell === 'object' ? cell.key : cell;
                expect(screen.getByText(key)).toBeInTheDocument();
            })
        });
    });
});


