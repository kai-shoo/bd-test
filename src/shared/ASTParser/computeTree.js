import { singleCalculate } from './config';

export function computeTree(root) {
	if (root.token.value != null && root.token.type === 'NUMBER') {
		return root.token.value;
	}

	if (['NAMED_FUNCTION', 'OPERATOR'].includes(root.token.type)) {
		let left = root.left && computeTree(root.left);
		let right = root.right && computeTree(root.right);
		console.log({ left, right })
		return singleCalculate(root.token.value, left, right)
	}
}
