'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Action, useGlobalContextProvider } from '../Context/gameState';
import useCombatUtils from '@/src/utils/combat';
import { createGoblin, createPlayer } from '@/src/utils/entityFactory';

function GameLog() {
  const { action } = useGlobalContextProvider();
  const [logs, setLogs] = useState<Action[]>([]);

  useEffect(() => {
    console.log('action', action);
    if (action) {
      setLogs((prevState) => {
        return [...prevState, action];
      });
    }
  }, [action]);

  const { setAction } = useGlobalContextProvider();
  const [attack] = useCombatUtils();
  const goblin = createGoblin('Goblin');
  const player = createPlayer('Józsi');
  const doTheThing = useCallback(() => {
    const result = attack(player, goblin);
    setAction(result);
  }, []);

  return (
    <div className="w-[200px] border-l border-blue-500 px-2 py-4">
      <button className="bg-red-500" onClick={doTheThing}>
        Do the thing
      </button>
      {logs.map((log, index) => {
        const damage = log.value > 0 ? log.value : 'No damage';
        return (
          <div key={index}>
            <div className="source-entity-name">{log.source}</div>
            <div>
              <p>{log.type + ' ' + log.target}</p>
              <p>{'Rolled: ' + log.roll + ' (' + log.result + ')'}</p>
              <p>{'Damage: ' + damage}</p>
            </div>
            <div style={{ width: '80%', height: '1px', border: 'solid 1px #12273D' }} />
          </div>
        );
      })}
    </div>
  );
}

export default GameLog;
