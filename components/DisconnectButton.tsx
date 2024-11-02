import { Button } from "@/components/ui/button";

export const DisconnectButton = ({
  variant,
  setTinderConnected,
  setInstagramConnected,
}: Readonly<{
  variant: "instagram" | "tinder";
  setTinderConnected: (connected: boolean) => void;
  setInstagramConnected: (connected: boolean) => void;
}>): JSX.Element => {
  const handleDisconnect = () => {
    if (variant === "tinder") {
      window.localStorage.removeItem("tinderToken");
      setTinderConnected(false);
    } else {
      window.localStorage.removeItem("instagramToken");
      setInstagramConnected(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleDisconnect}>
      Disconnect {variant === "tinder" ? "Tinder" : "Instagram"}
    </Button>
  );
};
