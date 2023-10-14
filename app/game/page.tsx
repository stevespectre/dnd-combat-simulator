"use client"

import React, { useEffect, useRef, useState } from "react";
import Battlefield from "../components/Battlefield";
import EntityStatsHud from "../components/EntityStatsHud";
import GameLog from "../components/GameLog";
import { GlobalContextProvider } from "../Context/gameState";
import Entity from "@/src/entities/entity";
import { createGoblin, createPlayer } from "@/src/utils/entityFactory";
import { roll } from "@/src/utils/diceSimulator";

function Game() {
  const [entities, setEntities] = useState<Entity[]>([])
  
  const players= useRef<Entity[]>([
    createPlayer('Szidi'),
    createPlayer('Norbi'),
    createPlayer('Dani'),
    createPlayer('Isti'),
    createPlayer('Peti'),
  ]);

  const goblins: Entity[] = [...Array(5)].map((_, index) => createGoblin(`Goblin-${index + 1}`))

  useEffect(() => {
    if (players && goblins) {
      const joined = JSON.parse(JSON.stringify([...players.current, ...goblins]));
      setEntities(joined.sort(() => roll('1d20') - roll('1d20')))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex">
      <GlobalContextProvider>
        <EntityStatsHud entities={entities} />
        <Battlefield entities={entities} />
        <GameLog />
      </GlobalContextProvider>
    </div>
  );
}

export default Game;