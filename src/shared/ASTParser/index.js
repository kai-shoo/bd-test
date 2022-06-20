import tokenize from "./tokenize";
import parse from "./parse";
import { computeTree } from './computeTree';

const build = expression => {
  console.log(parse(tokenize(expression)));
  return parse(tokenize(expression));
};

const computeExpression = expression => {
  try {
    const result = computeTree(build(expression));
    if (typeof result === 'number' && !Number.isNaN(result)) return result;
    throw new Error('Error')
  } catch {
    return 'ERROR'
  }
}

export { tokenize, parse, build };
export default computeExpression;

