import React from 'react';
import Battlefield from '../components/Battlefield';
import EntityStatsHud from '../components/EntityStatsHud';
import GameLog from '../components/GameLog';
import { GlobalContextProvider } from '../Context/gameState';

function Game() {
  return (
    <div className="h-screen flex">
      <GlobalContextProvider>
        <EntityStatsHud />
        <Battlefield />
        <GameLog />
      </GlobalContextProvider>
    </div>
  );
}

export default Game;
