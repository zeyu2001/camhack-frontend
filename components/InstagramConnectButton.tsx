import { Button } from "@/components/ui/button";

export function InstagramConnectButton({
  setConnected,
}: Readonly<{ setConnected: (connected: boolean) => void }>): JSX.Element {
  setConnected(true);
  return <Button variant="outline">Connect</Button>;
}
