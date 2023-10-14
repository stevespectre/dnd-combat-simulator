'use client';

import React, { useEffect, useState } from 'react';
import { Action, ActionResult, ActionType, useGlobalContextProvider } from '../Context/gameState';

const initialState = [
  {
    type: ActionType.ATTACK,
    source: 'Józsi',
    target: 'Goblin 01',
    roll: 12,
    result: ActionResult.HIT,
    value: 6,
  },
  {
    type: ActionType.ATTACK,
    source: 'Béla',
    target: 'Goblin 02',
    roll: 8,
    result: ActionResult.MISS,
    value: 0,
  },
  {
    type: ActionType.ATTACK,
    source: 'Goblin 01',
    target: 'Józsi',
    roll: 20,
    result: ActionResult.CRITICAL,
    value: 10,
  },
];

function GameLog() {
  const { action } = useGlobalContextProvider();
  const [logs, setLogs] = useState<Action[]>(initialState);

  useEffect(() => {
    if (action) {
      setLogs((prevState) => {
        return [action, ...prevState];
      });
    }
  }, [action]);

  return (
    <div className="w-[200px] border-l border-blue-500 py-4 overflow-scroll">
      <div className="section-title">{'Battle log'}</div>

      {logs.map((log, index) => {
        const damage = log.value > 0 ? log.value : 'No damage';

        return (
          <div key={index}>
            <div style={{ width: '100%', color: index === 0 ? '#000000' : '', background: index === 0 ? '#A1CDDB' : '' }}>
              <div className="logbox-content">
                <div className="source-entity-name">{log.source}</div>
                <div className="entity-details">
                  <p>
                    {log.type + ' '}
                    <strong>{log.target}</strong>
                  </p>
                  <p>
                    {'Rolled: '} <strong>{log.roll}</strong> {' (' + log.result + ')'}
                  </p>
                  <p>
                    {'Damage: '}
                    <strong>{damage}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="divider" />
          </div>
        );
      })}
    </div>
  );
}

export default GameLog;
