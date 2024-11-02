"use client";

import { useState } from "react";
import Connections from "./Connections";
import { Profile } from "@/components/tinder/Profile";

export default function Home() {
  const [tinderConnected, setTinderConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="container dark text-gray-100">
        <Connections
          tinderConnected={tinderConnected}
          setTinderConnected={setTinderConnected}
          instagramConnected={instagramConnected}
          setInstagramConnected={setInstagramConnected}
        />
        {tinderConnected && <Profile />}
      </main>
    </div>
  );
}
