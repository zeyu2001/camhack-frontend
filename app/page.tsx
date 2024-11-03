"use client";

import { useState } from "react";
import Connections from "./Connections";
import { Profile } from "@/components/tinder/Profile";
import { Matches } from "@/components/tinder/Matches";

export default function Home() {
  const [tinderConnected, setTinderConnected] = useState<boolean>(false);
  const [instagramConnected, setInstagramConnected] = useState<boolean>(false);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="text-gray-100">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl text-center ">
            &#xac; Catfish
          </h1>
          <img
            src="/logo.png"
            alt="Catfish Logo"
            className="inline-block w-16 h-16"
          />
        </div>
        <Connections
          tinderConnected={tinderConnected}
          setTinderConnected={setTinderConnected}
          instagramConnected={instagramConnected}
          setInstagramConnected={setInstagramConnected}
        />
        {tinderConnected && (
          <>
            <Profile
              bio={bio}
              setBio={setBio}
              setUserInterests={setUserInterests}
              userInterests={userInterests}
            />
            <Matches bio={bio} interests={userInterests} />
          </>
        )}
      </main>
    </div>
  );
}
