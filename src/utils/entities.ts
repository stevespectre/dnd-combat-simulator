import EntityType from '@/src/entities/entityType';
import BaseEntity from '@/src/entities/baseEntity';
import { roll } from './diceSimulator';

export function createPlayer(name: string): BaseEntity {
  const player: BaseEntity = {
    name,
    hitPoints: 12,
    damage: '1d8',
    armorClass: 12,
    entityType: EntityType.PLAYER,
  };
  return player;
}

export function createGoblin(name: string): BaseEntity {
  const goblin: BaseEntity = {
    name,
    hitPoints: roll('1d8+1'),
    damage: '1d6',
    armorClass: 10,
    entityType: EntityType.GOBLIN,
  };
  return goblin;
}
