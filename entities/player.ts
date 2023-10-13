import EntityType from '@/entities/entityType'
import BaseEntity from '@/entities/baseEntity'

class Player extends BaseEntity {
  public constructor(name?: string) {
    super()
    this.name = name ? name : EntityType.PLAYER
    this.hitPoints = 12
    this.damage = '1d8'
    this.armorClass = 12
    this.entityType = EntityType.PLAYER
  }
}

export default Player
