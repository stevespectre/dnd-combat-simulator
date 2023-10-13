import EntityType from '@/src/entities/entityType';
import Entity from '@/src/entities/entity';
import { roll } from './diceSimulator';
import goblin from "../../src/assets/images/goblin.png";
import hero from "../../src/assets/images/hero.png";

export function createPlayer(name: string): Entity {
  return {
    name,
    image: hero.src,
    hitPoints: 12,
    damage: '1d8',
    armorClass: 12,
    entityType: EntityType.PLAYER,
  };
}

export function createGoblin(name: string): Entity {
  return {
    name,
    image: goblin.src,
    hitPoints: roll('1d8+1'),
    damage: '1d6',
    armorClass: 10,
    entityType: EntityType.GOBLIN,
  };
}
