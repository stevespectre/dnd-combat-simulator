'use client';

import React from 'react';
import Battlefield from '../components/Battlefield';
import EntityStatsHud from '../components/EntityStatsHud';
import GameLog from '../components/GameLog';
import { GlobalContextProvider } from '../Context/gameState';
import { createGoblin, createPlayer } from '@/src/utils/entityFactory';
import EntityType from '@/src/entities/entityType';

function Game() {
  const players = [createPlayer('Józsi'), createPlayer('Béla'), createPlayer('Norbi'), createPlayer('Szidi'), createPlayer('Dani')];

  const goblins = [
    createGoblin(EntityType.GOBLIN),
    createGoblin(EntityType.GOBLIN),
    createGoblin(EntityType.GOBLIN),
    createGoblin(EntityType.GOBLIN),
    createGoblin(EntityType.GOBLIN),
  ];

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
