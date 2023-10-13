import Image from "next/image";
import Game from "./game/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <h1 className="py-10 text-center">Welcome to the DnD Combat Simulator</h1>
      <div className="text-center">
        <Link href="/game">Start Game</Link>
      </div>
    </main>
  );
}
