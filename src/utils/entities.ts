import EntityType from '@/src/entities/entityType';
import Entity from '@/src/entities/entity';
import { roll } from './diceSimulator';

export function createPlayer(name: string): Entity {
  const player: Entity = {
    name,
    hitPoints: 12,
    damage: '1d8',
    armorClass: 12,
    entityType: EntityType.PLAYER,
  };
  return player;
}

export function createGoblin(name: string): Entity {
  const goblin: Entity = {
    name,
    hitPoints: roll('1d8+1'),
    damage: '1d6',
    armorClass: 10,
    entityType: EntityType.GOBLIN,
  };
  return goblin;
}
