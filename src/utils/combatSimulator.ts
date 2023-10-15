import Entity from '@/src/entities/entity';
import { roll } from '@/src/utils/diceSimulator';
import { Action, ActionResult, ActionType } from '@/app/Context/gameState';
import { Strategy } from '@/src/types/stragegy';
import { Dispatch, SetStateAction } from 'react';
import useMovementHelper from '@/src/utils/movementHelper';

type Props = {
  entities: Entity[];
  setEntities: Dispatch<SetStateAction<Entity[]>>;
};

export default function useCombatSimulator({ entities, setEntities }: Props) {
  const d20: string = '1d20';
  const [move] = useMovementHelper({ entities, setEntities });

  function action(attacker: Entity, defenders: Entity[]): Action {
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
        target = defenders[roll('1d' + (defenders.length - 1)) - 1];
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

  function damage(attacker: Entity, attackRoll: number, defender: Entity): Action {
    let damageRoll = roll(attacker.damage);

    if (attackRoll == 20) {
      damageRoll += roll(attacker.damage);
    }

    defender.hitPoints -= damageRoll;
    defender.lastAttacker = attacker;

    setEntities((prevState) => {
      return prevState.map((entity) => {
        if (entity.name === defender.name) {
          return defender;
        }

        return entity;
      });
    });

    return {
      type: ActionType.ATTACK,
      source: attacker.name,
      target: defender.name,
      roll: attackRoll,
      result: attackRoll === 20 ? ActionResult.CRITICAL : ActionResult.HIT,
      value: damageRoll,
    };
  }

  return [action];
}
