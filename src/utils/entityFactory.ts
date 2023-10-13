import EntityType from '@/src/entities/entityType';
import Entity from '@/src/entities/entity';
import { roll } from './diceSimulator';

export function createPlayer(name: string): Entity {
  return {
    name,
    hitPoints: 12,
    damage: '1d8',
    armorClass: 12,
    entityType: EntityType.PLAYER,
  };
}

export function createGoblin(name: string): Entity {
  return {
    name,
    hitPoints: roll('1d8+1'),
    damage: '1d6',
    armorClass: 10,
    entityType: EntityType.GOBLIN,
  };
}
