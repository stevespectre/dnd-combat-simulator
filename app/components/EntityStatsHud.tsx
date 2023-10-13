'use client'

import Entity from "@/src/entities/entity";
import Image from "next/image";
import React from "react";
import heartSVG from "../../src/assets/images/HP.svg";
import dmgSVG from "../../src/assets/images/dmg.svg";
// import dmgSVG from "../../src/assets/images/dmg.svg";

type Props = {
  entities: Entity[]
}

function EntityStatsHud({ entities }: Props) {
  return (
    <div className="w-[200px] border-r border-blue-500 px-2 py-4">
      {entities.map((entity, index) => (
        <div key={index} className="border-b border-blue-300">

          <div className="flex">
            <span className="w-[25px]">{index + 1}.</span>
            <strong>{entity.name}</strong>
          </div>
          
          <div className="flex">
            <Image alt="hearth" src={heartSVG.src} width={16} height={16} />
          </div>
          
        </div>
      ))}
      <button onClick={() => console.log('KLATTY')}>click</button>
    </div>
  );
}

export default EntityStatsHud;
