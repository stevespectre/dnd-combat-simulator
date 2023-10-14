'use client';

import React, { useEffect, useState } from 'react';
import { Action, useGlobalContextProvider } from '../Context/gameState';

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

  return (
    <div className="w-[200px] border-l border-blue-500 py-4 overflow-scroll">
      {logs.map((log, index) => {
        const damage = log.value > 0 ? log.value : 'No damage';

        return (
          <>
            <div key={index} style={{ width: '100%', background: index === 0 ? '#A1CDDB' : '' }}>
              <div className="logbox-content">
                <div className="source-entity-name">{log.source}</div>
                <div className="log-details">
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
          </>
        );
      })}
    </div>
  );
}

export default GameLog;
