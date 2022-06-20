import types from "./types";

const config = {
  rules: [
    {
      key: "sin|cos|tg|ctg|log|sqrt|√|%",
      data: {
        type: types.NAMED_FUNCTION,
        args: 1,
        precedence: 4
      }
    },
    {
      key: "PI|E|pi|e",
      data: {
        type: types.CONSTANT
      }
    },
    {
      key: "[\\^]",
      data: {
        type: types.OPERATOR,
        args: 2,
        precedence: 3
      }
    },
    {
      key: "[\\*×\\/]",
      data: {
        type: types.OPERATOR,
        args: 2,
        precedence: 2
      }
    },
    {
      key: "[\\+\\-]",
      data: {
        type: types.OPERATOR,
        args: 2,
        precedence: 1
      }
    },
    { key: "[(\\[]", data: { type: types.LEFT_PARENTHESIS } },
    { key: "[)\\]]", data: { type: types.RIGHT_PARENTHESIS } },
    { key: "[0-9.,]+", data: { type: types.NUMBER } },
    { key: "[a-zA-Z]", data: { type: types.VARIABLE } }
  ]
};

export const singleCalculate = (operation, arg1, arg2) => {
  const number1 = Number(typeof arg1 === 'string' ? arg1?.replace(',', '.') : arg1);
  const number2 = Number(typeof arg2 === 'string' ? arg2?.replace(',', '.') : arg2);
  console.log({ operation, number1, arg1, number2, arg2 })
  switch (operation) {
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "*":
    case "×":
      return number1 * number2;
    case "/":
      return number1 / number2;
    case "√":
      return Math.sqrt(number1);
    case "%":
      return number1 / 100;
    default:
      throw new Error('Unknown operation')
  }
}

export default config;
