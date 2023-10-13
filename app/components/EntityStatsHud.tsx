"use client"

import Entity from "@/src/entities/entity";
import Image from "next/image";
import React from "react";
import heartSVG from "../../src/assets/images/HP.svg";
import dmgSVG from "../../src/assets/images/dmg.svg";
import deadSVG from "../../src/assets/images/dead.svg";
import Button from "./Button";
import { useGlobalContextProvider } from "../Context/gameState";

type Props = {
  entities: Entity[]
}

function EntityStatsHud({ entities }: Props) {
  const { started, setStarted } = useGlobalContextProvider();

  return (
    <div className="w-[200px] border-r border-blue-500 px-2 py-4">
      {entities.map((entity, index) => (
        <div key={index} className="border-b border-blue-300 py-2  px-2">

          <div className="flex">
            <strong className="w-[25px]">{index + 1}.</strong>
            <strong>{entity.name}</strong>
          </div>
          
          <div className="flex gap-3">
            <div className="flex gap-1">
              <Image alt="hearth" src={heartSVG.src} width={16} height={16} />
              <span>{entity.hitPoints}</span>
              {entity.hitPoints <= 0 &&
                <Image alt="death" src={deadSVG.src} width={16} height={16} />
              }
            </div>
            <div className="flex gap-1">
              <Image alt="damage" src={dmgSVG.src} width={16} height={16} />
              <span>{entity.damage}</span>
            </div>
          </div>

        </div>
      ))}
      <Button text="start" handleClick={() => setStarted(!started)}/>
    </div>
  );
}

export default EntityStatsHud;
