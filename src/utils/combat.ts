import Entity from '@/src/entities/entity';
import { roll } from '@/src/utils/diceSimulator';
import { PositionXY } from '../types/positionXY';

const d20: string = '1d20';

export function action(attacker: Entity, defenders: Entity[]) {
  const distanceMap = getDistanceMap(attacker, defenders);

  let target: Entity;
  switch (attacker.strategy) {
    case Strategy.NEAREST:
      target = getNearestTarget(distanceMap);
      break;
    case Strategy.LOWEST_HEALTH:
      target = getLowestHealthTarget(defenders);
      break;
    default:
      target = defenders[roll('1d' + (defenders.length - 1))];
  }

  const targetDistance = distanceMap.get(target)!;

  if (attacker.attacksLeft > 0) {
    if (attacker.weaponRange >= targetDistance) {
      attack(attacker, target);
      attacker.attacksLeft--;
      if (target.hitPoints <= 0) {
        defenders = defenders.filter((defender) => defender !== target);
      }
      action(attacker, defenders);
    } else if (attacker.movementsLeft > 0) {
      move(attacker, target);
      attacker.movementsLeft--;
      action(attacker, defenders);
    }
  }
}

function getDistanceMap(attacker: Entity, defenders: Entity[]): Map<Entity, number> {
  let distanceMap = new Map<Entity, number>();
  defenders.forEach((defender: Entity) => {
    distanceMap.set(defender, Math.max(attacker.position.x - defender.position.x, attacker.position.y - defender.position.y));
  });
  return distanceMap;
}

function getNearestTarget(distanceMap: Map<Entity, number>): Entity {
  let closestDefender: Entity;
  distanceMap.forEach((distance, defender) => {
    if (!closestDefender || (distanceMap && closestDefender && distanceMap.get(closestDefender)! > distance)) {
      closestDefender = defender;
    }
  });
  return closestDefender!;
}

function getLowestHealthTarget(defenders: Entity[]): Entity {
  return defenders.sort((a, b) => (a.hitPoints < b.hitPoints ? -1 : a.hitPoints > b.hitPoints ? 1 : 0))[0];
}

function attack(attacker: Entity, defender: Entity) {
  attacker.attacksLeft;
  console.log(attacker.name, 'attacks', defender.name);

  const attackRoll = roll(d20);

  console.log(attacker.name, 'rolls for attack');

  if (attackRoll < defender.armorClass) {
    console.log(attackRoll, 'is a miss');
    return;
  }

  if (attackRoll == 20) {
    console.log('Natural', 20, 'is a critical hit!');
    damage(attacker.damage, true, defender);
    return;
  }

  console.log(attackRoll, 'is a hit');
  damage(attacker.damage, false, defender);
}

function move(attacker: Entity, target: Entity) {
  const attackerPosition = attacker.position;
  const defenderPosition = target.position;

  // if target is diagonal to attacker
  if (defenderPosition.x - attackerPosition.x === defenderPosition.y - attackerPosition.y) {
    diagonalMovement(attackerPosition, defenderPosition);
  } else if (defenderPosition.x - attackerPosition.x !== 0 && defenderPosition.y - attackerPosition.y === 0) {
    xAxisMovement(attackerPosition, defenderPosition);
  } else {
    yAxisMovement(attackerPosition, defenderPosition);
  }
}

function diagonalMovement(attackerPosition: PositionXY, defenderPosition: PositionXY) {
  if (defenderPosition.x > attackerPosition.x) {
    attackerPosition.x++;
  } else {
    attackerPosition.x--;
  }
  if (defenderPosition.y > attackerPosition.y) {
    attackerPosition.y++;
  } else {
    attackerPosition.y--;
  }
}

function xAxisMovement(attackerPosition: PositionXY, defenderPosition: PositionXY) {
  if (defenderPosition.x > attackerPosition.x) {
    attackerPosition.x++;
  } else {
    attackerPosition.x--;
  }
}

function yAxisMovement(attackerPosition: PositionXY, defenderPosition: PositionXY) {
  if (defenderPosition.y > attackerPosition.y) {
    attackerPosition.y++;
  } else {
    attackerPosition.y--;
  }
}

// If we want to abide by the official 3.5 rules
function confirmCritical(attacker: Entity, defender: Entity) {
  console.log('Natural', 20, 'is a potential critical hit!');
  console.log(attacker.name, 'rolls to confirm critical hit');

  const confirmCritical = roll(d20);

  if (confirmCritical < defender.armorClass) {
    console.log(confirmCritical, 'is not a critical hit!');
    damage(attacker.damage, false, defender);
    return;
  }

  console.log(confirmCritical, 'is a critical hit!');
  damage(attacker.damage, true, defender);
}

export function damage(damage: string, isCritical: boolean, defender: Entity) {
  let damageRoll = roll(damage);

  if (isCritical) {
    damageRoll += roll(damage);
  }

  defender.hitPoints -= damageRoll;

  console.log(defender.name, 'suffers', damageRoll, 'damage');
}
