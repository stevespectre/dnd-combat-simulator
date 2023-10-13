import Entity from '@/src/entities/entity';
import { roll } from '@/src/utils/diceSimulator';

const d20: string = '1d20';

export function attack(attacker: Entity, defender: Entity) {
  console.log(attacker.name, 'attacks', defender.name);

  const attackRoll = roll(d20);

  console.log(attacker.name, 'rolls for attack');

  if (attackRoll < defender.armorClass) {
    console.log(attackRoll, 'is a miss');
    return;
  }

  if (attackRoll == 20) {
    console.log('Natural', 20, 'is a critical hit!');
    damage(attacker.damage, true, defender);
    return;
  }

  console.log(attackRoll, 'is a hit');
  damage(attacker.damage, false, defender);
}

// If we want to abide by the official 3.5 rules
function confirmCritical(attacker: Entity, defender: Entity) {
  console.log('Natural', 20, 'is a potential critical hit!');
  console.log(attacker.name, 'rolls to confirm critical hit');

  const confirmCritical = roll(d20);

  if (confirmCritical < defender.armorClass) {
    console.log(confirmCritical, 'is not a critical hit!');
    damage(attacker.damage, false, defender);
    return;
  }

  console.log(confirmCritical, 'is a critical hit!');
  damage(attacker.damage, true, defender);
}

export function damage(damage: string, isCritical: boolean, defender: Entity) {
  let damageRoll = roll(damage);

  if (isCritical) {
    damageRoll += roll(damage);
  }

  defender.hitPoints -= damageRoll;

  console.log(defender.name, 'suffers', damageRoll, 'damage');
}
