import { Key } from './../../entities/Numpad/Numpad';

export const getChars = (keyboard: Key[][]) => {
	const SYNONYMS_MAP: Record<string, string> = {};
	const flattenChars = keyboard.flat().reduce((acc, cell) => {
		if (typeof cell === 'object' && cell.actionType) return [...acc]
		if (typeof cell === 'string') return [...acc, cell];
		if (cell.synonyms?.length) {
			cell.synonyms.forEach(char => SYNONYMS_MAP[char] = cell.key)
			return [...acc, ...cell.synonyms, cell.key];
		}
		return [...acc, cell.key];
	}, [] as string[])

	const charsWithAction = getCharsWithAction(keyboard);
	return { SYNONYMS_MAP, flattenChars, charsWithAction };
}

export const normalizeInput = (value: string, allowed: string[], synonyms?: Record<string, string>) => {
	const allowedInput = value.split('').filter(char => allowed.includes(char));
	return allowedInput.map(char => synonyms?.[char] || char).join('').trim();
}

export const normalizeResult = (result: number | 'ERROR') => {
	if (typeof result === 'number') {
		return result.toString().slice(0, 9);
	} else {
		return result;
	}
}

const getCharsWithAction = (keyboard: Key[][]) => {
	return keyboard.reduce((acc, row) =>
		[...acc, ...row.reduce((vals: Key[], button) =>
			typeof button === 'object' && button.actionType ? [...vals, button, ...(button.synonyms ? button.synonyms.map(item => { return { key: item, actionType: button.actionType } }) : [])] : [...vals]
			, [])
		]
		, [])
}