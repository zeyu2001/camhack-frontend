import { Match } from "@/app/hooks/useFetchMatches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChatBubbleIcon, CheckIcon } from "@radix-ui/react-icons";
import { EditIcon, SaveIcon, Send, SendIcon } from "lucide-react";
import { useState } from "react";

export function OpeningLinePopover({ match }: { match: Match }): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [tempOpeningLine, setTempOpeningLine] = useState("");
  const [openingLine, setOpeningLine] = useState("Skibidi rizz rizz");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ChatBubbleIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Send an opening line to {match.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              We found something for you to say to {match.name}!
            </p>
          </div>
          <div className="grid gap-2">
            <div className="items-center">
              {isEditing ? (
                <Input
                  id="opening"
                  onChange={(e) => setTempOpeningLine(e.target.value)}
                />
              ) : (
                <span className="text-sm text-white">{openingLine}</span>
              )}
            </div>
            <div className="flex justify-between gap-4 mt-2">
              {isEditing ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsEditing(false);
                    setOpeningLine(tempOpeningLine);
                    setTempOpeningLine("");
                  }}
                >
                  <CheckIcon /> Save
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  {" "}
                  <EditIcon />
                  Edit
                </Button>
              )}
              <Button variant="outline" className="w-full">
                <SendIcon />
                Send
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
