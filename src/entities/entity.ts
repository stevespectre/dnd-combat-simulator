import EntityType from '@/entities/entityType';

interface Entity {
  /**
   * Name of the entity for monsters it will ba static based on the Monster Type for players it can be custom
   */
  name: string;

  /**
   * Hit points can be either a static number or a string on which we randomly generate
   * For example, player HP: 12, monster hp: 1d8+1 (these are interchangeable)
   */
  hitPoints: string | number;

  /**
   * Damage is a random generated number
   * For example 1d6
   */
  damage: string;

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
}

export default Entity;
