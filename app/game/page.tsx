'use client';

import React from 'react';
import Battlefield from '../components/Battlefield';
import EntityStatsHud from '../components/EntityStatsHud';
import GameLog from '../components/GameLog';
import { GlobalContextProvider } from '../Context/gameState';
import { createPlayer } from '@/src/utils/entityFactory';
import Entity from '@/src/entities/entity';

function Game() {
  const players: Entity[] = [];

  const goblins: Entity[] = [];

  return (
    <div className="h-screen flex">
      <GlobalContextProvider>
        <EntityStatsHud />
        <Battlefield players={players} enemies={goblins} />
        <GameLog />
      </GlobalContextProvider>
    </div>
  );
}

export default Game;
