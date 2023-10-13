function throwDice(diceRollExpression: string): number {
  var numberOfRolls: number = parseInt(diceRollExpression.toLowerCase().split('d')[0]);
  var numberOfDiceSides: number = parseInt(diceRollExpression.toLowerCase().split('d')[1].split('+')[0]);
  return 1;
}
