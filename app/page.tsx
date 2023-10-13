
import Image from 'next/image';
import Game from "./game/page";
import Link from "next/link";
import { attack } from '@/src/utils/combat';
import { createGoblin, createPlayer } from '@/src/utils/entityFactory';

export default function Home() {
  const goblin = createGoblin('Goblin');
  const player = createPlayer('Józsi');

  attack(player, goblin);

  return (
    <main className="min-h-screen w-screen">
      <h1 className="py-10 text-center">Welcome to the DnD Combat Simulator</h1>
      <div className="text-center">
        <Link href="/game">Start Game</Link>
      </div>
    </main>
  );
}
