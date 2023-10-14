import Entity from '@/src/entities/entity';
import { roll } from '@/src/utils/diceSimulator';
import { PositionXY } from '../types/positionXY';
import { Action, ActionResult, ActionType } from '@/app/Context/gameState';

const d20: string = '1d20';

export function action(attacker: Entity, defenders: Entity[]): Action {
  const distanceMap = getDistanceMap(attacker, defenders);

  let target: Entity;
  switch (attacker.strategy) {
    case Strategy.NEAREST:
      target = getNearestTarget(distanceMap);
      break;
    case Strategy.LOWEST_HEALTH:
      target = getLowestHealthTarget(defenders);
      break;
    case Strategy.REVENGE:
      target = attacker.lastAttacker!;
      break;
    default:
      target = defenders[roll('1d' + (defenders.length - 1))];
  }

  const targetDistance = distanceMap.get(target)!;

  if (attacker.weaponRange >= targetDistance) {
    return attack(attacker, target);
  } else {
    return move(attacker, target);
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

function attack(attacker: Entity, defender: Entity): Action {
  attacker.attacksLeft--;

  const attackRoll = roll(d20);

  if (attackRoll < defender.armorClass) {
    return {
      type: ActionType.ATTACK,
      source: attacker.name,
      target: defender.name,
      roll: attackRoll,
      result: ActionResult.MISS,
      value: 0,
    };
  }

  return damage(attacker, attackRoll, defender);
}

function move(attacker: Entity, target: Entity) {
  attacker.movementsLeft--;
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

  return {
    type: ActionType.MOVE,
    source: attacker.name,
    target: `(${attackerPosition.x},${attackerPosition.y})`,
    roll: 0,
    result: ActionResult.MOVED,
    value: 0,
  };
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

function damage(attacker: Entity, attackRoll: number, defender: Entity): Action {
  let damageRoll = roll(attacker.damage);

  if (attackRoll == 20) {
    damageRoll += roll(attacker.damage);
  }

  defender.hitPoints -= damageRoll;
  defender.lastAttacker = attacker;

  return {
    type: ActionType.ATTACK,
    source: attacker.name,
    target: defender.name,
    roll: attackRoll,
    result: attackRoll === 20 ? ActionResult.CRITICAL : ActionResult.HIT,
    value: damageRoll,
  };
}
