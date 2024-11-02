import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { InstagramConnectButton } from "@/components/InstagramConnectButton";
import { DisconnectButton } from "@/components/DisconnectButton";
import { TinderConnectButton } from "@/components/TinderConnectButton";

export default function Connections({
  tinderConnected,
  setTinderConnected,
  instagramConnected,
  setInstagramConnected,
}: Readonly<{
  tinderConnected: boolean;
  setTinderConnected: (connected: boolean) => void;
  instagramConnected: boolean;
  setInstagramConnected: (connected: boolean) => void;
}>): JSX.Element {
  useEffect(() => {
    const tinderToken = window.localStorage.getItem("tinderToken");
    const instagramToken = window.localStorage.getItem("instagramToken");

    setTinderConnected(!!tinderToken);
    setInstagramConnected(!!instagramToken);
  });

  const connections = [
    {
      name: "Tinder",
      connected: tinderConnected,
      button: tinderConnected ? (
        <DisconnectButton
          variant="tinder"
          setTinderConnected={setTinderConnected}
          setInstagramConnected={setInstagramConnected}
        />
      ) : (
        <TinderConnectButton setConnected={setTinderConnected} />
      ),
    },
    {
      name: "Instagram",
      connected: instagramConnected,
      button: instagramConnected ? (
        <DisconnectButton
          variant="instagram"
          setTinderConnected={setTinderConnected}
          setInstagramConnected={setInstagramConnected}
        />
      ) : (
        <InstagramConnectButton setConnected={setInstagramConnected} />
      ),
      setInstagramConnected,
    },
  ];

  return (
    <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
      <dl className="mx-auto grid max-w-2xl grid-cols-2 lg:px-2 xl:px-0">
        {connections.map((conn, connIdx) => (
          <div
            key={conn.name}
            className={clsx(
              connIdx % 2 === 1
                ? "sm:border-l"
                : connIdx === 2
                ? "lg:border-l"
                : "",
              "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8 border-gray-100/10"
            )}
          >
            <dt className="text-sm/6 font-medium text-gray-100">{conn.name}</dt>
            <dd
              className={clsx(
                conn.connected ? "text-green-500" : "text-red-400",
                "text-xs font-medium"
              )}
            >
              {conn.connected ? "Connected" : "Not connected"}
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight">
              {conn.button}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
