import { useCallback } from 'react';
import { Action, ActionResult, ActionType } from '@/app/Context/gameState';
import { roll } from '@/src/utils/diceSimulator';
import Entity from '@/src/entities/entity';

export default function useCombatUtils() {
  const d20: string = '1d20';

  const attack = useCallback(function (attacker: Entity, defender: Entity): Action {
    const attackRoll = roll(d20);

    if (attackRoll < defender.armorClass) {
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
      return damage(attacker, attackRoll, defender);
    }

    return damage(attacker, attackRoll, defender);
  }, []);

  const damage = (attacker: Entity, attackRoll: number, defender: Entity): Action => {
    let damageRoll = roll(attacker.damage);

    if (attackRoll === 20) {
      damageRoll += roll(attacker.damage);
    }

    defender.hitPoints -= damageRoll;

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
