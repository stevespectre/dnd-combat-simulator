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
        return [action, ...prevState];
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
    <div className="w-[200px] border-l border-blue-500 py-4 overflow-scroll">
      <button className="bg-red-500" onClick={doTheThing}>
        Do the thing
      </button>
      {logs.map((log, index) => {
        const damage = log.value > 0 ? log.value : 'No damage';

        return (
          <>
            <div key={index} style={{width: '100%', background: index === 0 ? '#A1CDDB' : ''}}>
              <div className='logbox-content'>
                <div className="source-entity-name">{log.source}</div>
                <div className="log-details">
                  <p>{log.type + ' '}<strong>{log.target}</strong></p>
                  <p>{'Rolled: '} <strong>{log.roll}</strong> {' (' + log.result + ')'}</p>
                  <p>{'Damage: '}<strong>{damage}</strong></p>
                </div>
              </div>
            </div>
            <div className='divider' />
          </>
        );
      })}
    </div>
  );
}

export default GameLog;
