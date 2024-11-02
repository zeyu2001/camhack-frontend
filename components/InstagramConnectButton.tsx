import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function InstagramConnectButton({
  setConnected,
}: Readonly<{ setConnected: (connected: boolean) => void }>): JSX.Element {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        setConnected(true);
        router.push(
          `https://api.instagram.com/oauth/authorize?client_id=1103578951260569&redirect_uri=https://9e1e-131-111-5-201.ngrok-free.app/instagram-auth&scope=user_profile,user_media&response_type=code`
        );
      }}
    >
      Connect
    </Button>
  );
}
