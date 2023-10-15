'use client';

import React, { useEffect, useRef, useState } from 'react';
import Battlefield from '../components/Battlefield';
import EntityStatsHud from '../components/EntityStatsHud';
import GameLog from '../components/GameLog';
import { GlobalContextProvider } from '../Context/gameState';
import Entity from '@/src/entities/entity';
import { createGoblin, createPlayer } from '@/src/utils/entityFactory';
import { roll } from '@/src/utils/diceSimulator';

function Game() {
  const GRID_HEIGHT = 5;
  const GRID_WIDTH = 5;
  const [entities, setEntities] = useState<Entity[]>([]);
  const [started, setStarted] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);

  const players = useRef<Entity[]>([
    createPlayer('Szidi', { x: 0, y: GRID_HEIGHT - 1 }),
    createPlayer('Norbi', { x: 1, y: GRID_HEIGHT - 1 }),
    createPlayer('Dani', { x: 2, y: GRID_HEIGHT - 1 }),
    createPlayer('Isti', { x: 3, y: GRID_HEIGHT - 1 }),
    createPlayer('Peti', { x: 4, y: GRID_HEIGHT - 1 }),
  ]);

  const goblins: Entity[] = [...Array(5)].map((_, index) => createGoblin(`Goblin-${index + 1}`, { x: index, y: 0 }));

  useEffect(() => {
    if (players && goblins) {
      const joined = JSON.parse(JSON.stringify([...players.current, ...goblins]));
      setEntities(joined.sort(() => roll('1d20') - roll('1d20')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex">
      <GlobalContextProvider>
        <EntityStatsHud started={started} setStarted={setStarted} entities={entities} />
        <Battlefield
          gridHeight={GRID_HEIGHT}
          gridWidth={GRID_WIDTH}
          started={started}
          setStarted={setStarted}
          entities={entities}
          setEntities={setEntities}
          round={round}
          setRound={setRound}
        />
        <GameLog round={round} />
      </GlobalContextProvider>
    </div>
  );
}

export default Game;
