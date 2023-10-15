'use client';

import React, { useEffect, useState } from 'react';
import { Action, ActionType, useGlobalContextProvider } from '../Context/gameState';

type Props = {
  round: number;
};

function GameLog({ round }: Props) {
  const { action } = useGlobalContextProvider();
  const [logs, setLogs] = useState<Action[]>([]);

  useEffect(() => {
    if (action && action.type !== ActionType.IDLE) {
      setLogs((prevState) => {
        return [action, ...prevState];
      });
    }
  }, [action]);

  return (
    <div className="w-[200px] border-l border-blue-500 py-4 overflow-scroll">
      <div className="section-title">{'Battle log'}</div>
      <div className="logbox-content">
        <strong>{'Round ' + round}</strong>
      </div>
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
                  {log.type === ActionType.ATTACK && (
                    <>
                      <p>
                        {'Rolled: '} <strong>{log.roll}</strong> {' (' + log.result + ')'}
                      </p>
                      <p>
                        {'Damage: '}
                        <strong>{damage}</strong>
                      </p>
                    </>
                  )}
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
