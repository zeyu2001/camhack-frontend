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
import { useEffect, useState } from "react";
import { InstagramMedia } from "./InstagramMedia";

interface Item {
  id: string;
  url: string;
  username: string;
  caption: string;
}

export function InstagramDetails() {
  const [item, setItems] = useState<Item>([]);

  useEffect(() => {
    if (!localStorage.getItem("instagramToken")) {
      return;
    }

    const fetchData = async () => {
      const res = await fetch(
        `/api/instagram/media/${localStorage.getItem("instagramToken")}`
      );
      const data = await res.json();
      setItems(data);
    };
    fetchData();
  }, []);

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
          <div className="grid grid-cols-5 gap-4">
            {item.map((item) => (
              <div key={item.id} className="flex gap-4">
                <InstagramMedia url={item.url} caption={item.caption} />
              </div>
            ))}
          </div>
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
