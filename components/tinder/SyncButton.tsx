import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export function SyncButton({
  bio,
  responses,
  setGeneratedBio,
  setBio,
  setGeneratedResponses,
  setPrompts,
}: Readonly<{
  bio: string;
  responses: string[];
  setGeneratedBio: (bio: string) => void;
  setBio: (bio: string) => void;
  setGeneratedResponses: (responses: string[]) => void;
  setPrompts: Dispatch<SetStateAction<{ prompt: string; response: string }[]>>;
}>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sync</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will update your Tinder profile with the latest generated bio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const res = await fetch(
                `/api/tinder/${localStorage.getItem("tinderToken")}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ bio }),
                }
              );
              const data = await res.json();
              console.log(data);

              setBio(bio);
              setGeneratedBio("");
              setPrompts((prompts) =>
                prompts.map((prompt, i) => ({
                  ...prompt,
                  response: responses[i],
                }))
              );
              setGeneratedResponses([]);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
