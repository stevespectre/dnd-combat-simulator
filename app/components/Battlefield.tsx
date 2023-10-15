'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { PositionXY } from '@/src/types/positionXY';
import backgroundImage from '../../src/assets/images/green-hill.jpg';
import Entity from '@/src/entities/entity';
import { useGlobalContextProvider } from '../Context/gameState';
import useCombatSimulator from '@/src/utils/combatSimulator';
import EntityType from '@/src/entities/entityType';

type Tile = {
  position: PositionXY;
  size: number;
  entity?: Entity | null;
};

type Props = {
  gridHeight: number;
  gridWidth: number;
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
  entities: Entity[];
  setEntities: Dispatch<SetStateAction<Entity[]>>;
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
};

function Battlefield({ gridHeight, gridWidth, started, setStarted, entities, setEntities, round, setRound }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [battlefieldSize, setBattlefieldSize] = useState<number>();
  const [tileSize, setTileSize] = useState<number>();
  const [grid, setGrid] = useState<Tile[]>();
  const { setAction } = useGlobalContextProvider();
  const [action] = useCombatSimulator({ entities, setEntities });

  useEffect(() => {
    if (containerRef.current) {
      const boundingRect = containerRef.current.getBoundingClientRect();
      const containerWidth = boundingRect.width;
      const containerHeight = boundingRect.height;
      const battlefieldSize = Math.min(containerWidth, containerHeight);

      setBattlefieldSize(battlefieldSize);
      setTileSize(battlefieldSize / Math.sqrt(gridHeight * gridWidth));
    }
  }, [containerRef]);

  useEffect(() => {
    if (battlefieldSize && tileSize) {
      const grid: Tile[] = [];
      [...Array(gridHeight)].forEach((_row, ri) => {
        [...Array(gridWidth)].forEach((_col, ci) => {
          const entity = entities.find((entity) => entity.position.x === ri && entity.position.y === ci);

          grid.push({
            position: {
              x: tileSize * ri,
              y: tileSize * ci,
            },
            size: tileSize,
            entity,
          });
        });
      });

      setGrid(grid);
    }
  }, [battlefieldSize, tileSize, entities]);

  useEffect(() => {
    if (grid?.length === gridHeight * gridWidth && started) {
      for (let i = 0; i < entities.length - 1; i++) {
        if (entities[i].hitPoints <= 0) {
          continue;
        }

        const enemies = entities.filter((entity) => entity.entityType !== entities[i].entityType && entity.hitPoints > 0);

        if (enemies.length === 0) {
          break;
        }

        const actionResult = action(entities[i], enemies);
        setAction(actionResult);
      }

      setRound((prevState) => prevState++);
      console.log(round + 1);
    }
  }, [grid, started, round]);

  useEffect(() => {
    if (entities) {
      const alivePlayersNum = entities.filter((entity) => entity.entityType === EntityType.PLAYER && entity.hitPoints > 0).length;
      const aliveEnemiesNum = entities.filter((entity) => entity.entityType !== EntityType.PLAYER && entity.hitPoints > 0).length;

      console.log(alivePlayersNum, aliveEnemiesNum, round);
      if (alivePlayersNum === 0 || aliveEnemiesNum === 0) {
        console.log('FINISHED');
        setStarted(false);
      }
    }
  }, [entities, round]);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex justify-center content-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      {grid && (
        <div className="relative" style={{ width: `${battlefieldSize}px` }}>
          {grid.map((tile, index) => (
            <div
              key={index}
              className="absolute shadow-inner border border-white text-white"
              style={{
                width: `${tile.size}px`,
                height: `${tile.size}px`,
                left: `${tile.position.x}px`,
                top: `${tile.position.y}px`,
              }}
            >
              {tile.entity && (
                <div
                  className={`w-[80%] h-[80%] bg-contain absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] ${
                    tile.entity.hitPoints <= 0 ? 'bg-red-500' : ''
                  }`}
                  style={{ backgroundImage: `url(${tile.entity.image})` }}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Battlefield;
