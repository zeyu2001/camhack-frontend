import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export function UserPromptDialog({
  userPrompt,
  setUserPrompt,
}: Readonly<{
  userPrompt: string;
  setUserPrompt: (userPrompt: string) => void;
}>): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Custom Instructions</DialogTitle>
          <DialogDescription>
            What would you like us to know about you to provide a better
            experience?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            className="col-span-4 h-52"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
