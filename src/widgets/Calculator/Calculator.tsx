import { useEffect, useReducer } from 'react';
import { Numpad } from '../../entities/Numpad';
import { NumberInput } from '../../shared/NumberInput';
import { normalizeInput, normalizeResult } from './Calculator.helpers';
import styles from './Calculator.module.css';
import { ActionKind, State, Action } from './Calculator.types';
import computeExpression from '../../shared/ASTParser';
import { Key, NumpadButtonObj } from '../../entities/Numpad';
import { NUMPAD_BUTTONS, ALLOWED_CHARS, SYNONYMS_MAP, CHARS_WITH_ACTION } from './Calculator.constants';

const normalize = (value: string) => normalizeInput(value, ALLOWED_CHARS, SYNONYMS_MAP)

const initialState: State = {
    input: '',
    result: '',
}

const reducer: React.Reducer<State, Action> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.update:
            return {
                ...state,
                input: normalize(`${payload}`),
                result: '',
            }
        case ActionKind.clean:
            return {
                ...state,
                result: '',
                input: '',
            }
        case ActionKind.result:
            return {
                ...state,
                result: normalizeResult(computeExpression(state.input))
            }
        case ActionKind.append:
        case ActionKind.default:
            return {
                ...state,
                result: '',
                input: normalize(`${state.input}${payload}`)
            }
        default:
            return type as never;
    }
}

export function Calculator() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const actionsMapped = CHARS_WITH_ACTION.reduce((acc, keyObj: Key) => {
                if (typeof keyObj === 'object') {
                    acc[keyObj.key] = keyObj
                }
                return acc;
            }
                , {} as Record<string, NumpadButtonObj>)

            if (actionsMapped[key]?.actionType) {
                dispatch({ type: actionsMapped[key].actionType as ActionKind })
            } else {
                dispatch({ type: ActionKind.append, payload: key })
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown)
    })

    const handleChange: React.ChangeEventHandler = (event) => {
        const { value } = event.target as HTMLInputElement;
        dispatch({ type: ActionKind.update, payload: value });
    };

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
        if (!CHARS_WITH_ACTION.some((button: Key) => typeof button !== 'string' && button.key === event.key)) event.stopPropagation();
    }

    return <section className={styles.wrapper} >
        <div className={styles.Calculator}>
            <NumberInput value={state.input as string} onChange={handleChange} onKeyDown={handleKeyDown} />
            <div className={styles.result}>{state.result}</div>
            <hr />
            <Numpad keyboard={NUMPAD_BUTTONS} dispatch={dispatch}></Numpad>
        </div>
    </section >
}
