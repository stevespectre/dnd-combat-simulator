export function roll(diceRollExpression: string): number {
  const expression = diceRollExpression.toLowerCase();
  const plus = diceRollExpression.indexOf('+') > -1;
  const minus = diceRollExpression.indexOf('-') > -1;
  const splitOnD = expression.split('d');
  const numberOfRolls = parseInt(splitOnD[0]);
  const regex = new RegExp('[+-]');
  const splitOnPlusMinus = splitOnD[1].split(regex);
  const numberOfDiceSides = plus || minus ? parseInt(splitOnPlusMinus[0]) : parseInt(splitOnD[1]);
  const extra = plus || minus ? parseInt(splitOnPlusMinus[1]) : 0;
  let result = 0;
  for (let i = 0; i < numberOfRolls; i++) {
    const rollResult = Math.floor(Math.random() * numberOfDiceSides + 1);
    result += rollResult;
  }
  if (plus) {
    result += extra;
  } else if (minus) {
    result -= extra;
  }

  return result;
}
