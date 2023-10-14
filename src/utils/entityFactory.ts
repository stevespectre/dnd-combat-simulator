import EntityType from '@/src/entities/entityType';
import Entity from '@/src/entities/entity';
import { roll } from './diceSimulator';
import { PositionXY } from '../types/positionXY';

export function createPlayer(name: string, position?: PositionXY, strategy?: Strategy): Entity {
  return {
    name,
    hitPoints: 12,
    damage: '1d8',
    weaponRange: 1,
    attacksLeft: 1,
    movementRange: 2,
    movementsLeft: 2,
    armorClass: 12,
    entityType: EntityType.PLAYER,
    position: position ? position : { x: 0, y: 0 },
    strategy: strategy ? strategy : Strategy.NO_STRATEGY,
  };
}

export function createGoblin(name: string, position?: PositionXY, strategy?: Strategy): Entity {
  return {
    name,
    hitPoints: roll('1d8+1'),
    damage: '1d6',
    weaponRange: 1,
    attacksLeft: 1,
    movementRange: 2,
    movementsLeft: 2,
    armorClass: 10,
    entityType: EntityType.GOBLIN,
    position: position ? position : { x: 0, y: 0 },
    strategy: strategy ? strategy : Strategy.NO_STRATEGY,
  };
}
