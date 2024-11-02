import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { InstagramMedia } from "./InstagramMedia";
import { useInstagramMedia } from "@/app/hooks/useInstagramMedia";
import { ThreeDots } from "react-loader-spinner";

export function InstagramDetails() {
  const [items, loading] = useInstagramMedia();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader>
            <DrawerTitle>Your Instagram Media</DrawerTitle>
            <DrawerDescription>
              These will be used to generate your profile and recommendations.
            </DrawerDescription>
          </DrawerHeader>
          {loading ? (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
              <ThreeDots color="#ffffff" />
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <InstagramMedia url={item.url} caption={item.caption} />
                </div>
              ))}
            </div>
          )}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
