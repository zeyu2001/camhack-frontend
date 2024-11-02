"use client";

import { useState } from "react";
import Connections from "./Connections";
import { Profile } from "@/components/tinder/Profile";
import { Matches } from "@/components/tinder/Matches";

export default function Home() {
  const [tinderConnected, setTinderConnected] = useState<boolean>(false);
  const [instagramConnected, setInstagramConnected] = useState<boolean>(false);
  const [bio, setBio] = useState("");

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="text-gray-100">
        <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl text-center">
          &#xac; Catfish
        </h2>
        <Connections
          tinderConnected={tinderConnected}
          setTinderConnected={setTinderConnected}
          instagramConnected={instagramConnected}
          setInstagramConnected={setInstagramConnected}
        />
        {tinderConnected && (
          <>
            <Profile bio={bio} setBio={setBio} />
            <Matches bio={bio} />
          </>
        )}
      </main>
    </div>
  );
}
