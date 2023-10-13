'use client';

import React, { useEffect, useRef, useState } from 'react';

function Battlefield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [battlefieldSize, setBattlefieldSize] = useState<number>();

  useEffect(() => {
    if (containerRef.current) {
      const boundingRect = containerRef.current.getBoundingClientRect();
      const containerWidth = boundingRect.width;
      const containerHeight = boundingRect.height;
      const battlefieldSize = Math.min(containerWidth, containerHeight);

      setBattlefieldSize(battlefieldSize);
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} className="flex-1 flex justify-center content-center">
      Battlefield
    </div>
  );
}

export default Battlefield;
