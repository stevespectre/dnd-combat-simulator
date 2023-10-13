import { useCallback } from 'react';
import { Action, ActionResult, ActionType } from '@/app/Context/gameState';
import { roll } from '@/src/utils/diceSimulator';
import Entity from '@/src/entities/entity';

export default function useCombatUtils() {
  const d20: string = '1d20';

  const attack = useCallback(function (attacker: Entity, defender: Entity): Action {
    console.log(attacker, defender);
    console.log(attacker.name, 'attacks', defender.name);

    const attackRoll = roll(d20);

    console.log(attacker.name, 'rolls for attack');

    if (attackRoll < defender.armorClass) {
      console.log(attackRoll, 'is a miss');
      return {
        type: ActionType.ATTACK,
        source: attacker.name,
        target: defender.name,
        roll: attackRoll,
        result: ActionResult.MISS,
        value: 0,
      };
    }

    if (attackRoll == 20) {
      console.log('Natural', 20, 'is a critical hit!');
      return damage(attacker, attackRoll, defender);
    }

    console.log(attackRoll, 'is a hit');
    return damage(attacker, attackRoll, defender);
  }, []);

  // If we want to abide by the official 3.5 rules
  // function confirmCritical(attacker: Entity, defender: Entity) {
  //   console.log('Natural', 20, 'is a potential critical hit!');
  //   console.log(attacker.name, 'rolls to confirm critical hit');
  //
  //   const confirmCritical = roll(d20);
  //
  //   if (confirmCritical < defender.armorClass) {
  //     console.log(confirmCritical, 'is not a critical hit!');
  //     damage(attacker.damage, false, defender);
  //     return;
  //   }
  //
  //   console.log(confirmCritical, 'is a critical hit!');
  //   damage(attacker.damage, true, defender);
  // }

  const damage = (attacker: Entity, attackRoll: number, defender: Entity): Action => {
    let damageRoll = roll(attacker.damage);

    if (roll == 20) {
      damageRoll += roll(attacker.damage);
    }

    defender.hitPoints -= damageRoll;

    console.log(defender.name, 'suffers', damageRoll, 'damage');

    return {
      type: ActionType.ATTACK,
      source: attacker.name,
      target: defender.name,
      roll: attackRoll,
      result: attackRoll === 20 ? ActionResult.CRITICAL : ActionResult.HIT,
      value: damageRoll,
    };
  };

  return [attack, damage];
}
