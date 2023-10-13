export function roll(diceRollExpression: string): number {
  const numberOfRolls = parseInt(diceRollExpression.toLowerCase().split('d')[0]);
  const plus = diceRollExpression.indexOf('+') > -1 ? true : false;
  const minus = diceRollExpression.indexOf('-') > -1 ? true : false;
  const regex = new RegExp('[+-]');
  const numberOfDiceSides =
    plus || minus
      ? parseInt(diceRollExpression.toLowerCase().split('d')[1].split(regex)[0])
      : parseInt(diceRollExpression.toLowerCase().split('d')[1]);
  const extra = plus || minus ? parseInt(diceRollExpression.toLowerCase().split('d')[1].split(regex)[1]) : 0;
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

  console.log('Dice roll expression: ' + numberOfRolls + 'd' + numberOfDiceSides + (plus ? '+' + extra : minus ? '-' + extra : ''));
  console.log('Result', result);
  return result;
}
