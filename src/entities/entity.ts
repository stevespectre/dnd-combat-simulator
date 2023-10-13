import EntityType from '@/src/entities/entityType';
import { PositionXY } from '../types/positionXY';

interface Entity {
  /**
   * Name of the entity for monsters it will ba static based on the Monster Type for players it can be custom
   */
  name: string;

  /**
   * Hit points can be either a static number or a string on which we randomly generate
   * For example, player HP: 12, monster hp: 1d8+1 (these are interchangeable)
   */
  hitPoints: number;

  /**
   * Damage is a random generated number
   * For example 1d6
   */
  damage: string;

  /**
   * Range of the character's weapon on the grid, minimum 1
   */
  weaponRange: number;

  /**
   * The number of actions the character can take during a turn
   */
  attacksLeft: number;

  /**
   * Range of the character's movement on the grid, minimum 1
   */
  movementRange: number;

  /**
   * The number of cells the character can move during a turn
   */
  movementsLeft: number;

  /**
   * Or AC for shorthand, determines the defense of a certain entity
   * For example 14
   */
  armorClass: number;

  /**
   * Determines the entity type, will be useful for determining image for the token to be displayed
   * It can also be used to determine if it's a monster entity - entityType != EntityType.PLAYER
   */
  entityType: EntityType;

  /**
   * The position of the entity on the grid.
   */
  position: PositionXY;

  /**
   * The attack strategy of the the character
   */
  strategy: Strategy;

  /**
   * The last entity that attacked this entity
   */
  lastAttacker?: Entity;
}

export default Entity;
