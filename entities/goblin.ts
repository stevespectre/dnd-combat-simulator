import EntityType from '@/entities/entityType'
import BaseEntity from '@/entities/baseEntity'

class Goblin extends BaseEntity {
  public constructor() {
    super()
    this.name = EntityType.GOBLIN
    this.hitPoints = '1d8+1'
    this.damage = '1d6'
    this.armorClass = 10
    this.entityType = EntityType.GOBLIN
  }
}

export default Goblin
