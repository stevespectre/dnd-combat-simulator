import Entity from '@/src/entities/entity';
import { ActionResult, ActionType } from '@/app/Context/gameState';
import { PositionXY } from '@/src/types/positionXY';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  entities: Entity[];
  setEntities: Dispatch<SetStateAction<Entity[]>>;
};

export default function useMovementHelper({ entities, setEntities }: Props) {
  function move(attacker: Entity, target: Entity) {
    attacker.movementsLeft--;
    const attackerPosition = attacker.position;
    const defenderPosition = target.position;

    moveTowards(attacker, defenderPosition);

    setEntities((prevState) => {
      return prevState.map((entity) => {
        if (entity.name === attacker.name) {
          return attacker;
        }

        return entity;
      });
    });

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

  function moveTowards(attacker: Entity, defenderPosition: PositionXY) {
    const dx = defenderPosition.x - attacker.position.x;
    const dy = defenderPosition.y - attacker.position.y;

    if (dx !== 0) {
      const newX = attacker.position.x + Math.sign(dx);
      if (!isPositionOccupied(newX, attacker.position.y)) {
        attacker.position.x = newX;
      } else {
        const newY = attacker.position.y + Math.sign(dy);
        if (!isPositionOccupied(attacker.position.x, newY)) {
          attacker.position.y = newY;
        }
      }
    } else if (dy !== 0) {
      const newY = attacker.position.y + Math.sign(dy);
      if (!isPositionOccupied(attacker.position.x, newY)) {
        attacker.position.y = newY;
      } else {
        const newX = attacker.position.x + Math.sign(dx);
        if (!isPositionOccupied(newX, attacker.position.y)) {
          attacker.position.x = newX;
        }
      }
    }
  }

  function isPositionOccupied(x: number, y: number): boolean {
    const entityOnPosition = entities.find((entity) => entity.position.x === x && entity.position.y === y);
    return Boolean(entityOnPosition);
  }

  return [move];
}
