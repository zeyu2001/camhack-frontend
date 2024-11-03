import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Match } from "@/app/hooks/useFetchMatches";
import { ExternalLinkIcon, MagicWandIcon } from "@radix-ui/react-icons";
import { useFetchDateIdeas } from "@/app/hooks/useFetchDateIdeas";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

export function DateIdeaSheet({
  match,
  bio,
}: Readonly<{
  match: Match;
  bio: string;
}>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [ideas, ideasLoading] = useFetchDateIdeas(match, bio, open);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MagicWandIcon /> Date ideas
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Date ideas with {match.name}</SheetTitle>
          <SheetDescription>
            Events and activities happening in your area that match both of your
            interests.
          </SheetDescription>
        </SheetHeader>
        {ideasLoading ? (
          <div className="flex justify-center items-center">
            <ThreeDots color="#ffffff" />
          </div>
        ) : (
          <ul className="divide-y divide-gray-400">
            {ideas.map((idea) => (
              <li key={idea.name} className="py-4">
                <a
                  href={idea.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-between items-center"
                >
                  <span>{idea.name}</span>
                  <Button variant="outline">
                    <ExternalLinkIcon />
                  </Button>
                </a>
              </li>
            ))}
          </ul>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
