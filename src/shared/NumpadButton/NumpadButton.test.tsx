import { fireEvent, render, screen } from '@testing-library/react';
import { NumpadButton, NumpadButtonThemes } from './NumpadButton';
import { Key } from '../../entities/Numpad';
import { ActionKind } from '../../widgets/Calculator/Calculator.types';

const dummyButton: Key = '2';
const dummyButtonObj: Key = { key: '=', actionType: ActionKind.result, synonyms: ['Enter'] };
const dummyHandleClick = jest.fn();

describe('GIVEN NumpadButton', () => {
    describe('WHEN is rendered', () => {
        it('THEN displays button value', () => {
            render(
                <NumpadButton theme={NumpadButtonThemes.default} onClick={dummyHandleClick}>{dummyButton}</NumpadButton>
            );
            expect(screen.getByText(dummyButton)).toBeInTheDocument();
        });
        it('THEN displays button object key', () => {
            render(
                <NumpadButton theme={NumpadButtonThemes.default} onClick={dummyHandleClick}>{dummyButtonObj.key}</NumpadButton>
            );
            expect(screen.getByText(dummyButtonObj.key)).toBeInTheDocument();
        });
    });

    describe('WHEN NumpadButton is clicked', () => {
        it('THEN calls handleClick once', () => {
            render(
                <NumpadButton theme={NumpadButtonThemes.default} onClick={dummyHandleClick}>{dummyButton}</NumpadButton>
            );
            fireEvent.click(screen.getByText(dummyButton));
            expect(dummyHandleClick).toHaveBeenCalledTimes(1);
        });
    });
});


