"use client";

import React, { useEffect, useRef, useState } from "react";
import { PositionXY } from "@/src/types/positionXY";
import backgroundImage from "../../src/assets/images/green-hill.jpg";
import Entity from "@/src/entities/entity";
import EntityType from "@/src/entities/entityType";

const ROWS = 5;
const COLS = 5;

type Tile = {
  position: PositionXY;
  size: number;
  entity?: Entity | null;
};

type Props = {
  entities: Entity[]
}

function Battlefield({ entities }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [battlefieldSize, setBattlefieldSize] = useState<number>();
  const [tileSize, setTileSize] = useState<number>();
  const [grid, setGrid] = useState<Tile[]>();

  useEffect(() => {
    if (containerRef.current) {
      const boundingRect = containerRef.current.getBoundingClientRect();
      const containerWidth = boundingRect.width;
      const containerHeight = boundingRect.height;
      const battlefieldSize = Math.min(containerWidth, containerHeight);

      setBattlefieldSize(battlefieldSize);
      setTileSize(battlefieldSize / ROWS);
    }
  }, [containerRef]);

  useEffect(() => {
    if (battlefieldSize && tileSize) {
      const grid: Tile[] = [];
      let i = 0;
      [...Array(ROWS)].forEach((_row, ri) => {
        [...Array(COLS)].forEach((_col, ci) => {
          grid.push({
            position: {
              x: tileSize * ri,
              y: tileSize * ci,
            },
            size: tileSize,
          });
          i++;
        });
      });

      entities.filter(entity => entity.entityType === EntityType.PLAYER).forEach((char, index) => {
        grid[index].entity = char; 
      });

      entities.filter(entity => entity.entityType === EntityType.GOBLIN).forEach((char, index) => {
        grid[(grid.length - 1 - index)].entity = char; 
      });

      setGrid(grid);
    }
  }, [battlefieldSize, tileSize, entities]);

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
              {tile.entity &&
                <div 
                  className="w-[80%] h-[80%] bg-contain absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%]" 
                  style={{ backgroundImage: `url(${tile.entity.image})` }}>
                </div>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Battlefield;
