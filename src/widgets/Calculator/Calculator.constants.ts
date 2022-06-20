import { ActionKind } from './Calculator.types';
import { Key } from './../../entities/Numpad/Numpad';
import { NumpadButtonThemes } from '../../shared/NumpadButton';
import { getChars } from './Calculator.helpers';

export const NUMPAD_BUTTONS: Key[][] = [
    [{ key: 'C', synonyms: ['Escape'], actionType: ActionKind.clean }, '√', '%', '/'],
    ['7', '8', '9', { key: '×', synonyms: ['*'] }],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['00', '0', { key: ',', synonyms: ['.'] }, { key: '=', theme: NumpadButtonThemes.action, actionType: ActionKind.result, synonyms: ['Enter'] }],
]

export const { flattenChars: ALLOWED_CHARS, SYNONYMS_MAP, charsWithAction: CHARS_WITH_ACTION } = getChars(NUMPAD_BUTTONS);
